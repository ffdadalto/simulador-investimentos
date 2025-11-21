# Simulador de Investimentos

Aplicação web construída com Vue 3 + TypeScript que permite comparar o desempenho de diferentes produtos de renda fixa brasileiros de maneira visual e intuitiva. O simulador calcula a evolução do patrimônio considerando um aporte inicial, contribuições mensais e a quantidade de meses desejada, exibindo o resultado em um gráfico de barras interativo.

🔗 **Live demo:** https://nubank.dadalto.tec.br

## ✨ Principais funcionalidades
- **Simulação personalizada:** defina investimento inicial, aportes mensais e prazo da aplicação para ver, em segundos, quanto o capital pode render.
- **Comparação entre produtos:** acompanha simultaneamente CDB, LCI/LCA e Poupança, destacando o rendimento bruto de cada um.
- **Configuração de índices:** ajuste manualmente os percentuais de rentabilidade para cenários conservadores ou agressivos.
- **Indicadores oficiais em tempo real:** consome as APIs públicas do Banco Central (SELIC e Poupança) e do Ipeadata (CDI e IPCA) para exibir o contexto econômico mais recente.
- **Interface responsiva:** layout baseado em PrimeVue, Bootstrap e Highcharts para garantir uma boa experiência em desktops e dispositivos móveis.

## 🧱 Arquitetura e tecnologias
| Camada | Tecnologias |
| --- | --- |
| Framework e build | [Vue 3](https://vuejs.org/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/) |
| UI/UX | [PrimeVue 4](https://primevue.org/), [PrimeVue Aura Theme](https://primevue.org/aura/), [Bootstrap 5](https://getbootstrap.com/), ícones Font Awesome |
| Gráficos | [Highcharts](https://www.highcharts.com/) |
| Data fetching | [Axios](https://axios-http.com/) |
| Utilidades | Moment.js, extensões de arrays customizadas, helpers de formatação (moeda, porcentagem e datas) |

## 🗂️ Organização do código
```
src/
├── App.vue                # Componente raiz
├── main.ts                # Bootstrap do Vue, PrimeVue e helpers globais
├── pages/Home.vue         # Tela principal com os formulários, cards e gráfico
├── components/Line.vue    # Divisores reutilizáveis
├── classes/
│   ├── API.ts             # Clientes Axios (Selic, CDI, IPCA, Poupança)
│   ├── utils/             # Helpers de arrays, datas e formatação
│   └── *.ts               # Modelos fortemente tipados dos índices
├── interfaces/            # Tipagens das respostas das APIs públicas
├── data/urls.ts           # Endpoints do Banco Central e Ipeadata
└── style.css              # Estilização global
```

## 🌐 APIs consultadas
| Indicador | Fonte |
| --- | --- |
| SELIC (a.a.) | https://api.bcb.gov.br/dados/serie/bcdata.sgs.11 |
| CDI (a.a.) | http://ipeadata.gov.br/api/odata4/ValoresSerie(SERCODIGO='BM12_TJCDI12') |
| IPCA (a.a.) | http://ipeadata.gov.br/api/odata4/ValoresSerie(SERCODIGO='PRECOS12_IPCAG12') |
| Poupança (a.m.) | https://api.bcb.gov.br/dados/serie/bcdata.sgs.25 |

> ⚠️ As APIs públicas acima estão sujeitas a limites e disponibilidade. Em ambientes corporativos recomenda-se cachear as respostas para evitar bloqueios.

## 🚀 Executando localmente
### Pré-requisitos
- [Node.js](https://nodejs.org/) 18+ (recomendado: versão LTS mais recente)
- [npm](https://www.npmjs.com/)

### Passo a passo
1. **Instalar dependências**
   ```bash
   npm install
   ```
2. **Rodar o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```
   O Vite exibirá a URL (por padrão `http://localhost:5173`) para acessar o simulador.
3. **Gerar build de produção**
   ```bash
   npm run build
   ```
   Os arquivos otimizados ficarão em `dist/`.

## 📜 Scripts disponíveis
| Script | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor Vite com hot reload |
| `npm run build` | Executa `vue-tsc --build` e gera o bundle de produção |
| `npm run preview` | Faz o serve do build gerado para validações finais |

## 🧭 Próximos passos sugeridos
- Autenticação opcional para salvar simulações do usuário.
- Inclusão de novos produtos (Tesouro IPCA, multimercados) e impostos reais.
- Exportação dos resultados em PDF/CSV.
- Testes unitários e2e com Vitest/Playwright.

---
Criado para o portfólio e aberto a contribuições. Sinta-se à vontade para abrir issues ou PRs com melhorias! 💡
