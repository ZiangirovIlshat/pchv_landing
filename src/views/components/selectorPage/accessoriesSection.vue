<template>
    <section class="accessories">
        <template v-for="(item, index) in products">
            <div class="accessories__item" v-if="index < limit" :key="item.name">
                <div class="accessories__img">
                    <img v-if="item.image_thumb" :src="item.image_thumb" :alt="item.name">
                    <span class="accessories__non-image" v-else></span>
                </div>
                <div class="accessories__name">{{ item.name }}</div>
                <div class="accessories__cart-section">
                    <cartButton v-if="item.price" :data="[item.price, item.code]" />
                    <div>
                        <p class="accessories__price" v-if="item.price">
                            {{
                                parseFloat(item.price).toLocaleString(
                                    "ru-RU",
                                    {
                                        style: "currency",
                                        currency: "RUB",
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    }
                                )
                            }}
                        </p>
                        <span v-else>по запросу</span>
                        <span>за {{  }} товара</span>
                    </div>
                </div>
            </div>
        </template>

        <div class="accessories__btns">
            <button class="btn thin" v-if="limit === 5 && Object.keys(products).length > 5" @click="limit = 100">Показать больше</button>
            <button class="btn thin" v-if="limit === 100 && Object.keys(products).length > 5" @click="limit = 5">Скрыть</button>
        </div>
    </section>
</template>

<script>
import cartButton from "../selectorPage/cartButton.vue";

    export default {
        name: "accessoriesSection",

        props: {
            products: {
                require: true,
                type: Object,
            }
        },

        components: {
            cartButton,
        },

        data() {
            return {
                limit: 5,
            }
        }
    }
</script>

<style lang="scss" scoped>
    .accessories {
        color: $colored-text;
        display: flex;
        flex-wrap: wrap;
        gap: 20px;


        &__item {
            width: 200px;
            height: 260px;
            font-size: 16px;
        }

        &__img {
            width: 100%;
            height: 160px;
            overflow: hidden;

            border: 1px solid $light-colored-text;

            display: flex;
            justify-content: center;
            align-items: center;

            margin: 0 0 10px  0;

            padding: 25px;

            img {
                width: 100%;
                height: auto;
                object-fit: cover;
            }
        }

        &__non-image {
            position: relative;
            background-color: $light-colored-text;
            width: 80px;
            height: 80px;
            
            &::before, &::after {
                content: "";
                position: absolute;
                height: 5px;
                background-color: #fff;
            }

            &::before {
                width: 60px;
                top: 20px;
                left: 10px;
            }

            &::after {
                width: 40px;
                top: 30px;
                left: 10px;
            }
        }

        &__name {
            margin: 0 0 20px  0;
        }

        &__cart-section {
            display: flex;
            justify-content: space-between;

            span {
                color: $light-colored-text;
                font-size: 14px;
            }
        }

        &__price {
            color: $secondary-color;
            margin: 0 0 8px 0;
        }

        &__btns {
            width: 100%;
        }
    }

</style>