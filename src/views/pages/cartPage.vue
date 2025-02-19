<template>
    <div class="wrapper">
        <pageHeading :menuFixed="true" />

        <main class="content">
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
            
            <div class="order-result" v-if="orderNum">
                <div class="container">
                    <p>Ваша заявка принята!</p>
                    <p>Заказ № <span>{{orderNum }}</span></p>
                    <p>
                        <RouterLink to="/" class="btn">На главную</RouterLink>
                    </p>
                </div>
            </div>
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
    .order-result {
        padding: 120px 0 0 0;
        color: $colored-text;

        @media (max-width: 768px) {
            padding: 60px 0 0 0;    
        }

        p {
            font-size: 32px;
            text-align: center;
            margin: 0 0 20px 0;

            span {
                color: $secondary-color;
                font-weight: 600;
            }
        }
    }
</style>