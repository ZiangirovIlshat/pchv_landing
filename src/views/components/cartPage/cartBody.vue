<template>
    <div class="cart-body">
        <h1 class="cart-body__heading">
            <div class="container">Корзина</div>
        </h1>
        <div class="container">

            <div class="cart-body__no-products" v-if="cartItems.length === 0">
                <p>В вашей корзине пусто</p>
                <RouterLink class="btn" to="/selector">Подобрать прибор</RouterLink>
            </div>

            <template v-if="cartItems.length > 0">
                <div class="cart-body__cart-inf">
                    <div class="cart-inf">
                        <p class="cart-inf__heading">Ваш заказ:</p>
                        <p class="cart-inf__total-cart-inf"> {{ cartItems.length }} {{ getProductLabel(cartItems.length) }} на сумму {{ getLocaleString(totalPrice) }} </p>
                    </div>

                    <div class="cart-inf__price">
                        <span>Сумма:</span> <span class="cart-inf__total-price">{{ getLocaleString(totalPrice) }}</span>
                    </div>

                </div>

                <div class="cart-body__products">
                    <div class="product"
                        v-for="(item, index) in cartItems" 
                        :key="item.code"
                    >
                        <div class="product__num">{{ index + 1 }}</div>

                        <div class="product__body">
                            <div class="product__propertys">
                                <div class="product__name">{{ item.name }}</div>

                                <div class="product__inf">
                                    <template v-if="item.propertys.voltage && item.propertys.power && item.propertys.nominal_output_current">
                                        <p><span>Напряжение</span>                  <span>{{ item.propertys.voltage }}</span></p>
                                        <p><span>Мощность</span>                    <span>{{ item.propertys.power }}</span></p>
                                        <p><span>Номинальный выходной ток</span>    <span>{{ item.propertys.nominal_output_current }}</span></p>
                                    </template>

                                    <p v-else>Дополнительное оборудование</p>
                                </div>
                            </div>

                            <div class="product__cart-selectors">
                                <div class="product__count" v-if="width > 768">
                                    <cartButton :type="'onlyCount'" :data="{'name' : item.name, 'productInf': item}" />
                                </div>

                                <div class="product__price">
                                    <p>{{ getLocaleString(item.price * item.count) }}</p>
                                    <span>за {{ item.count }} {{ getProductLabel(item.count) }}</span>
                                </div>

                                <div class="product__delete-btn" v-if="width > 768">
                                    <cartButton :type="'onlyDel'" :data="{'name' : item.name, 'productInf': item}" />
                                </div>

                                <div class="product__mobile-selectors" v-if="width <= 768">
                                    <div class="product__delete-btn">
                                        <cartButton :type="'onlyDel'" :data="{'name' : item.name, 'productInf': item}" />
                                    </div>
                                    <div class="product__count">
                                        <cartButton :type="'onlyCount'" :data="{'name' : item.name, 'productInf': item}" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p class="cart-body__clear-card" @click="$emit('clearCart')">Очистить корзину</p>
                <br>
            </template>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';

import cartButton from "../selectorPage/cartButton.vue";

    export default {
        name: "cartBody",

        components: {
            cartButton,
            RouterLink,
        },

        props: {
            cartItems: {
                required: true,
                type: Array,
            },

            totalPrice: {
                required: true,
                type: Number,
            }
        },

        data() {
            return {
                width: window.innerWidth,
            }
        },

        methods: {
            updateWidth() {
                this.width = window.innerWidth;
            },

            getProductLabel(count) {
                if (count % 10 === 1 && count % 100 !== 11) { return "товар"; } 
                else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 10 || count % 100 >= 20)) { return "товара"; } 
                else { return "товаров"; }
            },

            getLocaleString(num) {
                return num.toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                });
            }
        },

        created() {
            window.addEventListener("resize", this.updateWidth);
        }
    }
</script>

<style lang="scss" scoped>
    .cart-body {
        color: $colored-text;
        padding: 120px 0 0 0;
        font-size: clamp(0.75rem, 0.679rem + 0.36vw, 1rem);

        @media (max-width: 920px) {
            padding: 45px 0 0 0;
        }

        &__heading {
            font-size: clamp(0.875rem, 0.732rem + 0.71vw, 1.375rem);
            padding: 0 0 20px 0;
            border-bottom: 2px solid $light-colored-text;

            @media (max-width: 920px) {
                padding: 10px 0;
            }
        }

        &__no-products {
            padding: 30px 0;
            text-align: center;

            p {
                font-size: 32px;
                margin: 20px 0;
            }

            a {
                background: linear-gradient(90deg, 
                    #FF02A9 10%, 
                    #91017D 35%,   
                    #9C0191 75%, 
                    #FF0EBA 110%
                );
            }
        }

        &__cart-inf {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid $light-colored-text;
            padding: 15px 0 30px 0;

            @media (max-width: 920px) {
                padding: 10px 0;
            }

            @media (max-width: 768px) {
                padding: 10px 0;
            }
        }

        &__products {}

        &__clear-card {
            cursor: pointer;
            text-decoration: underline;
        }
    }

    .cart-inf {

        &__heading {
            font-size: clamp(0.875rem, 0.732rem + 0.71vw, 1.375rem);
            margin: 0 0 15px 0;
        }

        &__total-cart-inf {
            color: $light-colored-text;
            font-size: clamp(0.75rem, 0.679rem + 0.36vw, 1rem);
        }

        &__price {
            display: flex;
            align-items: center;
            gap: 100px;

            @media (max-width: 768px) {
                display: none;
            }

            span {
                font-size: clamp(0.875rem, 0.732rem + 0.71vw, 1.375rem);
            }
        }

        &__total-price {
            color: $secondary-color;
        }
    }

    .product {
        display: flex;
        align-items: start;
        gap: 10px;
        padding: 22px 0;
        border-bottom: 1px solid $light-colored-text;

        &:last-child {
            border-bottom: none;
        }

        &__num {
            margin: 0 30px 0 0;
        }

        &__body {
            flex: 1;

            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;

            @media (max-width: 768px) {
                flex-direction: column;
                align-items: start;
            }
        }

        &__propertys {
            flex: 0 0 30%;
            min-width: 360px;

            @media (max-width: 768px) {
                min-width: auto;
                width: 100%;
            }

            p {
                display: flex;
                justify-content: space-between;
                color: $light-colored-text;
                font-size: clamp(0.75rem, 0.679rem + 0.36vw, 1rem);
                margin: 0 0 10px 0;
            }
        }

        &__name {
            margin: 0 0 15px 0;

            @media (max-width: 768px) {
                margin: 0 0 10px 0; 
            }
        }

        &__cart-selectors {
            flex: 0 0 35%;

            display: flex;
            justify-content: space-between;
            align-items: center;

            @media (max-width: 768px) {
                width: 100%;
                justify-content: space-between;
            }
        }

        &__count {
            overflow: hidden;
            width: 65px;
        }
        
        &__delete-btn {
            overflow: hidden;
            width: 35px;
        }
        
        &__mobile-selectors {
            display: flex;
        }

        &__price {
            p {
                color: $secondary-color;
                font-size: clamp(0.875rem, 0.732rem + 0.71vw, 1.375rem);
            }

            span {
                color: $light-colored-text;
                font-size: clamp(0.75rem, 0.679rem + 0.36vw, 1rem);
            }
        }
    }

</style>