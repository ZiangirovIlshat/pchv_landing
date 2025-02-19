<template>
    <header class="header" :class="{'_fixed' : menuFixed}">
        <div class="container">
            <div class="header__row">
                <div class="header__logo logo" :class="{'_dark' : menuFixed}">
                    <RouterLink to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 139 41" id="logo">
                            <rect x="0.5" y="0.5" width="138" height="40"></rect>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1 40H2H14.1575C7.93717 37.9782 3.02181 33.0628 1 26.8425V39V40ZM0 20.5V40V41H1H20.5H56.8676C63.3892 41 67.8468 36.6872 69.392 31.5089C70.8397 26.6576 69.7677 20.9346 65.423 17.1417C67.5094 14.6 67.9613 10.6286 66.8467 7.23663C65.5653 3.33731 62.1655 0 56.5264 0H20.5H1H0V1V20.5ZM35.6856 6.72856L35.7028 6.71142L35.0008 6.0094C32.7408 3.74781 29.955 2.01167 26.8425 1H49.5V27H50.5V1H56.5264C66.301 1 68.5001 11.8133 64.646 16.5109C64.4313 16.7726 64.1979 17.0153 63.9459 17.2361C64.2212 17.4399 64.4847 17.6515 64.7364 17.87C73.0599 25.0973 68.5392 40 56.8676 40H26.8425C35.06 37.329 41 29.6082 41 20.5C41 15.1989 38.9879 10.3677 35.6856 6.72856ZM34.9777 7.43655C38.0993 10.894 40 15.475 40 20.5C40 31.2696 31.2696 40 20.5 40C9.73045 40 1 31.2696 1 20.5C1 15.475 2.90068 10.894 6.02234 7.43656L19.7929 21.2071L20.5 21.9142L21.2071 21.2071L34.9777 7.43655ZM34.2886 6.71142C34.2873 6.71012 34.286 6.70883 34.2847 6.70754C34.2709 6.69376 34.2571 6.68 34.2433 6.66626C34.0213 6.44574 33.7946 6.2311 33.5634 6.02243C29.9895 2.79743 25.3374 1 20.5 1C15.6626 1 11.0105 2.79743 7.43665 6.02244C7.20487 6.23159 6.97763 6.44674 6.75517 6.6678C6.74056 6.68232 6.72598 6.69686 6.71142 6.71142L7.41852 7.41853L19.7929 19.7929L20.5 20.5L21.2071 19.7929L33.5815 7.41852L34.2886 6.71142ZM5.31435 6.72857C3.39107 8.84808 1.9054 11.372 1 14.1575V2V1H2H14.1575C11.0462 2.01128 8.26139 3.74647 6.00183 6.00679L5.2972 6.71142L5.31435 6.72857ZM119.5 1V14.2H118.5V1H119.5ZM119.5 26.8V40H118.5V26.8H119.5ZM99.5 13.9V1H98.5V13.4H79V14.4H98.5V26.6H79V27.6H98.5V40H99.5V27.1V13.9Z"></path>
                        </svg>
                    </RouterLink>
                </div>

                <nav class="menu" :class="{'_fixed' : menuFixed}">
                    <ul :class="{'_colored-hover' : menuFixed}">
                        <template v-if="width > 920">
                            <li><a class="menu__link" @click="scrollTo('advantages')">преимущества</a></li>
                            <li><a class="menu__link" @click="scrollTo('features')">характеристики</a></li>
                            <li><a class="menu__link" @click="scrollTo('additional-equipment')">дополнительное оборудование</a></li>
                        </template>
                    </ul>

                    <div class="menu__btns">
                        <div class="menu__btns-elem">
                            <cartLink
                                :size="width < 920 ? [21, 21] : [30, 30]"
                                :style="menuFixed ? 'dark' : 'light'"
                            />
                        </div>

                        <div class="menu__btns-elem">
                            <div class="burger-menu" :class="{'_dark' : menuFixed}" @click="openMenu()">
                                <span></span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>

        <div
            class="mobile-menu"
            :class="menuIsOpen ? '_opened' : '_closed'"
        >
            <div class="mobile-menu__content">
                <div class="mobile-menu__header">
                    <div class="mobile-menu__header-item">
                        <div class="mobile-menu__cart-btn">
                            <cartLink
                                @click="closeMenu()"
                                :size="[25, 25]"
                                :style="'dark'"
                            />
                        </div>
                    </div>

                    <div class="mobile-menu__header-item">
                        <div class="mobile-menu__logo logo">
                            <RouterLink @click="closeMenu()" to="/">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 139 41" id="logo">
                                    <rect x="0.5" y="0.5" width="138" height="40"></rect>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 40H2H14.1575C7.93717 37.9782 3.02181 33.0628 1 26.8425V39V40ZM0 20.5V40V41H1H20.5H56.8676C63.3892 41 67.8468 36.6872 69.392 31.5089C70.8397 26.6576 69.7677 20.9346 65.423 17.1417C67.5094 14.6 67.9613 10.6286 66.8467 7.23663C65.5653 3.33731 62.1655 0 56.5264 0H20.5H1H0V1V20.5ZM35.6856 6.72856L35.7028 6.71142L35.0008 6.0094C32.7408 3.74781 29.955 2.01167 26.8425 1H49.5V27H50.5V1H56.5264C66.301 1 68.5001 11.8133 64.646 16.5109C64.4313 16.7726 64.1979 17.0153 63.9459 17.2361C64.2212 17.4399 64.4847 17.6515 64.7364 17.87C73.0599 25.0973 68.5392 40 56.8676 40H26.8425C35.06 37.329 41 29.6082 41 20.5C41 15.1989 38.9879 10.3677 35.6856 6.72856ZM34.9777 7.43655C38.0993 10.894 40 15.475 40 20.5C40 31.2696 31.2696 40 20.5 40C9.73045 40 1 31.2696 1 20.5C1 15.475 2.90068 10.894 6.02234 7.43656L19.7929 21.2071L20.5 21.9142L21.2071 21.2071L34.9777 7.43655ZM34.2886 6.71142C34.2873 6.71012 34.286 6.70883 34.2847 6.70754C34.2709 6.69376 34.2571 6.68 34.2433 6.66626C34.0213 6.44574 33.7946 6.2311 33.5634 6.02243C29.9895 2.79743 25.3374 1 20.5 1C15.6626 1 11.0105 2.79743 7.43665 6.02244C7.20487 6.23159 6.97763 6.44674 6.75517 6.6678C6.74056 6.68232 6.72598 6.69686 6.71142 6.71142L7.41852 7.41853L19.7929 19.7929L20.5 20.5L21.2071 19.7929L33.5815 7.41852L34.2886 6.71142ZM5.31435 6.72857C3.39107 8.84808 1.9054 11.372 1 14.1575V2V1H2H14.1575C11.0462 2.01128 8.26139 3.74647 6.00183 6.00679L5.2972 6.71142L5.31435 6.72857ZM119.5 1V14.2H118.5V1H119.5ZM119.5 26.8V40H118.5V26.8H119.5ZM99.5 13.9V1H98.5V13.4H79V14.4H98.5V26.6H79V27.6H98.5V40H99.5V27.1V13.9Z"></path>
                                </svg>
                            </RouterLink>
                        </div>
                    </div>

                    <div class="mobile-menu__header-item">
                        <div class="mobile-menu__close-btn" @click="closeMenu()"></div>
                    </div>
                </div>
                <div class="mobile-menu__body">
                    <nav>
                        <ul>
                            <li><a class="mobile-menu__link" @click="scrollTo('advantages')">преимущества</a></li>
                            <li><a class="mobile-menu__link" @click="scrollTo('features')">характеристики</a></li>
                            <li><a class="mobile-menu__link" @click="scrollTo('additional-equipment')">дополнительное оборудование</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="mobile-menu__footer">
                    <div class="mobile-menu__contacts">
                        <p>Тел.: <a href="tel:+74957273016">+7 (495) 727-30-16</a></p>

                        <p>E-mail: <a href="mailto:sales@owen.ru">sales@owen.ru</a></p>

                        <p><a @click="closeMenu()" href="/">Политика конфиденциальности</a></p>
                    </div>

                    <p class="mobile-menu__social-links">
                        <span>
                            <a href="https://www.youtube.com/@owentube" title="https://www.youtube.com/@owentube" target="_blank">
                                <svg width="100" height="100">
                                    <use xlink:href="../../assets/images/sprite.svg#youTube" />
                                </svg>
                            </a>
                        </span>
                        <span>
                            <a href="mailto:sales@owen.ru" title="sales@owen.ru" target="_blank">
                                <svg width="100" height="100">
                                    <use xlink:href="../../assets/images/sprite.svg#mail" />
                                </svg>
                            </a>
                        </span>
                        <span>
                            <a href="https://vk.com/po_owen" title="https://vk.com/po_owen" target="_blank">
                                <svg width="100" height="100">
                                    <use xlink:href="../../assets/images/sprite.svg#vk" />
                                </svg>
                            </a>
                        </span>
                        <span>
                            <a href="https://t.me/owen_prom" title="https://t.me/owen_prom" target="_blank">
                                <svg width="100" height="100">
                                    <use xlink:href="../../assets/images/sprite.svg#tg" />
                                </svg>
                            </a>
                        </span>
                    </p>

                    <div class="mobile-menu__btn">
                        <RouterLink @click="closeMenu()" to="/selector" class="btn">заказать</RouterLink>
                    </div>
                </div>
            </div>

            <div class="mobile-menu__mask" @click="closeMenu()"></div>
        </div>
    </header>
