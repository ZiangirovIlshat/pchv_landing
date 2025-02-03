<template>
    <section class="usage-scenarios">
        <div class="container">
            <h2 class="usage-scenarios__heading h2-heading dark">Сценарии использования <br>ПЧВ1 / ПЧВ3</h2>

            <div class="usage-scenarios__slider">
                <div class="usage-scenarios__swiper-pagination-top">
                    <ul>
                        <li
                            v-for="(slide, index) in slides"
                            :key="index"
                            :class="{ '_active' : currentIndex === index }"
                            @click="goToSlide(index)"
                        >{{ slide.heading }}</li>
                    </ul>
                </div>
                
                <swiper
                    class="slider-usage-scenarios"

                    :modules="modules"
                    :pagination="pagination"

                    @slideChange="onSlideChange"
                    @swiper="onSwiperInit"
                >
                    <swiper-slide v-for="(slide, index) in slides" :key="index">
                        <div class="slider__item">
                            <p class="slider__desc">
                                {{ slide.desc }}
                                <span>
                                    <svg width="100" height="100">
                                        <use xlink:href="../../../assets/images/sprite.svg#zoom" />
                                    </svg>
                                </span>
                            </p>
                            <div class="slider__img-block">
                                <img :src="slide.img" :alt="slide.heading" />
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>

                <div class="usage-scenarios__swiper-pagination-bottom"></div>
            </div>
        </div>
    </section>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

import usageScenariosSlide1 from "../../../assets/images/usageScenariosSlide1.png";
import usageScenariosSlide2 from "../../../assets/images/usageScenariosSlide2.png";
import usageScenariosSlide3 from "../../../assets/images/usageScenariosSlide3.png";
import usageScenariosSlide4 from "../../../assets/images/usageScenariosSlide4.png";
import usageScenariosSlide5 from "../../../assets/images/usageScenariosSlide5.png";

    export default {
        name: "usageScenarios",

        components: {
            Swiper,
            SwiperSlide,
        },

        data() {
            return {
                slides: [
                    {
                        heading: "ЖКХ",
                        img: usageScenariosSlide1,
                        desc: "Преобразователь частоты для каскадного управления насосом"
                    },
                    {
                        heading: "Пищевая промышленность",
                        img: usageScenariosSlide2,
                        desc: "Преобразователь частоты для распределения системы управления вентиляцией здания"
                    },
                    {
                        heading: "Горное дело",
                        img: usageScenariosSlide3,
                        desc: "Преобразователь частоты для управления насосом в системе водоснабжения"
                    },
                    {
                        heading: "ЦБК",
                        img: usageScenariosSlide4,
                        desc: "Преобразователь частоты для управления станком"
                    },
                    {
                        heading: "Металлообработка",
                        img: usageScenariosSlide5,
                        desc: "Преобразователь частоты в режиме намотчика: контроль момента"
                    },
                ],

                modules: [Pagination],

                pagination: {
                    el: ".usage-scenarios__swiper-pagination-bottom",
                    clickable: true,
                },

                currentIndex: 0,
            };
        },

        methods: {
            onSwiperInit(swiper) {
                this.swiperInstance = swiper;
            },

            goToSlide(index) {
                this.swiperInstance.slideTo(index);
            },

            onSlideChange(swiper) {
                this.currentIndex = swiper.activeIndex;
            },
        }
    };
</script>

<style lang="scss" scoped>
    .usage-scenarios {
        padding: 120px 0;

        @media(max-width: 768px) {
            padding: 60px 0;
        }

        &__heading {
            margin: 0 0 45px 0;

            @media(max-width: 768px) {
                margin: 0 0 20px 0;
            }
        }

        &__slider {}

        &__swiper-pagination-top {
            margin: 0 0 20px 0;

            @media(max-width: 768px) {
                margin: 0 0 5px 0;
            }

            ul {
                display: flex;
                flex-wrap: wrap;
                cursor: pointer;

                li {
                    margin: 0 20px 5px 0;
                    color: $light-colored-text;

                    @media(max-width: 768px) {
                        margin: 0 15px 5px 0;
                    }

                    &._active {
                        color: $primary-color;
                        text-decoration: underline;
                    }

                    &:hover {
                        color: $primary-color;
                    }
                }
            }
        }

        &__swiper-pagination-bottom {
            margin: 22px 0 0 0;
            display: flex;
            justify-content: center;
        }
    }

    .slider {

        &__item {
            border: 1px solid rgba(0, 0, 0, 20%);
            padding: 28px;
            display: flex;
            align-items: flex-end;

            @media (max-width: 1200px) {
                flex-direction: column;
            }

            @media(max-width: 768px) {
                padding: 20px 15px;
            }
        }

        &__img-block {
            flex: 0 0 70%;
            margin-left: auto;

            img {
                width: 100%;
                height: auto;
            }

            @media (max-width: 1200px) {
                order: 0;
                flex: 0 0 100%;
            }
        }

        &__desc {
            color: $secondary-colored-text;
            z-index: 5;
            width: 30%;
            position: absolute;
            bottom: 26px;
            left: 26px;

            display: flex;
            justify-content: space-between;
            align-items: center;

            @media (max-width: 1200px) {
                margin: 0 auto;
                margin: 15px 0 0 0;
                text-align: center;
                position: static;
                width: 100%;
                flex: 0 0 100%;
                order: 1;
            }

            @media (max-width: 768px) {
                text-align: left;
            }

            span {
                display:none;
                margin: 0 0 0 20px;
                width: 24px;
                height: 24px;

                @media (max-width: 768px) {
                    display: inline-block;
                }

                svg {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

</style>