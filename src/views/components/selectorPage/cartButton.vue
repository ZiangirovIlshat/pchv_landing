<template>
    <div class="cart-btn">
        <div
            class="cart-btn__count"
            :class="{'_active' : count > 0}"
            v-if="type !== 'onlyDel'"
        >
            <button @click="decrementCount">-</button>
            <span> {{ count }} </span>
            <button @click="incrementCount">+</button>
        </div>

        <div
            class="cart-btn__delete-btn"
            v-if="isInCart && type !== 'onlyCount'"
            title="удалить товар из корзины"
            @click="removeFromCartHandler"
        >
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.875 5.75H4.79167H20.125" stroke="#A58AB2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.2077 5.7513V19.168C18.2077 19.6763 18.0057 20.1638 17.6463 20.5233C17.2869 20.8827 16.7993 21.0846 16.291 21.0846H6.70768C6.19935 21.0846 5.71184 20.8827 5.35239 20.5233C4.99295 20.1638 4.79102 19.6763 4.79102 19.168V5.7513M7.66602 5.7513V3.83464C7.66602 3.3263 7.86795 2.83879 8.2274 2.47935C8.58684 2.1199 9.07435 1.91797 9.58268 1.91797H13.416C13.9243 1.91797 14.4119 2.1199 14.7713 2.47935C15.1307 2.83879 15.3327 3.3263 15.3327 3.83464V5.7513" stroke="#A58AB2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.58398 10.543V16.293" stroke="#A58AB2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.416 10.543V16.293" stroke="#A58AB2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>

        <div
            class="cart-btn__buy-btn"
            v-else-if="type !== 'onlyCount'"
            title="добавить в корзину"
            @click="addToCartHandler"
        >
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512.000000 512.000000" id="cart">
                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" stroke="none" id="cart-g">
                    <path d="M25 4955 c-35 -34 -33 -78 4 -116 l29 -29 304 0 c336 0 365 -4 452
                        -61 57 -38 109 -106 131 -169 8 -25 111 -655 229 -1401 141 -890 222 -1374
                        236 -1411 58 -157 197 -279 366 -323 51 -13 236 -15 1399 -15 1038 1 1344 3
                        1356 13 44 34 50 92 14 131 l-24 26 -1320 0 c-937 0 -1335 3 -1373 11 -130 28
                        -227 118 -263 244 -8 28 -28 138 -45 245 -16 107 -33 207 -36 223 l-6 27 1359
                        0 c1493 0 1407 -3 1536 61 78 40 182 144 219 220 36 74 528 1496 528 1526 0
                        13 -11 35 -25 48 l-24 25 -1941 0 c-1543 0 -1942 3 -1945 13 -3 6 -19 93 -35
                        192 -24 146 -36 193 -65 253 -64 134 -204 249 -345 281 -26 6 -183 11 -368 11
                        l-323 0 -24 -25z m4882 -908 c-2 -6 -106 -307 -231 -667 -247 -713 -254 -729
                        -349 -794 -102 -69 -23 -66 -1524 -66 -1071 0 -1353 3 -1353 12 0 14 -227
                        1455 -236 1501 l-6 27 1852 0 c1480 0 1851 -3 1847 -13z">
                    </path>
                    <path d="M1914 1105 c-184 -40 -337 -192 -375 -373 -6 -32 -9 -92 -6 -137 27
                        -414 530 -604 823 -311 97 97 144 210 144 347 0 233 -158 426 -388 475 -81 17
                        -118 17 -198 -1z m237 -193 c59 -29 114 -84 147 -147 23 -43 27 -63 27 -135 0
                        -99 -23 -158 -86 -221 -96 -96 -250 -120 -369 -59 -51 26 -115 97 -142 155
                        -32 70 -31 180 1 253 28 63 112 143 173 166 64 23 190 17 249 -12z">
                    </path>
                    <path d="M3724 1105 c-149 -32 -275 -132 -341 -271 -38 -78 -38 -80 -38 -205
                        l0 -126 42 -85 c137 -275 480 -361 723 -182 71 52 140 142 170 222 28 72 37
                        200 20 273 -43 188 -192 335 -377 374 -82 18 -119 18 -199 0z m209 -181 c64
                        -22 140 -92 174 -162 37 -75 39 -181 5 -257 -97 -215 -389 -254 -534 -72 -132
                        167 -61 418 139 492 52 19 159 18 216 -1z">
                    </path>
                </g>
            </svg>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

    export default {
        name: "cartButton",

        props: {
            data: {
                required: true,
                type: Object,
            },

            type: {
                type: String,
                default: "full",
                // onlyDel - только кнопка удалить
                // onlyCount - только счетчик
            }
        },

        data() {
            return {
                count: 0,
            }
        },

        computed: {
            ...mapGetters("cart", ["cartItems", "totalPrice", "totalItems"]),

            isInCart() {
                return this.cartItems.some(cartItem => cartItem.code === this.data.productInf.code);
            }
        },

        methods: {
            ...mapActions("cart", ["addToCart", "removeFromCart", "updateItemCount"]),

            incrementCount() {
                if (this.count === 0) {
                    this.count = 1;
                    this.addToCartHandler();
                    return;
                }

                if (this.count < 9) {
                    this.count++;

                    if (this.isInCart) {
                        this.updateItemCount({ productCode: this.data.productInf.code, count: this.count });
                    }
                }
            },

            decrementCount() {
                if (this.count > 0) {
                    this.count--;

                    if(this.count === 0) {
                        this.removeFromCartHandler();
                    }

                    if (this.isInCart) {
                        this.updateItemCount({ productCode: this.data.productInf.code, count: this.count });
                    }
                }
            },

            addToCartHandler() {
                if(this.count === 0) this.count = 1;

                const item = {
                    name: this.data.name,
                    code: this.data.productInf.code,
                    price: this.data.productInf.price,
                    count: this.count,

                    propertys: {
                        voltage: this.data.productInf.voltage ?? null,
                        power: this.data.productInf.power ?? null,
                        nominal_output_current: this.data.productInf.nominal_output_current ?? null,
                    }
                };

                this.addToCart(item);
            },

            removeFromCartHandler() {
                this.removeFromCart(this.data.productInf.code);
                this.resetCount();
            },

            resetCount() {
                this.count = 0;
            },

            updateCount() {
                const item = this.cartItems.find(cartItem => cartItem.code === this.data.productInf.code);

                if (item) {
                    this.count = item.count;
                } else {
                    this.resetCount();
                }
            }
        },

        watch: {
            cartItems: {
                handler() {
                    this.updateCount();
                },
                deep: true
            }
        },

        mounted() {
            this.updateCount();
        },
    }
</script>

<style lang="scss" scoped>
    .cart-btn {
        width: 115px;
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: space-between;

        &__count {
            width: 65px;
            height: 36px;
            border: 1px solid $light-colored-text;
            display: flex;
            justify-content: space-between;
            align-items: center;

            &._active {
                border: 1px solid $primary-color;
            }

            button {
                color: $primary-color;
                background: none;
                border: none;
                cursor: pointer;
            }

            span {
                font-size: 14px;
            }
        }

        &__buy-btn, &__delete-btn {
            width: 36px;
            height: 36px;
            padding: 5px;

            display: flex;
            justify-content: center;
            align-self: center;

            cursor: pointer;
        }

        &__buy-btn {
            background-color: $primary-color;

            @media (hover: hover) and (pointer: fine) {
                &:hover {
                    background-color: #fff;
                    outline: 1px solid $secondary-color;

                    svg {
                        fill: $secondary-color;
                    }
                }
            }

            svg {
                fill: #fff;
            }
        }

        &__delete-btn {}
    }

</style>