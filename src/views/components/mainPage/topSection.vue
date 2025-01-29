<template>
    <section class="top-section">
        <div class="container">
            <div class="top-section__header">
                <h1>
                    <span>
                        Преобразователи частоты
                    </span>
                    <span>
                        ПЧВ ОВЕН
                    </span>
                    <span>
                        для насосов, вентиляторов
                        <br>
                        и другой приводной техники
                    </span>
                </h1>
            </div>
            <div class="top-section__content">
                <div class="top-section__inf">
                    <ul>
                        <li>Поставка от 3 рабочих дней</li>
                        <li>Готовые конфигурации</li>
                        <li>Сделано в России</li>
                    </ul>
                </div>
                <div class="top-section__img-block">
                    <img src="../../../assets/images/pchvTopSection.png" alt="Преобразователи частоты ПЧВ ОВЕН">
                </div>
                <div class="top-section__btn-block">
                    <a href="/" class="top-section__button btn">заказать</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "topSection"
    }
</script>

<style lang="scss" scoped>
    .top-section {
        background-image: 
            conic-gradient(from 174.84deg at 60.29% 60.09%, #2B0080 -33.49deg, #000000 50.79deg, #4D0099 110.29deg, #B7007A 135.03deg, #550080 146.73deg, #FF00AA 205.47deg, #FF3399 221.3deg, #2B0080 237.09deg, #000000 300.96deg, #2B0080 326.51deg, #000000 410.79deg);
        padding: 110px 0 0 0;

        &__header {
            margin: 0 0 60px 0;

            h1 {
                display: flex;
                align-items: self-start;
                flex-wrap: wrap;
                margin: 0 -10px;

                @media (max-width: 1290px) {
                    display: block;
                }

                @media(max-width: 768px) {
                    margin: 0;
                }
            }

            span {
                line-height: 1;

                &:first-child {
                    flex: 0 0 100%;
                }

                &:first-child, &:nth-child(2) {
                    letter-spacing: calc(-1 * (clamp(2.375rem, 0.941rem + 7.17vw, 7.313rem) / 100 * 4));
                    font-size: clamp(2.375rem, 0.941rem + 7.17vw, 7.313rem);
                }

                &:nth-child(2) {
                    flex: 0 0 43%;
                }

                &:nth-child(3) {
                    font-size: clamp(1.313rem, 0.716rem + 2.98vw, 3.438rem);
                    flex: 0 0 57%;
                    margin: -8px 0 0 0;

                    @media (max-width: 1290px) {
                        display: inline-block;
                        width: 100%;
                    }
                }
            }
        }

        &__content {
            display: flex;
            gap: 10px;
            justify-content: space-between;
            position: relative;

            @media(max-width: 1200px) {
                flex-direction: column;
            }
        }

        &__inf {
            margin: 4% 0 0 0;

            @media(max-width: 1200px) {
                flex: 0 0 30%;
                margin: 0 0 22px 0;
            }

            ul {
                li {
                    font-size: clamp(0.875rem, 0.737rem + 0.69vw, 1.375rem);
                    padding: 14px 0;
                    border-bottom: 1px solid;

                    @media(max-width: 768px) {
                        padding: 8px 0;
                    }
                }
            }
        }

        &__img-block {
            overflow: hidden;
            flex: 0 0 43.5%;
            display: flex;
            justify-content: center;

            img {
                max-width: 487px;
                width: 100%;
                height: 100%;
            }
        }

        &__btn-block {
            display: flex;
            flex-direction: column;
            justify-content: end;
            z-index: 5;

            @media(max-width: 1200px) {
                width: 100%;
                position: absolute;
                bottom: 20px;
            }

            .btn {
                margin: 0 0 26px 0;

                @media(max-width: 1200px) {
                    margin: 0 auto;
                }
            }
        }
    }

</style>