<template>
    <section class="technical-characteristics">
        <div class="container">
            <h2 class="technical-characteristics__heading h2-heading">Основные тех.характеристики</h2>

            <table>
                <tbody>
                    <tr>
                        <td>
                           <h3>ОВЕН ПЧВ1</h3>
                           <img src="../../../assets/images/technicalСharacteristics_pchv1.png" alt="ПЧВ1">
                        </td>
                        <td>
                            <h3>ОВЕН ПЧВ3</h3>
                            <img src="../../../assets/images/technicalСharacteristics_pchv3.png" alt="ПЧВ3">
                        </td>
                    </tr>
                    <tr>
                        <td class="technical-characteristics__characteristics-cell">
                            <p>Общепромышленное применение</p>
                            <p>Мощность до 22 кВт</p>
                            <p>«Спящий» режим</p>
                            <p>Перегрузочная способность до 200%</p>
                            <p>Возможность подключения энкодера к высокочастотному входу</p>
                            <p>S-образная характеристика контроля частоты</p>
                            <p>Вход для подключения тормозного резистора</p>
                        </td>
                        <td class="technical-characteristics__characteristics-cell">
                            <p>Управление насосами и вентиляторами</p>
                            <p>Мощность до 450 кВт</p>
                            <p>«Спящий» режим</p>
                            <p>Пожарный режим</p>
                            <p>Контроль расхода</p>
                            <p>Контроль натяжения ремня</p>
                            <p>Поддержка протоколов Profinet, Profibus, Modbus RTU, Modbus TCP, Ethercat, CanOpen</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="technical-characteristics__buy-btn">
                                <p>от 13 200 ₽</p>
                                <button class="btn">заказать</button>
                            </div>
                        </td>
                        <td>
                            <div class="technical-characteristics__buy-btn">
                                <p>от 23 700 ₽</p>
                                <button class="btn">заказать</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
    export default {
        name: "technicalCharacteristics",
    }
</script>

<style lang="scss" scoped>
    .technical-characteristics {
        background-size: cover;
        padding: 60px 0 0 0;

        $background-gradient: 
            #2B0080 -33.49deg,
            #000000 50.74deg,
            #4D0099 110.29deg,
            #B7007A 135.03deg,
            #550080 146.73deg,
            #FF00AA 205.47deg,
            #FF3399 221.3deg,
            #2B0080 237.09deg,
            #000000 300.96deg,
            #2B0080 326.51deg,
            #000000 410.74deg;

        background: conic-gradient(from 172.66deg at 50% 63.3%, $background-gradient);

        @media (max-width: 920px) {
            background: conic-gradient(from 172.66deg at 50% 50%, $background-gradient);
        }

        @media (max-width: 768px) {
            background: conic-gradient(from 172.66deg at 50% 42.3%, $background-gradient);
        }

        @media (max-width: 768px) {
            padding: 20px 0 0 0;
        }

        &__heading {
            padding: 0 0 60px 0;

            @media (max-width: 768px) {
                padding: 0 0 20px 0;
            }
        }

        h3 {
            font-size: clamp(1.313rem, 0.813rem + 2.5vw, 3rem);
            margin: 0 0 45px 0;
        }

        &__characteristics-cell {
            p {
                margin: 0 0 20px 0;

                @media (max-width: 768px) {
                    margin: 0 0 10px 0;
                }
            }
        }

        &__buy-btn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 22px;

            p {
                font-size: clamp(1.125rem, 0.903rem + 1.11vw, 1.875rem);
            }

            button {
                @media (max-width: 768px) {
                    width: 100%;
                }
            }
        }
    }

    table {
        border-collapse: collapse;
        width: 100%;
        margin: 0 -20px;
        width: calc(100% + 40px);

        @media (max-width: 768px) {
            margin: 0 -15px;
            width: calc(100% + 30px);
        }

        img {
            width: 500px;
            height: auto;

            @media (max-width: 1400px) {
                width: calc(120px + (500 - 120) * ((100vw - 360px) / (1400 - 360)));
            }
        }

        td {
            padding: 25px;
            border: 1px solid #fff;
            width: 50%;

            @media (max-width: 768px) {
                padding: 20px;
            }

            &:first-child {
                border-left: none;
            }

            &:last-child {
                border-right: none;
            }
        }

        tr {
            &:last-child {
                td {
                    border-bottom: none;
                }
            }
        }
    }

</style>
