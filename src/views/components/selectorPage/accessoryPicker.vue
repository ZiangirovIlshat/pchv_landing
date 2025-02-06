<template>
    <div class="accessoty-item"
        v-for="(category, key) in data"
        :key="key"
    >
        <div class="accessoty-item__heading">{{ key }}</div>
        <div class="accessoty-item__product" v-for="item in category" :key="item.name">
            <div class="accessoty-item__image">
                <img
                    v-if="item.image_thumb"
                    :src="item.image_thumb"
                    :alt="item.name"
                >
                <span v-else>-</span>
            </div>
            <div class="accessoty-item__name">
                {{item.name}}
            </div>
            <div class="accessoty-item__desc">
                {{item.descr}}
            </div>
            <div class="accessoty-item__price">
                <template v-if="item.price">
                    {{
                        parseFloat(item.price).toLocaleString(
                            "ru-RU",
                            {
                                style: "currency",
                                currency: "RUB",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }
                        )
                    }}
                </template>
                <span v-else>-</span>
            </div>
            <div class="accessoty-item__buy-btn">
                <template v-if="item.price">
                    <cartButton :data="[item.price, item.code]"/>
                </template>
                <span></span>
            </div>
        </div>
    </div>
</template>

<script>
import cartButton from "./cartButton.vue";

    export default {
        name: "accessoryPicker",

        props: {
            data: {
                require: true,
                type: Object,
            }
        },

        components: {
            cartButton,
        },

        created() {
            console.log(this.data)
        },
    }
</script>

<style lang="scss" scoped>
    .accessoty-item {
        $gray: #f0f0f0;

        border-left: 1px solid $gray;
        border-right: 1px solid $gray;

        font-size: 15px;

        &__heading {
            background-color: $gray;
            font-weight: 600;
            padding: 10px 0;
        }

        &__product {
            display: flex;
            justify-content: space-between;
            align-items: center;

            border-bottom: 1px solid $gray;
        }

        &__image {
            width: 60px;
            height: 60px;
            padding: 5px;

            img {
                width: 100%;
                height: auto;
            }
        }

        &__name {
            flex: 0 0 230px;
            text-align: left;
            padding: 0 10px;
        }

        &__desc {
            flex: 1;
            text-align: left;
            color: $light-colored-text;
        }

        &__price {
            flex: 0 0 110px;
            font-size: 16px;
        }

        &__buy-btn {
            flex: 0 0 130px;
        }
    }

</style>