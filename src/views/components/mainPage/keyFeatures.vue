<template>
    <section class="key-features">
        <div class="container">
            <div class="key-features__row">
                <div class="key-features__column image-col">
                    <div class="key-features__image-container">
                        <div class="line vertical"></div>
                        <div class="line horizontal"></div>
                        <div class="line horizontal"></div>
                        <img src="../../../assets/images/features_pchv_3.png" alt="ПЧВ3">
                    </div>
                    <div class="key-features__image-container">
                        <div class="line vertical"></div>
                        <div class="line vertical"></div>
                        <img src="../../../assets/images/features_pchv_1.png" alt="ПЧВ1">
                    </div>
                    <div class="key-features__image-container">
                        <div class="line vertical"></div>
                        <img src="../../../assets/images/features_pchv_1-2.png" alt="ПЧВ1">
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
        background: 
            conic-gradient(from 80.04deg at 39.37% 56.44%, #2B0080 -33.49deg, #000000 50.79deg, #4D0099 110.29deg, #B7007A 135.03deg, #550080 146.73deg, #FF00AA 205.47deg, #FF3399 221.3deg, #2B0080 237.09deg, #000000 300.96deg, #2B0080 326.51deg, #000000 410.79deg);
        overflow: hidden;

        &__row {
            display: flex;
            justify-content: space-between;
            margin: 0 -30px;

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
                flex: 0 0 50%;

                @media (max-width: 1400px) {
                    flex: 0 0 40%;
                }

                @media (max-width: 1200px) {
                    flex: 0 0 30%;
                }

                @media (max-width: 768px) {
                    flex: 0 0 25%;
                }
            }
        }

        &__image-container {
            position: absolute;

            img {
                width: 100%;
                height: auto;
                line-height: 0;
                position: relative;
                z-index: 5;
            }

            &:first-child {
                top: 5%;
                right: 27%;
                width: 356px;

                @media (max-width: 1400px) {
                    width: calc(130px + (356 - 130) * ((100vw - 360px) / (1400 - 360)));
                }

                @media (max-width: 1200px) {
                    right: 8%;
                }

                @media (max-width: 768px) {
                   top: 57px;
                }
 
               .line {
                    &:first-child {
                        height: 140px;
                        top: -120px;
                        left: 53%;
                    }

                    &:nth-child(2) {
                        width: 250px;
                        top: 80%;
                        right: -195px;

                        @media (max-width: 1400px) {
                            display: none;
                        }
                    }

                    &:nth-child(3) {
                        transform: rotate(20deg);
                        width: 2000px;
                        top: 45%;
                        left: -1800px;

                        @media (max-width: 1400px) {
                            display: none;
                        }
                    }
                }
            }

            &:nth-child(2) {
                top: 48%;
                left: 65%;
                width: 188px;

                @media (max-width: 1400px) {
                    width: calc(59px + (188 - 59) * ((100vw - 360px) / (1400 - 360)));
                }
                
                @media (max-width: 1200px) {
                    left: 62%;
                    top: 50%;
                }

                @media (max-width: 768px) {
                    left: 52%;
                }

                @media (max-width: 520px) {
                    top: 42%;
                }


                .line {
                    &:first-child {
                        height: 230px;
                        top: -190px;
                        left: 16%;
                        transform: rotate(-15deg);

                        @media (max-width: 1400px) {
                            transform: rotate(-25deg);
                            left: 10%;
                        }

                        @media (max-width: 768px) {
                            transform: rotate(-20deg);
                            left: 3%; 
                        }

                        @media (max-width: 520px) {
                            transform: rotate(-8deg);
                        }
                    }

                    &:nth-child(2) {
                        height: 250px;
                        bottom: -210px;
                        left: 20%;
                        transform: rotate(20deg);

                        @media (max-width: 1400px) {
                            transform: rotate(25deg);
                            left: 10%;
                        }

                        @media (max-width: 920px) {
                            height: 300px;
                            bottom: -250px;
                        }

                        @media (max-width: 768px) {
                            transform: rotate(18deg);
                            left: 2%; 
                        }

                        @media (max-width: 520px) {
                            transform: rotate(12deg);
                            left: -10%;
                        }
                    }
                }
            }

            &:last-child {
                bottom: -15%;
                right: 7%;
                width: 575px;

                @media (max-width: 1400px) {
                    width: calc(173px + (641 - 173) * ((100vw - 360px) / (1400 - 360)));
                    right: 5%;
                    bottom: -22%;
                }

                @media (max-width: 1200px) {
                    right: 0;
                    bottom: -22%;
                }

                @media (max-width: 768px) {
                    bottom: -17%;
                }

                @media (max-width: 520px) {
                    right: 0;
                    bottom: 10%;
                }

                .line {
                    height: 650px;
                    top: -600px;
                    left: 50%;

                    @media (max-width: 1400px) {
                        left: 50%;
                    }

                    @media (max-width: 1200px) {
                        display: none;
                    }
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

    .image-col {
    }

</style>

