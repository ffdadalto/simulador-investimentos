<script setup lang="ts">
import { ref } from 'vue';
import InputNumber from 'primevue/inputnumber';
import Line from '@/components/Line.vue';


const inicial = ref<number>(0);
const aporte = ref<number>(0);
const meses = ref<number>(0);

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
                                <h4>11,15 %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3">
                            <div class="quadro-input">
                                <h6>CDI (a.a.)</h6>
                                <h4>11,15 %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3">
                            <div class="quadro-input">
                                <h6>IPCA (a.a.)</h6>
                                <h4>11,15 %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3">
                            <div class="quadro-input">
                                <h6>TR (a.m.)</h6>
                                <h4>11,15 %</h4>
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
                                <h4>11,15 %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="quadro-input">
                                <h6>Taxa de custódia da B3 no Tesouro Direto (a.a.)</h6>
                                <h4>11,15 %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="quadro-input">
                                <h6>Juro real do Tesouro IPCA+ (a.a.)</h6>
                                <h4>11,15 %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="quadro-input">
                                <h6>Taxa de administração do Fundo DI (a.a.)</h6>
                                <h4>11,15 %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="quadro-input">
                                <h6>Rentabilidade do CDB</h6>
                                <h4>11,15 %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="quadro-input">
                                <h6>Rentabilidade do Fundo DI (% do CDI) </h6>
                                <h4>11,15 %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="quadro-input">
                                <h6>Rentabilidade da LCI/LCA </h6>
                                <h4>11,15 %</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="quadro-input">
                                <h6>Rentabilidade da Poupança (a.m.)</h6>
                                <h4>11,15 %</h4>
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
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped></style>