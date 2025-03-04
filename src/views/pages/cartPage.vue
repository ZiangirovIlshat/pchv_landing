<template>
    <div class="wrapper">
        <pageHeading :menuFixed="true" />

        <main class="content">
            <h1 class="page-heading">
                <div class="container">Корзина</div>
            </h1>

            <div class="container">
                <div class="no-products" v-if="cartItems.length === 0">
                    <p v-if="!orderUserData">В корзине пока пусто</p>
                    <p v-else>Заказ оформлен № {{ orderUserData[0] }}</p>

                    <p v-if="!orderUserData">Чтобы добавить товары, вернитесь на главную страницу</p>

                    <template v-else>
                        <p>Здравствуйте, {{ orderUserData[1] }}.</p>
                        <br>
                        <br>
                        <br>
                        <p>Спасибо, что воспользовались нашим интернет-магазином. Ваш заказ принят и находится в обработке.</p>
                        <br>
                        <p>Если у вас возникли вопросы, позвоните нам, пожалуйста, по номеру +7 (495) 64-111-56 или напишите на <a class="no-products__link" href="mailto:sales@owen.ru">sales@owen.ru</a>. Будем рады помочь.</p>
                        <br>
                        <p>Мы работаем с 8 до 17 часов.</p>
                    </template>

                    <br>

                    <RouterLink class="btn" to="/">перейти на главную</RouterLink>
                </div>
            </div>

            <cartBody v-if="!orderUserData"
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
import { useMeta } from 'vue-meta';
import pchvImage from "../../assets/images/pchvTopSection.png";

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

                orderUserData: null,
            }
        },

        setup () {
            useMeta({
                title: "Оформление заказа",
                og: {
                    title: "Оформление заказа",
                    url: "https://pchv.owen.ru/cart",
                    type: "website",
                    image: pchvImage,
                }
            })
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

            showOrderResult(orderUserData) {
                this.orderUserData = orderUserData
            }
        }
    }
</script>

<style lang="scss" scoped>
    .no-products {
        color: $colored-text;
        padding: 0 0 10px 0;

        p {
            &:nth-child(1) {
                font-size: clamp(0.875rem, 0.732rem + 0.71vw, 1.375rem);
                margin: 20px 0;
            }

            font-size: clamp(0.75rem, 0.659rem + 0.45vw, 1rem);
        }

        .btn {
            width: 322px;

            @media (max-width: 520px) {
                width: 152px;
                padding: 15px 0;
                font-size: 12px;
            }
        }

        &__link {
            color: $primary-color;
        }

        span {
            color: $secondary-color;
        }
    }
</style>