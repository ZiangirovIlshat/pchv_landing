<template>
    <footer class="footer">
        <div class="container">
            <div class="footer__columns-row">
                <div class="footer__column first">
                    <p>
                        ОВЕН – российский разработчик и производитель оборудования для промышленной автоматизации. На сайте owen.ru представлены датчики, контрольно-измерительные приборы, программируемые реле, ПЛК, силовые и коммутационные устройства.
                    </p>
                    <template v-if="width > 768">
                        <p>
                            Предложения и замечания по работе сайта пишите:
                            <br>
                            internet@owen.ru
                        </p>
                        <p>
                            © 1991-2024 ОВЕН. Все права защищены.
                        </p>
                    </template>
                </div>

                <div class="footer__column second">
                    <p v-if="width > 768">Тел.: +7 (495) 727-30-16</p>
                    <p v-else>Тел.: <a class="footer__link" href="tel:+74957273016" >+7 (495) 727-30-16</a></p>

                    <p>E-mail: <a class="footer__link email" href="mailto:sales@owen.ru">sales@owen.ru</a></p>

                    <p><a class="footer__link" href="/">Политика конфиденциальности</a></p>

                    <p class="footer__social-links">
                        <span>
                            <a href="https://www.youtube.com/@owentube" title="https://www.youtube.com/@owentube" target="_blank">
                                <svg width="100" height="100">
                                    <use xlink:href="../../assets/images/sprite.svg#youTube" />
                                </svg>
                            </a>
                        </span>
                        <span>
                            <a href="mailto:sales@owen.ru" title="sales@owen.ru" target="_blank">
                                <svg width="100" height="100">
                                    <use xlink:href="../../assets/images/sprite.svg#mail" />
                                </svg>
                            </a>
                        </span>
                        <span>
                            <a href="https://vk.com/po_owen" title="https://vk.com/po_owen" target="_blank">
                                <svg width="100" height="100">
                                    <use xlink:href="../../assets/images/sprite.svg#vk" />
                                </svg>
                            </a>
                        </span>
                        <span>
                            <a href="https://t.me/owen_prom" title="https://t.me/owen_prom" target="_blank">
                                <svg width="100" height="100">
                                    <use xlink:href="../../assets/images/sprite.svg#tg" />
                                </svg>
                            </a>
                        </span>
                    </p>
                </div>

                <div class="footer__column third">
                    <template v-if="width < 768">
                        <p>
                            Предложения и замечания по работе сайта пишите:
                            <br>
                            <br>
                            internet@owen.ru
                        </p>
                        <p>
                            © 1991-2024 ОВЕН. Все права защищены.
                        </p>
                    </template>
                    <p>
                        Общество c ограниченной ответственностью «Производственное Объединение ОВЕН»
                        <br>
                        ул. 2-я Энтузиастов, д. 5, к.5 Москва, 111 024
                        <br>
                        Россия
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "pageFooter",

        data() {
            return {
                width: window.innerWidth,
            }
        },

        methods: {
            updateWidth() {
                this.width = window.innerWidth;
                console.log(this.width)
            },
        },

        created() {
            window.addEventListener("resize", this.updateWidth);
        }
    }
</script>

<style lang="scss" scoped>
    .footer {
        padding:  50px 0;
        background: #000;
        font-size: 16px;
        color: $footer-text;

        @media (max-width: 768px) {
            font-size: 12px;
            padding:  32px 0;
        }

        &__columns-row {
            display: flex;
            justify-content: space-between;
            gap: 5px;

            @media (max-width: 768px) {
                flex-direction: column;
            }
        }

        &__column {
            &.first {
                flex: 0 0 40%;

                @media (max-width: 768px) {
                    margin: 0 0 40px 0;
                }
            }

            &.second {
                flex: 0 0 20%;

                @media (max-width: 960px) {
                    flex: 0 0 25%;
                }
            }

            &.third {
                flex: 0 0 15%;

                @media (max-width: 768px) {
                    margin: 40px 0 0 0;

                    p {
                        margin: 0 0 24px 0;

                        &:last-child {
                            margin: 0 0 0 0;
                        }
                    }
                }
            }

            &.first, &.second {
                p {
                    margin: 0 0 50px 0;

                    @media (max-width: 768px) {
                        margin: 0 0 20px 0;
                    }
                }
                p:last-child {
                    margin: 0;
                }
            }
        }

        &__link {
            color: inherit;
            text-decoration: none;
            cursor: pointer;

            @media (max-width: 768px) {
                color: $primary-color;
                text-decoration: underline;
            }

            &.email {
                color: $primary-color;
            }

            &:hover {
                color: $primary-color;
            }
        }

        &__social-links {
            display: flex;
            align-items: center;
            gap: 30px;

            @media (max-width: 768px) {
                margin: 5px 0 0 0;
            }

            span {
                width: 24px;
                height: 24px;

                svg {
                    width: 24px;
                    height: 24px;
                    fill: $footer-text
                }

                a:hover {
                    svg {
                        fill: $primary-color;
                    }
                }

                &:nth-child(3) {
                    svg {
                        stroke: #fff;
                    }

                    a:hover {
                        svg {
                            stroke: $primary-color;
                        }
                    }
                }
            }
        }
    }
</style>