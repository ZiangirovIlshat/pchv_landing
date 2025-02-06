<template>
    <div class="cart-btn">
        <div class="cart-btn__count">
            <button @click="count !== 0 ? count-- : ''">-</button>
            <span> {{ count }} </span>
            <button @click="count++">+</button>
        </div>
        <div class="cart-btn__buy-btn" title="добавить в корзину">
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
    export default {
        name: "cartButton",

        props: {
            data: {
                require: true,
                type: Array,
            }
        },

        data() {
            return {
                count: 0,
            }
        },

        methods: {

        },
    }
</script>

<style lang="scss" scoped>
    .cart-btn {
        width: 115px;
        display: flex;
        gap: 10px;
        justify-content: space-between;
        margin: 0 auto;

        &__count {
            width: 65px;
            border: 1px solid $light-colored-text;
            display: flex;
            justify-content: space-between;
            align-items: center;

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

        &__buy-btn {
            width: 36px;
            height: 36px;
            padding: 4px;

            cursor: pointer;

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
    }

</style>