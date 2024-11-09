<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import Line from '@/components/Line.vue';
import { onMounted, ref } from "vue";
import Highcharts from 'highcharts';
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const inicial = ref<number>(1000);
const aporte = ref<number>(0);
const meses = ref<number>(0);
const pagJuros = ref<string>('M');

const versao = ref<{ major: number, minor: number, revision: number }>(
    { major: 0, minor: 5, revision: 0 }
);

const rentabilidadeCDB = ref<number>(13);
const rentabilidadeLCI_LCA = ref<number>(11.87);
const rentabilidadePoupanca = ref<number>(0.7);

// Referência para o elemento DOM onde o gráfico será renderizado
const chartContainer = ref<HTMLElement | null>(null);
let chartInstance: Highcharts.Chart | null = null; // Referência para a instância do gráfico

const investimentos = ref<{ nome: string, rentabilidade: number, aReceber: number }[]>([
    { nome: 'LCI e LCA', rentabilidade: rentabilidadeLCI_LCA.value, aReceber: inicial.value },
    { nome: 'CDB', rentabilidade: rentabilidadeCDB.value, aReceber: inicial.value },
    { nome: 'Poupança', rentabilidade: rentabilidadePoupanca.value, aReceber: inicial.value }
]);

// Usando o onMounted para inicializar o gráfico quando o componente é montado
onMounted(() => {
    renderChart();
});

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
        categories: investimentos.value.orderByDescending(i => i.aReceber).map(i => i.nome), // Categorias do eixo X
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
            data: investimentos.value.orderByDescending(i => i.aReceber).map(i => i.aReceber), // Dados da série
            showInLegend: false // Garante que a série não será exibida na legenda
        }
    ]
};

const renderChart = () => {
    calcularRendimentos();
    if (chartInstance) {
        // Atualiza os dados da série existente
        chartInstance.series[0].setData(investimentos.value.orderByDescending(i => i.aReceber).map(i => i.aReceber));
        chartInstance.xAxis[0].setCategories(investimentos.value.orderByDescending(i => i.aReceber).map(i => i.nome));
    } else {
        // Cria o gráfico se ainda não foi criado
        chartInstance = Highcharts.chart(chartContainer.value as HTMLElement, chartOptions);
    }
}

const calcularRendimentos = () => {
    // Reinicializa os valores dos investimentos
    investimentos.value = [
        { nome: 'LCI e LCA', rentabilidade: rentabilidadeLCI_LCA.value, aReceber: inicial.value },
        { nome: 'CDB', rentabilidade: rentabilidadeCDB.value, aReceber: inicial.value },
        { nome: 'Poupança', rentabilidade: rentabilidadePoupanca.value, aReceber: inicial.value }
    ];

    for (let i = 0; i < investimentos.value.length; i++) {
        for (let j = 0; j < meses.value; j++) {
            const investimento = investimentos.value[i];
            let valorJuros = investimento.aReceber * (investimento.rentabilidade / 12 / 100);
            investimento.aReceber += valorJuros;
        }
    }
};

const dialog = ref<boolean>(false);
const openConfig = () => {
    dialog.value = true;
};

</script>

