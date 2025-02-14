<template>
    <div class="wrapper">
        <pageHeading :menuFixed="true" />

        <main class="content">
            <cartBody
                :cartItems="cartItems"
                :totalPrice="totalPrice"
            />
            <applicationForm
                @goToOwen="transferToOwenCart()"
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

    export default {
        name: "cartPage",

        components: {
            pageHeading,

            cartBody,
            applicationForm,

            pageFooter,
        },

        data() {
            return {
                transferErr: "",
            }
        },

        computed: {
            ...mapGetters("cart", ["cartItems", "totalPrice", "totalItems"]),
        },

        methods: {
            ...mapActions("cart", ["addToCart", "removeFromCart", "updateItemCount"]),

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
        }
    }
</script>

<style lang="scss" scoped>
    
</style>