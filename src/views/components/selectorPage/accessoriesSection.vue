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
                    <cartButton 
                        v-if="item.price"
                        :data="{
                            'name': item.name,
                            'productInf': {
                                code: item.code,
                                price: item.price,
                                image_thumb: item.image_thumb,
                            } 
                        }" 
                    />
                    <div>
                        <template v-if="item.price">
                            <p class="accessories__price">
                                {{
                                    calculateTotalPrice(item.price, getProductCount(item.name))
                                }}
                            </p>
                            <span v-if="getProductCount(item.name) > 0">
                                за {{ getProductCount(item.name) }} {{ getProductLabel(getProductCount(item.name)) }}
                            </span>
                        </template>

                        <span v-else>по запросу</span>
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
import { mapGetters } from "vuex";

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
        },

        computed: {
            ...mapGetters("cart", ["cartItems", "totalItems", "totalPrice"]),
        },

        methods: {
            getProductCount(productName) {
                const cartItem = this.cartItems.find(item => item.name === productName);
                return cartItem ? cartItem.count : 0;
            },
            
            calculateTotalPrice(price, count) {
                let totalPrice = 0;

                if(count === 0) {
                    totalPrice = price;
                } else {
                    totalPrice = price * count;
                }

                return totalPrice.toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                });
            },

            getProductLabel(count) {
                if (count % 10 === 1 && count % 100 !== 11) {
                    return "товар";
                } else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 10 || count % 100 >= 20)) {
                    return "товара";
                } else {
                    return "товаров";
                }
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
            width: 205px;
            height: 260px;
            font-size: 16px;

            @media (max-width: 920px) {
                width: 160px;
            }

            @media (max-width: 768px) {
                width: 150px;
            }

            @media (max-width: 520px) {
                flex: 0 0 46%;
                width: 100%;
            }
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
            font-size: clamp(0.75rem, 0.679rem + 0.36vw, 1rem);
            margin: 0 0 10px  0;
        }

        &__cart-section {
            display: flex;
            justify-content: space-between;

            @media (max-width: 920px) {
                flex-direction: column;

                div:nth-child(2) {
                    margin: 8px 0 0 0;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
            }

            span {
                color: $light-colored-text;
                font-size: 14px;
            }
        }

        &__price {
            color: $secondary-color;
            font-size: clamp(0.875rem, 0.839rem + 0.18vw, 1rem);

            @media (max-width: 920px) {
                margin: 0;
            }
        }

        &__btns {
            width: 100%;
        }
    }

</style>