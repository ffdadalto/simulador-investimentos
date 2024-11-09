<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import Line from '@/components/Line.vue';
import { onMounted, ref } from "vue";
import Highcharts from 'highcharts';

// Usando o onMounted para inicializar o gráfico quando o componente é montado
onMounted(() => {
    if (chartContainer.value) {
        Highcharts.chart(chartContainer.value, chartOptions);
    }
});

const inicial = ref<number>(0);
const aporte = ref<number>(0);
const meses = ref<number>(10);

const selic = ref<number>(11.15);
const CDI = ref<number>(11.15);
const IPCA = ref<number>(4.08);
const TR = ref<number>(0.0696);

const juroNominalTesouroPrefixado = ref<number>(10.50);
const taxaCustodiaTesouroDireto = ref<number>(0.20);

const juroRealTesouroIPCA = ref<number>(5.50);
const taxaAdministracaoFundoDI = ref<number>(0.25);

const rentabilidadeCDB = ref<number>(100);
const rentabilidadeFundoDI = ref<number>(98.17);

const rentabilidadeLCI_LCA = ref<number>(85);
const rentabilidadePoupanca = ref<number>(0.5699);

// Referência para o elemento DOM onde o gráfico será renderizado
const chartContainer = ref<HTMLElement | null>(null);

// Opções do gráfico de barras na horizontal
const chartOptions: Highcharts.Options = {
    chart: {
        type: 'bar', // Tipo de gráfico de barras na horizontal
        backgroundColor: '' // Deixa o fundo do gráfico transparente
    },
    title: {
        text: ''
    },
    legend: {
        enabled: false // Desabilita a legenda, removendo a opção de desmarcar a série
    },
    tooltip: {
        enabled: false // Desabilita o tooltip
    },
    xAxis: {
        categories: [
            'LCI e LCA',
            'CDB',
            'Tesouro Selic',
            'Fundo DI',
            'Tesouro Prefixado',
            'Tesouro IPCA+',
            'Poupança',
            'Correção pelo IPCA',
        ],
        title: {
            text: ''
        },
        labels: {
            enabled: true, // Habilita os rótulos do eixo X
            style: {
                color: '#333', // Cor da fonte
                fontSize: '12px', // Tamanho da fonte
                fontFamily: 'Arial', // Tipo de fonte                
            }
        },
        gridLineWidth: 0, // Remove as linhas de grade no eixo X
        lineWidth: 0 // Remove a linha do eixo X
    },
    yAxis: {
        title: {
            text: '' // Desabilita o título do eixo Y
        },
        labels: {
            enabled: false // Desabilita os rótulos do eixo X
        },
        gridLineWidth: 0, // Remove as linhas de grade no eixo Y
        lineWidth: 0, // Remove a linha do eixo Y
        minorGridLineWidth: 0, // Remove as linhas de grade menores
        tickWidth: 0 // Remove as linhas de marcação dos ticks
    },
    plotOptions: {
        series: {
            borderWidth: 0, // Remove as bordas das barras
            dataLabels: {
                enabled: true, // Habilita os rótulos
                formatter: function () {
                    // Formata o valor da série como moeda BRL
                    return new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(this.y as number);
                },
                style: {
                    color: 'white', // Cor do texto dos rótulos
                    fontSize: '10px', // Tamanho da fonte dos rótulos
                    textOutline: 'none' // Remove o contorno (bordas) do texto
                },
                align: 'right', // Alinha os rótulos ao centro horizontalmente                
                inside: true, // Garante que os rótulos fiquem dentro das barras                
            }
        }
    },
    credits: {
        enabled: false // Remove a marca d'água (logotipo) do Highcharts
    },
    series: [
        {
            name: '',
            type: 'bar',
            data: [10, 13, 12, 14, 15, 10, 8, 15], // Dados da série
            showInLegend: false // Garante que a série não será exibida na legenda
        }
    ]
};

</script>

