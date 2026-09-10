<div align="center">

# 🎓 Central do Aluno Mauá · Notas, CR & Monitorias
### Engenharia Mecânica — Instituto Mauá de Tecnologia (IMT)

[![Deploy com Vercel](https://img.shields.io/badge/Vercel-Produção%20Ativa-black?style=for-the-badge&logo=vercel)](https://notas-cr-maua.vercel.app)
[![PWA Ready](https://img.shields.io/badge/PWA-100%25%20Offline-blue?style=for-the-badge&logo=pwa)](https://notas-cr-maua.vercel.app)
[![Pure Vanilla](https://img.shields.io/badge/Stack-Vanilla%20JS%20%7C%20CSS3-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://notas-cr-maua.vercel.app)
[![Privacidade](https://img.shields.io/badge/Privacidade-Zero%20Tracking-3ddc84?style=for-the-badge)](https://notas-cr-maua.vercel.app)

<br/>

**Aplicativo Web Progressivo (PWA) de alto nível para cálculo rigoroso de notas, simulação de Coeficiente de Rendimento (CR) e acesso centralizado aos plantões de monitoria presenciais e online do Instituto Mauá de Tecnologia.**

👉 **Acesse em produção:** [**notas-cr-maua.vercel.app**](https://notas-cr-maua.vercel.app)

</div>

---

## 🌟 Principais Funcionalidades

### 📱 Experiência de Aplicativo Nativo (PWA)
- **Instalável:** Funciona como app nativo em Android, iOS (Safari "Adicionar à Tela de Início") e computadores (Chrome/Edge).
- **100% Offline:** Equipado com *Service Worker* de estratégia *Network-First*, permitindo consultar horários de monitoria e simular notas mesmo sem sinal de internet no campus.
- **Interface Dark Glassmorphism:** Desenvolvida em Vanilla CSS responsivo com barra de navegação inferior (*Mobile Dock*) para uso ergonômico no smartphone com uma só mão.

### 🧮 Modelagem Matemática e Critérios Oficiais do IMT
- **Conformidade CEPE 16/2024:** Aplicação fiel das resoluções pedagógicas do Instituto Mauá de Tecnologia (critério C4/2015).
- **Cálculo de Provas e Trabalhos:**
  - $MP$ (Média de Provas) e $MT$ (Média de Trabalhos) com ponderações específicas por matéria.
  - Coeficientes de ponderação individuais ($K_i$) em disciplinas com relatórios de laboratório, peças de oficina e projetos extensionistas (ex: **EMC213** e **ETM302**).
- **Provas Substitutivas ($PS$):** Substituição automática da menor nota de acordo com as regras exatas de cada plano de ensino (ex: substituição entre $P_1/P_2$ e $P_3/P_4$).
- **Simulador de CR:**
  - Cálculo do **CR fechado do 1º ano** (com exclusão correta de PAE116, avaliado por conceito).
  - Projeção em tempo real do **CR acumulado com o 2º ano** ponderado pelas Cargas Horárias ($CH$).

### 📅 Grade Completa de Monitorias do 2º Ano (Canvas IMT)
- **Horário Oficial de Brasília / São Paulo (UTC-3):** O sistema detecta com precisão o dia da semana e horário real via `Intl.DateTimeFormat`, destacando os atendimentos do dia com a badge `● HOJE` e atualizando o relógio a cada 30 segundos.
- **Dual View (Agenda Semanal vs. Por Disciplina):**
  - **Agenda Semanal:** Visão cronológica de Segunda a Sexta com salas (`U23`, `H331`, `R.01`, `H336`, `C4`, `Q6`, `U19`, `J309`, etc.) e modalidades.
  - **Por Disciplina:** Cards acadêmicos com informações pedagógicas, monitores responsáveis e contatos.
- **Links Diretos do Microsoft Teams:** Acesso imediato em um clique às sessões remotas e canais das matérias (incluindo reunião online de **Matemática Computacional** e plantões de **Mecânica Geral** e **Estatística**).
- **Atalho Integrado:** Cada matéria na calculadora de notas possui um atalho direto (`📅 Ver plantão de monitoria →`) que rola a tela e destaca o card correspondente com efeito luminoso.
- **Compartilhamento com 1 Clique:** Botões para copiar horários formatados para envio rápido no WhatsApp da turma.

### 🔍 Motor de Busca Inteligente
- **Normalização Unicode:** Busca insensível a acentuação e pontuação (ex: `calculo` encontra `Cálculo`, `fisica` encontra `Física`).
- **Dicionário Acadêmico de Siglas do Campus:**
  - `CALC` / `cdi` $\rightarrow$ Cálculo Diferencial e Integral II
  - `FIS` / `lab` $\rightarrow$ Física II
  - `RESMAT` / `resistencia` $\rightarrow$ Resistência dos Materiais
  - `MEC` / `estatica` / `dinamica` $\rightarrow$ Mecânica Geral
  - `MATCOMP` / `python` / `metodos numericos` $\rightarrow$ Matemática Computacional
  - `IPM` / `cad` / `redutor` $\rightarrow$ Introdução a Projeto e Manufatura
  - `MCM` / `diagrama de fases` $\rightarrow$ Materiais de Construção Mecânica I
  - `EST` / `probabilidade` $\rightarrow$ Estatística
  - Busca por monitores (*Enzo, Sidney, Breno, Guilherme, Rafael, Maria Luiza, Pedro*) e salas.

### 🔒 Privacidade Absoluta
- **Zero Tracking:** 100% processado no navegador do usuário (*client-side*).
- Nenhum dado pessoal, nota ou métrica é enviado para servidores externos ou bancos de dados.

---

## 📚 Matérias do 2º Ano (Engenharia Mecânica - IMT)

| Código | Disciplina | CH | Critério Média Final (MF) | Provas Sub ($PS$) |
| :---: | :--- | :---: | :--- | :--- |
| **EFB109** | Cálculo Diferencial e Integral II | 80h | $MF = 0,8 \cdot MP + 0,2 \cdot MT$ | $PS_1 \rightarrow \min(P_1, P_2)$ e $PS_2 \rightarrow \min(P_3, P_4)$ |
| **EFB206** | Física II | 160h | $MF = 0,6 \cdot MP + 0,4 \cdot MT$ | $P_{sub}$ substitui $Pi_1$, $Pi_2$ ou ambas |
| **ETM101** | Resistência dos Materiais | 160h | $MF = 0,6 \cdot MP + 0,4 \cdot MT$ | $PS_1 \rightarrow \min(P_1, P_2)$ e $PS_2 \rightarrow \min(P_3, P_4)$ |
| **EFB204** | Mecânica Geral | 80h | $MF = 0,7 \cdot MP + 0,3 \cdot MT$ | $PS \rightarrow \min(P_1, P_2)$ |
| **EFB108** | Matemática Computacional | 80h | $MF = 0,4 \cdot T_1 + 0,6 \cdot T_2$ | Avaliação contínua computacional |
| **ETM302** | Introdução a Projeto e Manufatura | 160h | $MF = 0,4 \cdot MP + 0,6 \cdot MT$ | Média ponderada com pesos $K_i$ por relatório/peça |
| **EMC213** | Materiais de Construção Mecânica I | 80h | $MF = 0,6 \cdot MP + 0,4 \cdot MT$ | Ensaios metalúrgicos e projeto extensionista |
| **EFB803** | Estatística | 80h | $MF = 0,6 \cdot MP + 0,4 \cdot MT$ | $PS \rightarrow \min(P_1, P_2)$ |

---

## 🛠️ Tecnologias e Arquitetura

- **Frontend Core:** HTML5 Semântico + Vanilla JavaScript moderno (ES6+).
- **Estilização:** CSS3 puro com variáveis personalizadas (*Custom Properties*), CSS Grid, Flexbox e suporte a telas Retina e bordas seguras (`viewport-fit=cover`).
- **Arquitetura PWA:**
  - `manifest.webmanifest` completo com ícones gerados (192px, 512px, maskable e Apple Touch Icon 180px).
  - `sw.js` com auto-claim, controle de versão e cache tolerante a falhas.
- **Hospedagem & Deploy:** [Vercel](https://vercel.com) com headers de segurança (*Content-Security-Policy*, *Strict-Transport-Security*, cache otimizado).

---

## 💻 Como Executar Localmente

Como o projeto é construído em Vanilla JS sem dependências pesadas ou etapa de build, você pode executá-lo imediatamente com qualquer servidor HTTP estático:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/f1scher01/notas-cr-maua-pwa.git
   cd notas-cr-maua-pwa
   ```

2. **Inicie um servidor estático:**
   - Com **Node.js**:
     ```bash
     npx serve .
     ```
   - Com **Python**:
     ```bash
     python -m http.server 3000
     ```
   - Ou abra a pasta no VS Code / Antigravity e use a extensão **Live Server**.

3. **Acesse no navegador:**
   ```text
   http://localhost:3000
   ```

---

## 👤 Autor

Desenvolvido por **Lucas Fischer Paez**  
Aluno de Engenharia Mecânica — *Instituto Mauá de Tecnologia (IMT)*  
GitHub: [@f1scher01](https://github.com/f1scher01)
