<template>
    <section class="product-lines">
        <div class="container">
            <h2 class="product-lines__heading h2-heading dark">Обзор линеек ПЧВ</h2>
            <div class="product-lines__slider">
                <swiper
                    class="product-lines-slider"
                    ref="productLines"

                    :modules="modules"
                    :pagination="pagination"
                    :navigation="true"

                    :loop="true"
                    :slidesPerView="3"
                    :centeredSlides="true"
                    :spaceBetween="20"  
                >
                    <swiper-slide v-for="(slide, index) in slides" :key="index">
                        <div class="slider__slide">
                            <div class="slider__video-box">
                                <iframe 
                                    :src="slide.src" 
                                    width="100%" 
                                    height="100%"
                                    allow="encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                                    frameborder="0"
                                    allowfullscreen>
                                </iframe>
                            </div>
                            <p>{{ slide.name }}</p>
                        </div>
                    </swiper-slide>
                </swiper>

                <div class="product-lines__swiper-pagination-bottom"></div>
            </div>
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
            }
        },
    }
</script>

<style lang="scss">
    .product-lines-slider {
        .swiper-button-prev, .swiper-button-next {
            color: $primary-color;

            &::after, &::before {
                font-size: 23px;
                font-weight: 700;
            }

            &:hover {
                color: $hover-btn-color;
            }
        }

        .swiper-button-prev {
            left: var(--swiper-navigation-sides-offset, 180px);
        }

        .swiper-button-next {
            right: var(--swiper-navigation-sides-offset, 180px);
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
        }

        &__slider {}

        &__swiper-pagination-bottom {
            display: flex;
            justify-content: center;
        }
    }

    .slider {
        margin: 0 0 40px 0;

        &__prev-btn, &__next-btn {
            position: absolute;

        }

        &__prev-btn {

        }

        &__next-btn {

        }

        // &__slide {
        //     margin: 0 auto;
        //     width: 927px;

        //     @media(max-width: 1400px) {
        //         width: calc(336px + (927 - 336) * ((100vw - 360px) / (1400 - 360)));
        //     }

        //     p {
        //         font-size: clamp(0.875rem, 0.693rem + 0.91vw, 1.375rem);
        //         margin: 15px 0 0 0;
        //         color: $secondary-colored-text;
        //     }
        // }

        // &__video-box {
        //     width: 100%;
        //     height: 523px;

        //     @media(max-width: 1400px) {
        //         height: calc(191px + (523 - 191) * ((100vw - 360px) / (1400 - 360)));
        //     }
        // }
    }

</style>