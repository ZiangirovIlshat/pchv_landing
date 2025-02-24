<template>
    <div class="wrapper">
        <pageHeading :menuFixed="true" />

        <main class="content">
            <h1 class="page-heading">
                <div class="container">Корзина</div>
            </h1>

            <div class="container">
                <div class="no-products" v-if="cartItems.length === 0">
                    <p v-if="!orderNum">В корзине пока пусто</p>
                    <p v-else>Ваш заказ принят</p>

                    <p v-if="!orderNum">Чтобы добавить товары, вернитесь на главную страницу</p>
                    <p v-else>По всем вопросам обращайтесь на почту: <a data-v-1d91bb0e="" class="footer__link email" href="mailto:sales@owen.ru">sales@owen.ru</a>.  Мы всегда рады помочь!</p>

                    <br>

                    <RouterLink class="btn" to="/">перейти на главную</RouterLink>
                </div>
            </div>

            <cartBody v-if="!orderNum"
                @clearCart="clearCart()"

                :cartItems="cartItems"
                :totalPrice="totalPrice"
            />

            <applicationForm
                @goToOwen="transferToOwenCart"
                @formSubmited="showOrderResult"

                :transferErr="transferErr"
                :basketIsEmpty="cartItems.length === 0"
            />
        </main>

        <pageFooter/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import pageHeading from "../components/pageHeading.vue";

import cartBody from "../components/cartPage/cartBody.vue";
import applicationForm from "../components/cartPage/applicationForm.vue";

import pageFooter from "../components/pageFooter.vue";

import { RouterLink } from 'vue-router';

    export default {
        name: "cartPage",

        components: {
            pageHeading,

            cartBody,
            applicationForm,

            pageFooter,

            RouterLink,
        },

        data() {
            return {
                transferErr: "",

                orderNum: null,
            }
        },

        computed: {
            ...mapGetters("cart", ["cartItems", "totalPrice"]),
        },

        methods: {
            ...mapActions("cart", ["clearCart"]),

            updateWidth() {
                this.width = window.innerWidth;
            },

            async transferToOwenCart() {
                const promises = [];

                this.transferErr = "";

                for (let i = 0; i < this.cartItems.length; i++) {
                    const el = this.cartItems[i];

                    try {
                        promises.push(
                            fetch(`https://owen.ru/ajax/basket?id=${el.code}&count=${el.count || 1}`, {
                                credentials: "include",
                            }).then(response => {
                                if (!response.ok) throw new Error;
                            })
                        );

                    } catch (error) {
                        this.transferErr = "Что-то пошло не так, пожалуйста, перезагрузите страницу и повторите попытку";
                    }
                }

                try {
                    await Promise.all(promises);
                } catch (error) {
                    this.transferErr = "Что-то пошло не так, пожалуйста, перезагрузите страницу и повторите попытку";
                }

                if(this.transferErr) return;

                window.location.href = "https://owen.ru/cart";
            },

            showOrderResult(orderNumber) {
                this.orderNum = orderNumber;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .no-products {
        color: $colored-text;

        p {
            font-size: clamp(0.875rem, 0.732rem + 0.71vw, 1.375rem);
            margin: 20px 0;

            &:nth-child(2) {
                font-size: clamp(0.75rem, 0.659rem + 0.45vw, 1rem);
            }
        }

        a {
            width: 322px;

            @media (max-width: 520px) {
                width: 152px;
                padding: 15px 0;
                font-size: 12px;
            }
        }

        span {
            color: $secondary-color;
        }
    }
</style>