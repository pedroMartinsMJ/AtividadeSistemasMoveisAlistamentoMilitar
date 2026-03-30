# 🎖️ Protótipo de Melhoria UX - Alistamento Militar

## 📋 Resumo do Projeto

Este projeto é um protótipo de alta fidelidade desenvolvido como atividade acadêmica para melhorar a experiência do usuário (UX) do site de alistamento militar brasileiro (https://alistamento.eb.mil.br/).

---

## 🎯 Objetivo

Analisar criticamente a experiência do usuário do site original de alistamento militar e propor melhorias significativas na jornada do usuário, aplicando conceitos de UX/UI e design responsivo.

---

## 🔍 Problemas Identificados no Site Original

1. **Interface desatualizada** - Design poluído e confuso
2. **Navegação pouco intuitiva** - Dificuldade para encontrar informações
3. **Falta de integração** - Fragmentação entre sistemas gov.br
4. **Não responsivo** - Experiência ruim em dispositivos móveis
5. **Ausência de feedback** - Usuário não sabe o status das ações
6. **Formulários longos** - Processo de cadastro cansativo

---

## ✨ Melhorias Implementadas

### 1. **Integração com GOV.br**
- Simulação de autenticação via conta gov.br
- Dados pré-preenchidos após login
- Eliminação de duplicidade de cadastros

### 2. **Design Moderno e Responsivo**
- Interface limpa com Tailwind CSS
- Cores institucionais (verde militar)
- Layout adaptativo para mobile e desktop
- Imagens de alta qualidade

### 3. **Sistema de Sessão**
- Login persistente com localStorage
- Proteção de páginas autenticadas
- Logout seguro com limpeza de dados

### 4. **Dashboard Central**
- Visão geral do status do alistamento
- Acesso rápido a todos os serviços
- Cards de serviços organizados
- Estatísticas e notificações

### 5. **Formulário em Etapas (Wizard)**
- Progresso visual (3 etapas)
- Validação em tempo real
- Resumo antes da confirmação
- Campos editáveis com valores sugeridos

### 6. **Geolocalização**
- Preenchimento automático de endereço
- Integração com API Nominatim (OpenStreetMap)
- Redução de erros de digitação

### 7. **Central de Ajuda (FAQ)**
- Perguntas frequentes organizadas
- Busca em tempo real
- Filtro por categorias
- Accordion interativo

### 8. **Acompanhamento de Status**
- Timeline visual do processo
- Status coloridos (concluído, em andamento, pendente)
- Documentos disponíveis para download
- Notificações importantes

---

## 📁 Estrutura do Projeto

```
/
├── index.html          # Landing page com hero section
├── login.html          # Login com integração GOV.br
├── cadastro.html       # Formulário em 3 etapas
├── dashboard.html      # Painel central do usuário
├── status.html         # Acompanhamento do alistamento
├── ajuda.html          # FAQ e suporte
├── css/
│   └── styles.css      # Estilos customizados
└── js/
    └── main.js         # Lógica e interações
```

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **Tailwind CSS** (via CDN) - Estilização rápida
- **JavaScript Vanilla** - Interatividade
- **Font Awesome** - Ícones
- **LocalStorage** - Persistência de dados
- **Geolocation API** - Localização do usuário
- **Nominatim API** - Geocoding reverso

---

## 👥 Usuários de Teste (Mock Database)

| CPF | Senha | Nome |
|-----|-------|------|
| 123.456.789-00 | 123456 | João Silva Santos |
| 987.654.321-00 | senha123 | Maria Oliveira Costa |
| 111.222.333-44 | abc123 | Pedro Santos Lima |
| 555.666.777-88 | teste | Ana Souza Ferreira |
| 000.000.000-00 | 000000 | Carlos Teste Silva |

---

## 🎨 Telas do Protótipo

### 1. **Tela Inicial (index.html)**
- Hero section com imagem de fundo
- Card de login à direita
- Call-to-action destacado
- Seção de informações

### 2. **Tela de Login (login.html)**
- Layout de duas colunas
- Imagem militar à esquerda
- Formulário GOV.br à direita
- Opções alternativas de login

### 3. **Tela de Cadastro (cadastro.html)**
- Wizard de 3 etapas
- Dados pessoais → Endereço → Confirmação
- Campos pré-preenchidos e editáveis
- Botão de geolocalização

### 4. **Dashboard (dashboard.html)**
- Boas-vindas personalizada
- Cards de estatísticas
- Grid de serviços disponíveis
- Atividade recente

### 5. **Status (status.html)**
- Timeline de progresso
- Documentos para download
- Notificações
- Próximos passos

### 6. **Ajuda (ajuda.html)**
- Busca de FAQ
- Filtros por categoria
- Accordion de perguntas
- Informações de contato

---

## 💡 Funcionalidades Destaque

### ✅ Banco de Dados Mock
- 5 usuários pré-cadastrados
- Validação real de CPF e senha
- Dados persistentes na sessão

### ✅ Geolocalização Inteligente
- Preenchimento automático de endereço
- Mapeamento de estados para siglas
- Feedback visual de sucesso/erro

### ✅ Sessão Persistente
- Login salvo no navegador
- Redirecionamento automático se logado
- Dados do usuário em todas as páginas

### ✅ Design Responsivo
- Mobile-first approach
- Grid adaptativo
- Imagens que se ajustam ao tamanho

---

## 📊 Comparação: Antes vs Depois

| Aspecto | Site Original | Protótipo |
|---------|--------------|-----------|
| Login | Fragmentado | Integrado GOV.br |
| Navegação | Confusa | Simplificada |
| Formulário | Longo e confuso | Em etapas |
| Status | Não claro | Timeline visual |
| Design | Datado | Moderno |
| Mobile | Não responsivo | 100% responsivo |
| Feedback | Ausente | Toast notifications |
| Geolocalização | Não disponível | Preenchimento automático |

---

## 🎓 Requisitos da Atividade Atendidos

- ✅ Análise de problemas de usabilidade
- ✅ Mapeamento do fluxo atual
- ✅ Proposição de melhorias na jornada
- ✅ Novo fluxo de navegação
- ✅ Protótipo de baixa fidelidade (6 telas)
- ✅ Justificativa das decisões de design
- ✅ Aplicação de conceitos de UX/UI
- ✅ Design responsivo

---

## 🚀 Como Executar

1. Abra o arquivo `index.html` em qualquer navegador
2. Clique em "Entrar com GOV.br" ou "Começar Agora"
3. Faça login com: `123.456.789-00` / `123456`
4. Explore o dashboard e todas as funcionalidades

---

## 👨‍🎓 Informações Acadêmicas

- **Disciplina**: Desenvolvimento de Sistemas Móveis
- **Atividade**: Análise e Melhoria de UX em Aplicações Móveis
- **Data**: Março de 2026

---

## 📝 Conclusão

Este protótipo demonstra como pequenas melhorias de UX podem transformar completamente a experiência do usuário em um sistema governamental. A integração com GOV.br, o design moderno e as funcionalidades inteligentes como geolocalização fazem do alistamento militar um processo muito mais simples e agradável para o cidadão brasileiro.

---

**Protótipo Acadêmico** - Este é um projeto de demonstração, não é o site oficial do Exército Brasileiro.