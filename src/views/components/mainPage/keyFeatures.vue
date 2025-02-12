<template>
    <section class="key-features" id="advantages">
        <div class="container">
            <div class="key-features__row">
                <div class="key-features__column image-col">
                    <div class="key-features__image-block">
                        <img src="../../../assets/images/keyFeatures.png" alt="ПЧВ3">
                    </div>
                </div>
                <div class="key-features__column">
                    <div class="key-features__feature-block">
                        <p class="key-features__heading">Быстрый ввод <br> в эксплуатацию</p>
                        <p class="key-features__text">Готовые конфигурации под типовые задачи на сайте. Можно подключить и начать использовать «из коробки»</p>
                    </div>
                    <div class="key-features__feature-block">
                        <p class="key-features__heading">Удобная настройка <br> на русском языке</p>
                        <p class="key-features__text">Настраивается с лицевой панели или через русскоязычный конфигуратор </p>
                    </div>
                    <div class="key-features__feature-block">
                        <p class="key-features__heading">Поддержка различных протоколов обмена</p>
                        <p class="key-features__text">Совместим с оборудованием международных производителей по протоколам Profinet, Profibus, Modbus RTU, Modbus TCP, Ethercat, CanOpen</p>
                    </div>
                    <div class="key-features__feature-block">
                        <p class="key-features__heading">Полная защита двигателя</p>
                        <p class="key-features__text">Тепловая и токовая защиты, контроль обрыва фаз, коротких замыканий, защита по напряжению и другие</p>
                    </div>
                    <div class="key-features__feature-block">
                        <p class="key-features__heading">Самые компактные <br>ПЧВ в своем классе</p>
                        <p class="key-features__text">Монтируются вплотную. Четырем ПЧВ ОВЕН нужно столько же места, сколько двум приборам других производителей</p>
                    </div>
                    <div class="key-features__feature-block">
                        <p class="key-features__heading">Обучение<br> и техподдержка</p>
                        <p class="key-features__text">Обучающие видео, выделенная ветка на форуме и активное сообщество облегчат настройку и подключение. Техническая поддержка поможет в режиме 24/7</p>
                    </div>
                    <div class="key-features__feature-block">
                        <p class="key-features__heading">Сопутствующие товары: Моторные и сетевые дроссели, тормозные резисторы.</p>
                        <p class="key-features__text">Таблица по подбору дополнительного оборудования для проектирования вентиляторов, станков, насосных станций, систем управления, крановых установок, дробилок и тд.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

    export default {
         
        name: "keyFeatures",
    }
</script>

<style lang="scss" scoped>
    .key-features {
        $background-gradient:
            #2B0080 -31.49deg, 
            #000000 50.79deg, 
            #4D0099 110.29deg, 
            #B7007A 135.03deg, 
            #550080 146.73deg, 
            #FF00AA 205.47deg, 
            #FF3399 221.3deg, 
            #2B0080 237.09deg, 
            #000000 300.96deg, 
            #2B0080 326.51deg,
            #000000 410.79deg;
 
        background: conic-gradient(from 80.04deg at 30% 50%, $background-gradient);
        background-size: cover;
        background-attachment: fixed;

        @media (max-width: 1200px) {
            background: conic-gradient(from 80.04deg at 20% 30%, $background-gradient);
            background-size: cover;
            background-attachment: fixed;
        }

        &__row {
            display: flex;
            justify-content: space-between;
            margin: 0 -20px;

            @media (max-width: 768px) {
                margin: 0 -15px;
            }
        }

        &__column {
            padding: 50px 0;

            @media (max-width: 768px) {
                padding: 0;
            }

            &:nth-child(2) {
                flex: 1;
            }

            &.image-col {
                position: relative;
                border-right: 1px solid #fff;
                flex: 0 0 40%;

                @media (max-width: 1200px) {
                    flex: 0 0 30%;
                }
            }
        }

        &__image-block {
            position: sticky;
            top: 150px;
            text-align: center;

            @media (max-width: 920px) {
                height: 110vw;
                width: auto;
            }

            img {
                height: auto;
                width: 100%;

                @media (max-width: 920px) {
                    position: absolute;
                    top: 0;
                    left: -30vw;
                    height: 100vw;
                    width: auto;
                }
            }
        }

        &__feature-block {
            padding: 50px 28px;
            border-bottom: 1px solid #fff;

            &:first-child {
                padding: 0 120px 50px 28px;
            }

            &:last-child {
                border-bottom: none;
                padding: 50px 120px 0 28px;
            }

            @media (max-width: 1400px) {
                padding: 50px 28px;

                &:first-child {
                    padding: 0  28px 50px 28px;
                }

                &:last-child {
                    border-bottom: none;
                    padding: 50px  28px 0 28px;
                }
            }

            @media (max-width: 1200px) {
                padding: 30px 10px;

                &:first-child {
                    padding: 0  10px 30px 10px;
                }

                &:last-child {
                    border-bottom: none;
                    padding: 30px  10px 0 10px;
                }
            }

            @media (max-width: 768px) {
                padding: 24px 14px 16px 14px;

                &:first-child {
                    padding: 16px 14px 16px 14px;
                }

                &:last-child {
                    border-bottom: none;
                    padding: 24px 14px 16px 14px;
                }
            }
        }

        &__heading {
            font-size: clamp(1.313rem, 0.83rem + 2.41vw, 3rem);
            margin: 0 0 24px 0;

            @media (max-width: 768px) {
                margin: 0 0 15px 0;
            }
        }

        &__text {
            padding: 0 60px 0 0;

            @media (max-width: 768px) {
                padding: 0;
            }
        }
    }

    .line {
        position: absolute;
        background-color: #fff;
        
        &.vertical {
            width: 1px;
        }

        &.horizontal {
            height: 1px;
        }
    }

</style>