<template>
    <div id="main" class="mt-3">
        <div class="row">
            <div class="col-12 col-md-12 col-lg-7">
                <h1>Que aplicação rende mais?</h1>
                <p class="sub-title">Veja quanto seu dinheiro pode render ao simular investimentos em Tesouro Direto,
                    CDBs,
                    LCIs
                    e LCAs, fundos
                    DI
                    e compare com o retorno da poupança e a variação da inflação.</p>
                <div class="quadro-investimento mt-4">
                    <div class="row gx-5 gy-4">
                        <div class="col-12 col-md-6 col-lg-4">
                            <label for="currency-us" class="font-bold block mb-2">Investimento Inicial</label>
                            <InputNumber v-model="inicial" size="large" mode="currency" currency="BRL" locale="pt-BR"
                                fluid />
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                            <label for="currency-us" class="font-bold block mb-2">Aportes mensais</label>
                            <InputNumber v-model="aporte" size="large" mode="currency" currency="BRL" locale="pt-BR"
                                fluid />
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                            <label for="currency-us" class="font-bold block mb-2">Período de aplicação</label>
                            <InputNumber v-model="meses" inputId="minmax-buttons" mode="decimal" showButtons :min="0"
                                :max="100" suffix=" meses" fluid size="large" />
                        </div>
                    </div>
                </div>
                <Line></Line>
                <div id="quadro-indices">
                    <div class="row gx-3 gy-4">
                        <div class="col-12 col-md-6 col-lg-3">
                            <div class="quadro-input">
                                <h6>Selic efetiva (a.a.)</h6>
                                <h4>{{ selic.toFixed(2) }} %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3">
                            <div class="quadro-input">
                                <h6>CDI (a.a.)</h6>
                                <h4>{{ CDI.toFixed(2) }} %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3">
                            <div class="quadro-input">
                                <h6>IPCA (a.a.)</h6>
                                <h4>{{ IPCA.toFixed(2) }} %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3">
                            <div class="quadro-input">
                                <h6>TR (a.m.)</h6>
                                <h4>{{ TR.toFixed(4) }} %</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <Line></Line>
                <div id="quadro-indices">
                    <div class="row gy-5 gx-3">
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="quadro-input">
                                <h6>Juro nominal do Tesouro Prefixado (a.a.)</h6>
                                <h4>{{ juroNominalTesouroPrefixado.toFixed(2) }} %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="quadro-input">
                                <h6>Taxa de custódia da B3 no Tesouro Direto (a.a.)</h6>
                                <h4>{{ taxaCustodiaTesouroDireto.toFixed(2) }} %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="quadro-input">
                                <h6>Juro real do Tesouro IPCA+ (a.a.)</h6>
                                <h4>{{ juroRealTesouroIPCA.toFixed(2) }} %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="quadro-input">
                                <h6>Taxa de administração do Fundo DI (a.a.)</h6>
                                <h4>{{ taxaAdministracaoFundoDI.toFixed(2) }} %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="quadro-input">
                                <h6>Rentabilidade do CDB</h6>
                                <h4>{{ rentabilidadeCDB.toFixed(2) }} %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="quadro-input">
                                <h6>Rentabilidade do Fundo DI (% do CDI) </h6>
                                <h4>{{ rentabilidadeFundoDI.toFixed(2) }} %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="quadro-input">
                                <h6>Rentabilidade da LCI/LCA </h6>
                                <h4>{{ rentabilidadeLCI_LCA.toFixed(2) }} %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="quadro-input">
                                <h6>Rentabilidade da Poupança (a.m.)</h6>
                                <h4>{{ rentabilidadePoupanca.toFixed(4) }} %</h4>
                            </div>
                        </div>
                        <div class="col-12">
                            <p class="aviso mb-5">Esses são os parâmetros padrőes utilizados na sua simulação. Você pode
                                alterá-los
                                e refazer os
                                cálculos para
                                uma simulação avançada.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-12 col-lg-5">
                <div class="quadro-grafico">
                    <div class="d-flex justify-content-center align-items-center">
                        <div class="line"></div>
                    </div>
                    <h1>Calculadora de Renda Fixa</h1>
                    <p class="descricao-grafico">Veja quanto seu dinheiro pode render ao simular investimentos em
                        Tesouro Direto, CDBs, LCIs e
                        LCAs, fundos DI e compare com o retorno da poupança e a variação da inflação.</p>
                    <div ref="chartContainer"></div> <!-- Div para renderizar o gráfico -->
                </div>
            </div>
            <div class="col-12">
                <span style="font-style: italic;font-size: 10px;">Versão 0.1.0</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.grafico {
    width: 100%;
    height: 30rem;
}
</style>