</template>

<script>
import { RouterLink } from 'vue-router';

import cartLink from "../components/cartLink.vue";

    export default {
        name: "pageHeading",

        props: {
            menuFixed: {
                type: Boolean,
                default: false,
            },
        },

        components: {
            RouterLink,
            cartLink,
        },

        data() {
            return {
                width: window.innerWidth,
                menuIsOpen: false,
            }
        },

        methods: {
            updateWidth() {
                this.width = window.innerWidth;

                if(this.width > 920) {
                    this.closeMenu()
                }
            },

            openMenu() {
                this.menuIsOpen = true;

                const scrollY = window.scrollY;

                document.body.style.position = 'fixed';
                document.body.style.top = `-${scrollY}px`;

                document.body.style.overflowY = 'scroll';
            },

            closeMenu() {
                this.menuIsOpen = false;

                const scrollY = document.body.style.top;

                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.overflowY = 'auto';

                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            },

            scrollTo(elem) {
                const isHomePage = this.$route.path === '/' || this.$route.path === '/index.html';

                if (!isHomePage) {
                    this.$router.push({ path: '/' }).then(() => {
                        this.scrollToElement(elem);
                    });
                } else {
                    this.scrollToElement(elem);
                }
            },

            scrollToElement(elem) {
                this.closeMenu();

                this.$nextTick(() => {
                    const targetElement = document.querySelector(`#${elem}`);

                    if (targetElement) {
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = window.pageYOffset;

                        let offset = 100;

                        if (this.width < 920) {
                            offset = 50;
                        }

                        window.scrollTo({
                            top: elementPosition + offsetPosition - offset,
                            behavior: "smooth"
                        });
                    }
                });
            },
        },

        created() {
            window.addEventListener("resize", this.updateWidth);
        }
    }
