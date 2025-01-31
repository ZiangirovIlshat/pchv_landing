<template>
    <section class="features-and-characteristics" id="features">
        <div class="container">
            <h2 class="features-and-characteristics__heading h2-heading dark">Возможности<br>и характеристики</h2>

            <div class="features-and-characteristics__content">
                <table>
                    <tbody v-if="width > 1200">
                        <tr>
                            <td class="features-and-characteristics__cell right-cell" rowspan="2">
                                <p class="features-and-characteristics__text">рабочий температурный диапазон</p>
                                <p class="features-and-characteristics__gradient-text gradient-text">от -10<br>до +50°C</p>
                            </td>
                            <td class="features-and-characteristics__cell">
                                <p class="features-and-characteristics__text">точность поддержания скорости</p>
                                <p class="features-and-characteristics__gradient-text gradient-text">до 0,5%</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="features-and-characteristics__cell">
                                <p class="features-and-characteristics__text">выходная частота</p>
                                <p class="features-and-characteristics__gradient-text gradient-text">до 600 Гц</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="features-and-characteristics__cell img-cell right-cell" rowspan="5">
                                <img src="../../../assets/images/featuresAndCharacteristics.png" alt="ПЧВ3">
                            </td>
                            <td class="features-and-characteristics__cell">
                                <p class="features-and-characteristics__colored-text">Векторный датчиковый, бездатчиковый и скалярный режимы управления двигателем</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="features-and-characteristics__cell">
                                <p class="features-and-characteristics__colored-text">Автоматическая адаптация двигателя без вращения</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="features-and-characteristics__cell">
                                <p class="features-and-characteristics__colored-text">Компенсация нагрузки и скольжения</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="features-and-characteristics__cell">
                                <p class="features-and-characteristics__colored-text">Возможность динамического торможения</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="features-and-characteristics__cell">
                                <p class="features-and-characteristics__colored-text">Плавный пуск и остановка двигателя, отложенный пуск</p>
                            </td>
                        </tr>
                    </tbody>

                    <tbody v-else>
                        <tr>
                            <td class="features-and-characteristics__cell right-cell">
                                <p class="features-and-characteristics__text">рабочий температурный диапазон</p>
                                <p class="features-and-characteristics__gradient-text gradient-text">от -10<br>до +50°C</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="features-and-characteristics__cell">
                                <p class="features-and-characteristics__text">точность поддержания скорости</p>
                                <p class="features-and-characteristics__gradient-text gradient-text">до 0,5%</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="features-and-characteristics__cell">
                                <p class="features-and-characteristics__text">выходная частота</p>
                                <p class="features-and-characteristics__gradient-text gradient-text">до 600 Гц</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="features-and-characteristics__cell img-cell right-cell">
                                <img src="../../../assets/images/featuresAndCharacteristics.png" alt="ПЧВ3">
                            </td>
                        </tr>
                        <tr>
                            <td class="features-and-characteristics__cell">
                                <p class="features-and-characteristics__colored-text">Векторный датчиковый, бездатчиковый и скалярный режимы управления двигателем</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="features-and-characteristics__cell">
                                <p class="features-and-characteristics__colored-text">Автоматическая адаптация двигателя без вращения</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="features-and-characteristics__cell">
                                <p class="features-and-characteristics__colored-text">Компенсация нагрузки и скольжения</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="features-and-characteristics__cell">
                                <p class="features-and-characteristics__colored-text">Возможность динамического торможения</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="features-and-characteristics__cell">
                                <p class="features-and-characteristics__colored-text">Плавный пуск и остановка двигателя, отложенный пуск</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "featuresAndCharacteristics",

        data() {
            return {
                width: window.innerWidth,
            }
        },

        methods: {
            updateWidth() {
                this.width = window.innerWidth;
            }
        },

        created() {
            window.addEventListener("resize", this.updateWidth);
        }
    }
</script>

<style lang="scss" scoped>
    .features-and-characteristics {
        color: $colored-text;
        padding: 0 0 120px 0;

        @media (max-width: 768px) {
            padding: 0 0 60px 0;
        }

        &__heading {
            margin: 0 0 35px 0;
        }

        &__content {
            margin: 0 -20px;
        }

        &__cell {
            padding: 30px;

            @media (max-width: 1400px) {
                padding: 20px;
            }

            &.img-cell {
                padding: 30px 30px 0 30px;

                img {
                    display: block;
                    height: 100%;
                    width: auto;

                    @media (max-width: 1400px) {
                        width: calc(375px + (657 - 375) * ((100vw - 360px) / (1400 - 360)));
                    }

                    @media (max-width: 1200px) {
                        margin: 0 auto;
                    }
                }
            }
        }

        &__text {
            margin: 0 0 70px 0;

            @media (max-width: 1400px) {
                margin-bottom: calc(20px + (70 - 20) * ((100vw - 360px) / (1400 - 360)));
            }
        }

        &__gradient-text {
            font-size: clamp(3.75rem, 2.727rem + 5.11vw, 6.563rem);
        }

        &__colored-text {
            color: $secondary-colored-text;
            padding: 10px 100px 10px 0;

            @media (max-width: 1200px) {
                padding: 0;
            }
        }
    }

    table {
        border-collapse: collapse;
        border: none;
        width: 100%;

        th, td {
            vertical-align: bottom;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height: 1px;
                background: $gradient-background;
            }

            &.right-cell::before {
                content: '';
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                width: 1px;
                background: $gradient-background;
            }
        }
    }

</style>