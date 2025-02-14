<template>
    <section class="product-lines">
        <div class="container">
            <h2 class="product-lines__heading h2-heading dark">Обзор линеек ПЧВ</h2>
            <div class="product-lines__slider">
                <swiper
                    class="product-lines-slider slider" 
                    ref="productLines"

                    :modules="modules"
                    :pagination="pagination"
                    :navigation="true"

                    :slidesPerView="'auto'"
                    :centeredSlides="true"

                    :initialSlide="1"

                    :breakpoints="swiperBreakpoints"

                    @slideChange="onSlideChange"
                    @swiper="onSwiperInit"
                >
                    <swiper-slide v-for="(slide, index) in slides" :key="index">
                        <div class="slider__slide">
                            <iframe 
                                :src="slide.src + '&js_api=1'" 
                                width="100%"
                                height="100%"
                                allow="encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                                frameborder="0"
                                allowfullscreen>
                            </iframe>
                        </div>
                    </swiper-slide>
                </swiper>

                <p class="product-lines__video-name">{{ slides[currentIndex].name }}</p>

                <div class="product-lines__navigations">
                    <div class="product-lines__mobile-prev-btn" @click="goToPrev"></div>
                    <div class="product-lines__swiper-pagination-bottom"></div>
                    <div class="product-lines__mobile-next-btn" @click="goToNext"></div>
                </div>
            </div>

            <br>
        </div>
    </section>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/swiper-bundle.css";

    export default {
        name: "productLines",

        components: {
            Swiper,
            SwiperSlide,
        },

        data() {
            return {
                slides: [
                    {
                        name: "Работа ПЧВ1 [М01] с универсальным конфигуратором ПЧВ",
                        src: "https://vkvideo.ru/video_ext.php?oid=-68314714&id=456239760&hd=2&autoplay=0",
                    },
                    {
                        name: "Вебинар «Новая серия преобразователей частоты ПЧВ М01»",
                        src: "https://vkvideo.ru/video_ext.php?oid=-68314714&id=456239635&hd=2&autoplay=0",
                    },
                    {
                        name: "Обзор обновлённой линейки ПЧВ",
                        src: "https://vkvideo.ru/video_ext.php?oid=-68314714&id=456239855&hd=1&autoplay=0",
                    }
                ],
                
                modules: [Pagination, Navigation],

                pagination: {
                    el: ".product-lines__swiper-pagination-bottom",
                    clickable: true,
                },

                swiperInstance: null,

                currentIndex: 0,

                swiperBreakpoints: {
                    0: { spaceBetween: 20 },
                    768: { spaceBetween: 95 },
                    920: { spaceBetween: 110 },
                    1200: { spaceBetween: 130 },
                },

                player: null,
            }
        },

        methods: {
            onSwiperInit(swiper) {
                this.swiperInstance = swiper;
            },

            onSlideChange(swiper) {
                this.currentIndex = swiper.activeIndex;

                this.stopVideo();
            },

            stopVideo() {
                let slides = document.querySelectorAll(".slider__slide");

                slides.forEach(el => {
                    let iframe = el.querySelector("iframe");
                    let player = window.VK.VideoPlayer(iframe);
                    player.pause()
                });
            },

            goToPrev() {
                this.swiperInstance.slidePrev();
            },

            goToNext() {
                this.swiperInstance.slideNext();
            },
        },
    }
</script>

<style lang="scss">
    .product-lines-slider {

        .swiper-wrapper {
            padding: 40px 0;
            display: flex;
            align-items: center;

            @media (max-width: 768px) {
                padding: 0;
            }
        }

        .swiper-button-prev, .swiper-button-next {
            color: $primary-color;

            &::after, &::before {
                font-size: 23px;
                font-weight: 700;
            }

            @media (hover: hover) and (pointer: fine) {
                &:hover {
                    color: $hover-btn-color;
                }
            }
        }

        .swiper-button-prev {
            left: var(--swiper-navigation-sides-offset, 200px);

            @media (max-width: 1440px) {
                left: var(--swiper-navigation-sides-offset, calc(40px + (200 - 40) * ((100vw - 768px) / (1440 - 768))));
            }
        }

        .swiper-button-next {
            right: var(--swiper-navigation-sides-offset, 200px);

            @media (max-width: 1440px) {
                right: var(--swiper-navigation-sides-offset, calc(40px + (200 - 40) * ((100vw - 768px) / (1440 - 768))));
            }
        }

        .swiper-button-prev , .swiper-button-next {
            @media (max-width: 768px) {
                display: none;
            }
        }

        .swiper-slide {
            width: 802px;
            height: 452px;

            @media (max-width: 1440px) {
                width: calc(337px + (802 - 337) * ((100vw - 360px) / (1440 - 360)));
                height: calc(191px + (452 - 191) * ((100vw - 360px) / (1440 - 360)));
            }
        }

        .swiper-slide.swiper-slide-active {
            z-index: 2;
            transform: scale(1.2);

            @media (max-width: 768px) {
                transform: scale(1);
            }
        }

        .swiper-slide.swiper-slide-next, .swiper-slide.swiper-slide-prev {
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.6);
                z-index: 1;
            }
        }
    }
</style>

<style lang="scss" scoped>
    .product-lines {
        padding: 120px 0;


        @media (max-width: 768px) {
            padding: 60px 0;
        }

        &__heading {
            margin: 0 0 45px 0;

            @media (max-width: 768px) {
                margin: 0 0 25px 0;
            }
        }

        &__slider {
            margin: 0 -20px;

            @media (max-width: 768px) {
                margin: 0 -15px;    
            }
        }

        &__video-name {
            text-align: center;
            color: $secondary-colored-text;
            margin: 0 0 40px 0;
            font-size: clamp(0.875rem, 0.693rem + 0.91vw, 1.375rem);
            padding: 0 10px;

            @media (max-width: 768px) {
                margin: 0 0 30px 0;
            }
        }

        &__navigations {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 30px;
        }

        &__mobile-prev-btn, &__mobile-next-btn {
            @media (min-width: 768px) {
                display: none;
            }

            width: 15px;
            height: 15px;
            border-top: 3px solid $primary-color;
        }

        &__mobile-prev-btn {
            border-left: 3px solid $primary-color;
            transform: rotate(-45deg);
        }

        &__mobile-next-btn {
            border-right: 3px solid $primary-color;
            transform: rotate(45deg);
        }

        &__swiper-pagination-bottom {
            display: flex;
            justify-content: center;
        }
    }

    .slider {
        margin: 0 0 20px 0;

        &__slide {
            width: 100%;
            height: 100%;
        }
    }

</style>