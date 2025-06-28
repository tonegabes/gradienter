#!/bin/bash

# Script para testar o build localmente antes do CI
# Simula o ambiente do GitHub Actions

set -e  # Exit on any error

echo "🧪 Testando build localmente (simulando CI)..."
echo "================================================"

# Colors para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function para log com cores
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verifica se está no diretório correto
if [ ! -f "package.json" ]; then
    log_error "package.json não encontrado. Execute o script na raiz do projeto."
    exit 1
fi

# Step 1: Limpar cache (como no CI)
log_info "Limpando cache e artifacts..."
npm run clean
log_success "Cache limpo"

# Step 2: Verificar dependências
log_info "Verificando dependências..."
if [ ! -d "node_modules" ]; then
    log_warning "node_modules não encontrado. Instalando dependências..."
    npm ci
else
    log_info "Verificando se dependências estão atualizadas..."
    npm ci --only=production --ignore-scripts
fi
log_success "Dependências verificadas"

# Step 3: Lint (como no CI)
log_info "Executando linting..."
npm run lint
log_success "Linting passou"

# Step 4: Type checking (como no CI)
log_info "Verificando tipos TypeScript..."
npm run type-check
log_success "Type checking passou"

# Step 5: Build (como no CI)
log_info "Executando build de produção..."
NODE_ENV=production npm run build
log_success "Build completado com sucesso"

# Step 6: Verificar se arquivos de saída existem
log_info "Verificando arquivos de saída..."
if [ ! -d "out" ]; then
    log_error "Diretório 'out' não foi criado pelo build"
    exit 1
fi

if [ ! -f "out/index.html" ]; then
    log_error "Arquivo index.html não foi gerado"
    exit 1
fi

log_success "Arquivos de saída verificados"

# Step 7: Testar se o site funciona localmente
log_info "Testando servidor local..."
echo "Iniciando servidor de teste na porta 3001..."
echo "Acesse: http://localhost:3001"
echo "Pressione Ctrl+C para parar o servidor"

# Inicia servidor em background e pega o PID
npx serve out --single --listen 3001 &
SERVER_PID=$!

# Aguarda um pouco para o servidor iniciar
sleep 2

# Verifica se o servidor está rodando
if ps -p $SERVER_PID > /dev/null; then
    log_success "Servidor iniciado com sucesso (PID: $SERVER_PID)"
    log_info "Teste manual: Acesse http://localhost:3001 para verificar o site"
    log_info "Pressione Enter para parar o servidor e finalizar o teste..."
    read -r

    # Para o servidor
    kill $SERVER_PID
    log_success "Servidor parado"
else
    log_error "Falha ao iniciar servidor de teste"
    exit 1
fi

echo ""
echo "================================================"
log_success "🎉 TODOS OS TESTES PASSARAM!"
log_success "✅ Seguro para commit e push para o GitHub"
echo "================================================"
