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
                            <p><span>Наминальный выходной ток</span>    <span>{{ item.nominal_output_current }}</span></p>
                        </div>
                    </div>

                    <div class="product-list__cart-btn">
                        <cartButton :data="{'name' : key, 'productInf': item}" />
                    </div>

                    <div class="product-list__price">
                        <template v-if="item.price">
                            <p>
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
                            <span >за {{  }} товаров</span>
                        </template>
                        <p v-else class="product-list__is-buy">на заказ</p>
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

    export default {
        name: "productList",

        components: {
            cartButton,
        },

        props: {
            products: {
                require: true,
                type: Object,
            }
        },

        data() {
            return {
                limit: 5,
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

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &__body {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__inf {}

        &__name {
            font-size: 22px;
            margin: 0 0 10px 0;
        }

        &__propertys {
            p {
                display: flex;
                justify-content: space-between;
                width: 360px;
                margin: 0 0 10px 0;

                span {
                    color: $light-colored-text;
                    font-size: 16px;
                }
            }
        }

        &__cart-btn {}

        &__price {
            font-size: 22px;
            color: $secondary-colored-text;

            span {
                color: $light-colored-text;
                font-size: 14px;
            }
        }

        &__is-buy {
            border: 1px solid $light-colored-text;
            color: $secondary-colored-text;
            padding: 3px 8px;
            font-size: 14px;
        }
    }

</style>