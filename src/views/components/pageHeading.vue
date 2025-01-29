<template>
    <header class="header">
        <div class="container">
            <div class="header__row" v-if="width > 768">
                <div class="header__logo">
                    <a href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 139 41" id="logo">
                            <rect x="0.5" y="0.5" width="138" height="40"></rect>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1 40H2H14.1575C7.93717 37.9782 3.02181 33.0628 1 26.8425V39V40ZM0 20.5V40V41H1H20.5H56.8676C63.3892 41 67.8468 36.6872 69.392 31.5089C70.8397 26.6576 69.7677 20.9346 65.423 17.1417C67.5094 14.6 67.9613 10.6286 66.8467 7.23663C65.5653 3.33731 62.1655 0 56.5264 0H20.5H1H0V1V20.5ZM35.6856 6.72856L35.7028 6.71142L35.0008 6.0094C32.7408 3.74781 29.955 2.01167 26.8425 1H49.5V27H50.5V1H56.5264C66.301 1 68.5001 11.8133 64.646 16.5109C64.4313 16.7726 64.1979 17.0153 63.9459 17.2361C64.2212 17.4399 64.4847 17.6515 64.7364 17.87C73.0599 25.0973 68.5392 40 56.8676 40H26.8425C35.06 37.329 41 29.6082 41 20.5C41 15.1989 38.9879 10.3677 35.6856 6.72856ZM34.9777 7.43655C38.0993 10.894 40 15.475 40 20.5C40 31.2696 31.2696 40 20.5 40C9.73045 40 1 31.2696 1 20.5C1 15.475 2.90068 10.894 6.02234 7.43656L19.7929 21.2071L20.5 21.9142L21.2071 21.2071L34.9777 7.43655ZM34.2886 6.71142C34.2873 6.71012 34.286 6.70883 34.2847 6.70754C34.2709 6.69376 34.2571 6.68 34.2433 6.66626C34.0213 6.44574 33.7946 6.2311 33.5634 6.02243C29.9895 2.79743 25.3374 1 20.5 1C15.6626 1 11.0105 2.79743 7.43665 6.02244C7.20487 6.23159 6.97763 6.44674 6.75517 6.6678C6.74056 6.68232 6.72598 6.69686 6.71142 6.71142L7.41852 7.41853L19.7929 19.7929L20.5 20.5L21.2071 19.7929L33.5815 7.41852L34.2886 6.71142ZM5.31435 6.72857C3.39107 8.84808 1.9054 11.372 1 14.1575V2V1H2H14.1575C11.0462 2.01128 8.26139 3.74647 6.00183 6.00679L5.2972 6.71142L5.31435 6.72857ZM119.5 1V14.2H118.5V1H119.5ZM119.5 26.8V40H118.5V26.8H119.5ZM99.5 13.9V1H98.5V13.4H79V14.4H98.5V26.6H79V27.6H98.5V40H99.5V27.1V13.9Z"></path>
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
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
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
            },
        },

        created() {
            window.addEventListener("resize", this.updateWidth);
        }
    }
</script>

<style lang="scss" scoped>
    .header {
        $header-text-color: #000;
        $header-text-hover-color: $primary-color;

        padding: 20px 0;
        font-size: 16px;
        position: absolute;
        width: 100%;
        color: $header-text-color;

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

                rect { stroke: #fff;}
                path {fill: #fff;}
            }

            &._dark {
                svg {
                    rect { stroke: $colored-text;}
                    path {fill: $colored-text;}
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

            &._colored-hover {
                a:hover {
                    text-decoration: none;
                    color: $primary-color;
                }
            }
        }

        &__link {
            color: #fff;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }

        &__cart-bnt {
            width: 30px;
            height: 33px;

            svg {
                width: 30px;
                height: 33px;

                g { fill: #fff; }

                &:hover {
                    g { fill: $primary-color; }
                }
            }

            &._dark {
                svg {
                    g { fill: $colored-text;}
                }
            }

            @media (max-width: 768px) {
                width: 21px;
                height: 23px;
            }
        }
    }

</style>