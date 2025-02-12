<template>
    <section class="product-list">
        <template v-for="(item, key, index) in products">
            <div class="product-list__item" v-if="index < limit" :key="key">
                <div class="product-list__img">
                    <img :src="item.image_thumb" :alt="key">
                </div>

                <div class="product-list__body">
                    <div class="product-list__inf">
                        <div class="product-list__name">{{ key }}</div>
                        <div class="product-list__propertys">
                            <p><span>Напряжение</span>                  <span>{{ item.voltage }}</span></p>
                            <p><span>Мощность</span>                    <span>{{ item.power }}</span></p>
                            <p><span>Номинальный выходной ток</span>    <span>{{ item.nominal_output_current }}</span></p>
                        </div>
                    </div>

                    <template v-if="width > 768">
                        <div class="product-list__cart-btn">
                            <cartButton :data="{'name' : key, 'productInf': item}" />
                        </div>

                        <div class="product-list__price">
                            <template v-if="item.price">
                                <p>
                                    {{
                                        calculateTotalPrice(item.price, getProductCount(key))
                                    }}
                                </p>
                                <span v-if="getProductCount(key) > 0">
                                    за {{ getProductCount(key) }} {{ getProductLabel(getProductCount(key)) }}
                                </span>
                            </template>
                            <p v-else class="product-list__is-buy">на заказ</p>
                        </div>
                    </template>

                    <div class="product-list__buy-panel" v-else>
                        <div class="product-list__cart-btn">
                            <cartButton :data="{'name' : key, 'productInf': item}" />
                        </div>

                        <div class="product-list__price">
                            <template v-if="item.price">
                                <p>
                                    {{
                                        calculateTotalPrice(item.price, getProductCount(key))
                                    }}
                                </p>
                                <span v-if="getProductCount(key) > 0">
                                    за {{ getProductCount(key) }} {{ getProductLabel(getProductCount(key)) }}
                                </span>
                            </template>
                            <p v-else class="product-list__is-buy">на заказ</p>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <br>
        <br>
        <button class="btn thin" v-if="limit === 5 && Object.keys(products).length > 5" @click="limit = 100">Показать больше</button>
        <button class="btn thin" v-if="limit === 100 && Object.keys(products).length > 5" @click="limit = 5">Скрыть</button>
    </section>
</template>

<script>
import cartButton from "../selectorPage/cartButton.vue";
import { mapGetters } from "vuex";

export default {
    name: "productList",

    components: {
        cartButton,
    },

    props: {
        products: {
            required: true,
            type: Object,
        }
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
    .product-list {
        border-top: 1px solid $light-colored-text;
        padding: 0 0 60px 0;
        margin: 15px 0 0 0;

        &__item {
            display: flex;
            gap: 30px;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid $light-colored-text;
            padding: 15px 0;
        }

        &__img {
            width: 85px;
            height: 85px;
            overflow: hidden;

            @media (max-width: 768px) {
                width: 100px;
                height: 120px;
            }

            @media (max-width: 520px) {
                width: 70px;
                height: 80px;
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &__body {
            flex: 1;
            display: flex;
            gap: 5px;
            justify-content: space-between;
            align-items: center;

            @media (max-width: 768px) {
                flex-direction: column;
                align-items: start;
            }
        }

        &__inf {
            @media (max-width: 768px) {
                width: 100%;
            }
        }

        &__name {
            font-size: clamp(0.875rem, 0.732rem + 0.71vw, 1.375rem);
            margin: 0 0 10px 0;

            @media (max-width: 768px) {
                margin: 0 0 25px 0;
            }
        }

        &__propertys {
            p {
                display: flex;
                justify-content: space-between;
                width: 360px;
                margin: 0 0 10px 0;
                
                @media (max-width: 768px) {
                    width: 100%;
                }
 
                span {
                    color: $light-colored-text;
                    font-size: clamp(0.625rem, 0.518rem + 0.54vw, 1rem);
                }
            }
        }

        &__cart-btn {}

        &__price {
            width: 110px;
            text-align: end;
            font-size: clamp(0.875rem, 0.732rem + 0.71vw, 1.375rem);
            color: $secondary-colored-text;

            @media (max-width: 768px) {
                width: 90px;
                margin: 10px 0 0 0;
                text-align: left;
            }

            span {
                color: $light-colored-text;
                font-size: 14px;
            }
        }

        &__buy-panel {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        &__is-buy {
            border: 1px solid $light-colored-text;
            color: $secondary-colored-text;
            padding: 3px 8px;
            font-size: 14px;
        }
    }

</style>