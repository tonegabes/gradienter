# Script para testar o build localmente antes do CI (Windows PowerShell)
# Simula o ambiente do GitHub Actions

param(
    [switch]$SkipServer = $false
)

# Configurações
$ErrorActionPreference = "Stop"

# Colors para output
function Write-Info {
    param($Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Blue
}

function Write-Success {
    param($Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Warning {
    param($Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Write-Error {
    param($Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

Write-Host "🧪 Testando build localmente (simulando CI)..." -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

try {
    # Verifica se está no diretório correto
    if (-not (Test-Path "package.json")) {
        Write-Error "package.json não encontrado. Execute o script na raiz do projeto."
        exit 1
    }

    # Step 1: Limpar cache (como no CI)
    Write-Info "Limpando cache e artifacts..."
    npm run clean
    Write-Success "Cache limpo"

    # Step 2: Verificar dependências
    Write-Info "Verificando dependências..."
    if (-not (Test-Path "node_modules")) {
        Write-Warning "node_modules não encontrado. Instalando dependências..."
        npm ci
    } else {
        Write-Info "Verificando se dependências estão atualizadas..."
        npm ci --only=production --ignore-scripts
    }
    Write-Success "Dependências verificadas"

    # Step 3: Lint (como no CI)
    Write-Info "Executando linting..."
    npm run lint
    Write-Success "Linting passou"

    # Step 4: Type checking (como no CI)
    Write-Info "Verificando tipos TypeScript..."
    npm run type-check
    Write-Success "Type checking passou"

    # Step 5: Build (como no CI)
    Write-Info "Executando build de produção..."
    $env:NODE_ENV = "production"
    npm run build
    Write-Success "Build completado com sucesso"

    # Step 6: Verificar se arquivos de saída existem
    Write-Info "Verificando arquivos de saída..."
    if (-not (Test-Path "out")) {
        Write-Error "Diretório 'out' não foi criado pelo build"
        exit 1
    }

    if (-not (Test-Path "out/index.html")) {
        Write-Error "Arquivo index.html não foi gerado"
        exit 1
    }

    Write-Success "Arquivos de saída verificados"

    # Step 7: Testar se o site funciona localmente (opcional)
    if (-not $SkipServer) {
        Write-Info "Testando servidor local..."
        Write-Host "Iniciando servidor de teste na porta 3001..." -ForegroundColor Cyan
        Write-Host "Acesse: http://localhost:3001" -ForegroundColor Cyan
        Write-Host "Pressione Ctrl+C para parar o servidor" -ForegroundColor Cyan

        # Inicia servidor
        $serverJob = Start-Job -ScriptBlock {
            Set-Location $using:PWD
            npx serve out --single --listen 3001
        }

        # Aguarda um pouco para o servidor iniciar
        Start-Sleep -Seconds 3

        if ($serverJob.State -eq "Running") {
            Write-Success "Servidor iniciado com sucesso"
            Write-Info "Teste manual: Acesse http://localhost:3001 para verificar o site"
            Write-Info "Pressione Enter para parar o servidor e finalizar o teste..."
            Read-Host

            # Para o servidor
            Stop-Job $serverJob
            Remove-Job $serverJob
            Write-Success "Servidor parado"
        } else {
            Write-Error "Falha ao iniciar servidor de teste"
            Remove-Job $serverJob
            exit 1
        }
    }

    Write-Host ""
    Write-Host "================================================" -ForegroundColor Green
    Write-Success "🎉 TODOS OS TESTES PASSARAM!"
    Write-Success "✅ Seguro para commit e push para o GitHub"
    Write-Host "================================================" -ForegroundColor Green

} catch {
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Red
    Write-Error "❌ TESTE FALHOU: $($_.Exception.Message)"
    Write-Host "Corrija os erros antes de fazer commit/push" -ForegroundColor Red
    Write-Host "================================================" -ForegroundColor Red
    exit 1
}
