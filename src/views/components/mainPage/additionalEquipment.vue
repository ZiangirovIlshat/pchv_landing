<template>
    <section class="additional-equipment" id="additional-equipment">
        <div class="container">
            <div class="additional-equipment__row">
                <div class="additional-equipment__column">
                    <h2 class="additional-equipment__heading h2-heading">Подберем оборудование<br> под ваши задачи</h2>

                    <p class="additional-equipment__text">Услышим ваши пожелания и поможем подобрать нужное оборудование.</p>

                    <p class="additional-equipment__text">Оставьте заявку и технический специалист перезвонит вам в ближайшее время.</p>

                    <div class="additional-equipment__btn-box">
                        <button class="btn">оставить заявку</button>
                    </div>
                </div>

                <div class="additional-equipment__column img-column">
                    <img src="../../../assets/images/pchvTopSection.png" alt="ПЧВ">
                </div>
            </div>
        </div>
        <div class="additional-equipment__pop-up-box">
            <popUp/>
        </div>
    </section>
</template>

<script>
import popUp from "../mainPage/popUp.vue";

    export default {
        name: "additionalEquipment",

        components: {
            popUp,
        }
    }
</script>

<style lang="scss" scoped>
    .additional-equipment {
        background: 
            conic-gradient(from 155deg at 71.6% 58.17%, 
            #2B0080 -33.49deg, 
            #000000 50.79deg, 
            #4D0099 110.29deg, 
            #B7007A 135.03deg,
            #550080 146.73deg, 
            #FF00AA 205.47deg, 
            #FF3399 221.3deg, 
            #2B0080 237.09deg, 
            #000000 300.96deg, 
            #2B0080 326.51deg, 
            #000000 410.79deg
        );
        background-size: cover;

        &__row {
            display: flex;
            gap: 40px;

            @media (max-width: 920px) {
                flex-direction: column;
            }
        }

        &__column {
            &:first-child {
                flex: 0 0 50%;
                padding: 30px 0;

                p {
                    font-size: clamp(0.875rem, 0.693rem + 0.91vw, 1.375rem);
                    width: 70%;

                    @media (max-width: 920px) {
                        width: 100%;
                    }
                }
            }

            &.img-column {
                display: flex;
                justify-content: center;
                align-items: flex-end;

                img {
                    width: 100%;
                    height: auto;
                    display: block;

                    @media (max-width: 920px) {
                        width: 80%;
                    }
                }
            }
        }

        &__heading {
            margin: 0 0 140px 0;

            @media (max-width: 920px) {
                margin: 0 0 60px 0;
            }

            @media (max-width: 768px) {
                margin: 0 0 15px 0;
            }
        }
        
        &__text {
            margin: 0 0 20px 0;

            @media (max-width: 768px) {
                margin: 0 0 15px 0;
            }
        }

        &__btn-box {
            margin: 40px 0 0 0;

            @media (max-width: 768px) {
                margin: 15px 0 0 0;
            }
        }
    
        &__pop-up-box {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            z-index: 20;

            display: none;
            justify-content: center;
            align-items: center;
        }
    }

</style>