<template>
    <div id="main" class="mt-3">
        <div class="row">
            <div class="col-12 col-md-12 col-lg-6">
                <h1>Que aplicação rende mais?</h1>
                <p class="sub-title">Veja quanto seu dinheiro pode render ao simular investimentos em Tesouro Direto,
                    CDBs,
                    LCIs
                    e LCAs, fundos
                    DI
                    e compare com o retorno da poupança e a variação da inflação.</p>
                <div class="quadro-investimento mt-4">
                    <div class="row gx-5 gy-4">
                        <div class="col-12 col-md-6 col-lg-6">
                            <label for="currency-us" class="font-bold block mb-2">Investimento Inicial</label>
                            <InputNumber v-model="inicial" @blur="renderChart()" size="large" mode="currency"
                                currency="BRL" locale="pt-BR" fluid :min="0.01" />
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <label for="currency-us" class="font-bold block mb-2">Aportes mensais</label>
                            <InputNumber v-model="aporte" @blur="renderChart()" size="large" mode="currency"
                                currency="BRL" locale="pt-BR" fluid :min="0.01" />
                        </div>
                        <div class="col-12 col-md-4 col-lg-4">
                            <label for="currency-us" class="font-bold block mb-2">Período de aplicação</label>
                            <InputNumber v-model="meses" @update:modelValue="renderChart()" @blur="renderChart()"
                                mode="decimal" showButtons :min="1" :max="100" suffix=" meses" fluid size="large" />
                        </div>
                        <div class="col-12 col-md-4 col-lg-4">
                            <label for="currency-us" class="font-bold block mb-2">Pegamentos dos juros</label>
                            <div class="radio">
                                <div>
                                    <RadioButton disabled v-model="pagJuros" value="M" />
                                    <label class="ms-2">Mensal</label>
                                </div>
                                <div>
                                    <RadioButton disabled v-model="pagJuros" value="A" />
                                    <label class="ms-2">Anual</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-4 col-lg-4 d-flex justify-content-end align-items-start">
                            <Button pt:root:class="btn-config" @click="openConfig()"><i
                                    class="fa-sharp-duotone fa-solid fa-gears"></i></Button>
                        </div>
                    </div>
                </div>
                <Line></Line>
                <div id="quadro-indices">
                    <div class="row gy-5 gx-3">
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="quadro-input">
                                <h6>Rentabilidade do CDB (a.a.)</h6>
                                <h4>{{ rentabilidadeCDB.toFixed(2) }} %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="quadro-input">
                                <h6>Rentabilidade da LCI/LCA (a.a.)</h6>
                                <h4>{{ rentabilidadeLCI_LCA.toFixed(2) }} %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="quadro-input">
                                <h6>Rentabilidade da Poupança (a.a.)</h6>
                                <h4>{{ rentabilidadePoupanca.toFixed(2) }} %</h4>
                            </div>
                        </div>
                        <div class="col-12">
                            <p class="aviso mb-5">Esses são os parâmetros padrőes utilizados na sua simulação. Você
                                pode
                                alterá-los
                                e refazer os
                                cálculos para
                                uma simulação avançada.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-12 col-lg-6">
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
                <span style="font-style: italic;font-size: 10px;">{{ `Versão:
                    ${versao.major}.${versao.minor}.${versao.revision}` }}</span>
            </div>
        </div>
    </div>

    <Dialog v-model:visible="dialog" modal header="Configurar índices" :style="{ width: '400px' }">
        <template #header>
            <div>
                <h4><i class="fa-sharp-duotone fa-solid fa-gears me-2"></i>Configurar índices</h4>
            </div>
        </template>
        <div class="row g-3 py-2 px-4">
            <div class="col-12">
                <label for="currency-us" class="font-bold block mb-2">CDB</label>
                <InputNumber v-model="rentabilidadeCDB" @blur="renderChart()" size="large" fluid :minFractionDigits="2"
                    :maxFractionDigits="2" :min="0.01" :max="100" locale="pt-BR" />
            </div>
            <div class="col-12">
                <label for="currency-us" class="font-bold block mb-2">LC</label>
                <InputNumber v-model="rentabilidadeLCI_LCA" @blur="renderChart()" size="large" fluid
                    :minFractionDigits="2" :maxFractionDigits="2" :min="0.01" :max="100" locale="pt-BR" />
            </div>
            <div class="col-12">
                <label for="currency-us" class="font-bold block mb-2">Poupança</label>
                <InputNumber v-model="rentabilidadePoupanca" @blur="renderChart()" size="large" fluid
                    :minFractionDigits="2" :maxFractionDigits="2" :min="0.01" :max="100" locale="pt-BR" />
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" text severity="danger" @click="dialog = false" autofocus />
            <Button label="Save" outlined severity="primary" @click="dialog = false" autofocus />
        </template>
    </Dialog>
</template>

<style scoped>
.grafico {
    width: 100%;
    height: 30rem;
}

.btn-config {
    background-color: #472f92;
    border-color: #472f92;
    margin-bottom: 10px;
}

.btn-config:hover {
    background-color: #6643d1 !important;
    border-color: #6643d1 !important;
}
</style>