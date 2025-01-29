<template>
    <div class="page-heading">
        <div class="container">
            <div class="page-heading__row" v-if="width > 768">
                <div class="page-heading__logo">
                    <a href="/">
                        <svg width="100" height="100">
                            <use xlink:href="../../assets/images/sprite.svg#logo" />
                        </svg>
                    </a>
                </div>
                <nav class="menu">
                    <ul>
                        <li><a class="menu__link" href="">преимущества</a></li>
                        <li><a class="menu__link" href="">характеристики</a></li>
                        <li><a class="menu__link" href="">дополнительное оборудование</a></li>
                        <li class="menu__cart-bnt">
                            <a href="/" title="корзина">
                                <img src="../../assets/images/cart.png" alt="Корзина">
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pageHeading",

        data() {
            return {
                width: window.innerWidth,
                menuIsOpen: false,
            }
        },

        methods: {
            updateWidth() {
                this.width = window.innerWidth;
                console.log(this.width)
            },
        },

        created() {
            window.addEventListener("resize", this.updateWidth);
        }
    }
</script>

<style lang="scss" scoped>
    .page-heading {
        padding: 20px 0;
        font-size: 16px;
        position: absolute;
        width: 100%;

        &__row {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__logo {
            width: 120px;
            height: 40px;

            svg {
                width: 120px;
                height: 40px;
                fill: none;

                #logo-rect {
                    stroke : white;
                }
                #logo-path {
                    fill: white;
                }
            }
        }
    }

    .menu {

        ul {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 30px;
        }

        &__link {
            color: #fff;
            text-decoration: none;
        }

        &__cart-bnt {
            width: 30px;
            height: 33px;

            @media (max-width: 768px) {
                width: 21px;
                height: 23px;
            }
        
            img {
                width: 21px;
                height: 23px;
            }
        }
    }

</style>