</script>

<style lang="scss" scoped>
    .logo {
        max-width: 120px; min-width: 120px; 
        max-height: 40px; min-height: 40px;

        @media (max-width: 920px) {
            max-width: 63px; min-width: 63px;
            max-height: 20px; min-height: 20px;
        }

        svg {
            width: 100%;
            height: 100%;;
            fill: none;
        }
    }

    .header {
        padding: 20px 0;
        font-size: 16px;
        position: absolute;
        width: 100%;
        color: #fff;
        z-index: 10;

        &._fixed {
            background-color: #fff;
            color: $colored-text;
            position: fixed;
            top: 0;
            -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
            -moz-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);

            animation: headerDown 0.5s ease-out forwards;
        }

        @keyframes headerDown {
            from {
                transform: translateY(-100%);
            }
            to {
                transform: translateY(0);
            }
        }

        @media (max-width: 1200px) {
            border-bottom: 1px solid #fff;
            padding: 10px 0;
        }

        @media (max-width: 920px) {
            border-bottom: 1px solid #fff;
            padding: 0;
        }

        &__row {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__logo {

            svg {
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
        display: flex;
        align-items: center;
        gap: 15px;

        &._fixed {
            @media(max-width: 920px) {
                .menu__btns-elem {
                    border-left: 1px solid $colored-text;
                }
            }
        }

        ul {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 30px;

            li {

                &:last-child {
                    display: block;
                }
            }

            &._colored-hover {
                @media (hover: hover) and (pointer: fine) {
                    a:hover {
                        text-decoration: none;
                        color: $primary-color;
                    }
                }
                
            }
        }

        &__link {
            color: inherit;
            text-decoration: none;
            cursor: pointer;

            @media (hover: hover) and (pointer: fine) {
                &:hover {
                    text-decoration: underline;
                }
            }
            
        }

        &__btns {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__btns-elem {
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 8px;

            &:nth-child(2) {
                display: none;
            }

            @media(max-width: 920px) {
                width: 50px;
                height: 40px;

                &:nth-child(2) {
                    display: block;
                    padding-right: 0px;
                }

                border-left: 1px solid #fff;
            }
        }

        &__cart-btn {

            svg {
                g { fill: #fff; }

                @media (hover: hover) and (pointer: fine) {
                    &:hover { g { fill: $primary-color; } }    
                }
                
            }

            &._dark {
                svg {
                    g { fill: $colored-text;}
                }

                @media (hover: hover) and (pointer: fine) {
                    &:hover { g { fill: $primary-color; } }
                }
            }
        }
    }

    .burger-menu {
        display: none;
        width: 35px;
        height: 21px;
        position: relative;

        @media (max-width: 920px) {
            display: block;
        }

        &._dark {
            &::before, span { background-color: $colored-text; }
            &::after { color: $colored-text; }
        }

        &::before, span {
            position: absolute;
            height: 1px;
            background-color: #fff;
        }

        &::before {
            content: "";
            top: 0;
            right: 0;
            width: 100%;
        }

        span {
            position: absolute;
            top: 7px;
            right: 0;
            width: 22px;
        }

        &::after {
            content: "МЕНЮ";
            position: absolute;
            bottom: 0;
            right: 0;
            color: #fff;
            font-size: 7px;
            letter-spacing: -0.5px;
        }
    }

    .mobile-menu {
        position: absolute;
        width: 100vw;
        top: 0;
        right: 0;

        overflow-x: hidden;

        font-size: 14px;

        color: $colored-text;

        &._opened {
            display: flex;
            justify-content: flex-end;
            min-height: 100vh;
            height: 100%;

            .mobile-menu__content { animation: menuOpen 0.3s ease-out forwards; }
        }

        @keyframes menuOpen {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        &._closed {
            display: none;
        }

        &__mask {
            background-color: rgba(0, 0, 0, 50%);
            position: absolute;

            left: 0;
            right: 0;
            height: 100vh;
        }
        
        &__content {
            z-index: 20;
            position: relative;

            width: 260px;
            min-height: 100vh;
            height: auto;

            overflow-y: scroll;

            background-color: #fff;

            display: flex;
            flex-direction: column;

            transition: .2s;
        }

        &__header {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid;
            border-image: $gradient-background 1;
        }

        &__header-item {

            &:nth-child(2) {
                flex: 1;
                border-left: 1px solid;
                border-right: 1px solid;
                border-image: $gradient-background 1;
                display: flex;
                justify-content: center;
            }
        }

        &__cart-btn {
            min-width: 50px;
            min-height: 50px;
            max-width: 50px;
            max-height: 50px;
            padding: 12px;

            svg {
                width: 22px;
                height: 22px;

                rect { stroke: #000;}
                path {fill: #000;}
            }
        }

        &__logo {
            padding: 15px 0;

            svg {
                height: 18px;
                width: 63px;


                rect { stroke: #000;}
                path {fill: #000;}
            }

            &._dark {
                svg {
                    rect { stroke: $colored-text;}
                    path {fill: $colored-text;}
                }
            }
        }

        &__close-btn {
            position: relative;
            width: 50px;
            height: 50px;
            padding: 15px;

            &::before, &::after {
                content: "";
                position: absolute;
                left: 25px;
                top: 15px;
                width: 1px;
                height: 20px;
                background-color: #000;
                transition: .5s;
            }

            &::before { transform: rotate(90deg); animation: closeBtn1 .3s ease-out forwards; animation-delay: 0.2s; } 
            &::after { transform: rotate(90deg); animation: closeBtn2 .3s ease-out forwards; animation-delay: 0.2s; }
        }

        @keyframes closeBtn1 {
            from { transform: rotate(90deg); } to { transform: rotate(45deg); }
        }

        @keyframes closeBtn2 {
            from { transform: rotate(-90deg); } to { transform: rotate(-45deg); }
        }

        &__body {
            flex: 0 1 100%;
        }

        &__link {
            display: block;
            text-decoration: none;
            color: inherit;
            padding: 15px 20px;
            border-bottom: 1px solid;
            border-image: $gradient-background 1;
        }

        &__footer {
            padding: 20px;
        }

        &__contacts {
            margin: 0 0 5px 0;

            p {
                margin: 0 0 20px 0;

                a {
                    color: $primary-color;
                }
            }
        }

        &__social-links {
            display: flex;
            gap: 30px;
            margin: 0 0 20px 0;

            span {
                display: inline-block;
                max-width: 24px;
                min-width: 24px;
                max-height: 24px;
                min-height: 24px;

                &:nth-child(3) {
                    svg {
                        stroke: #000;
                    }
                }
            }

            svg {
                width: 100%;
                height: 100%;
            }
        }

        &__btn {
            display: flex;
            justify-content: center;
        }
    }
</style>