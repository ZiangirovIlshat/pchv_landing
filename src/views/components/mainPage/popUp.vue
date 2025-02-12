<template>
    <div class="pop-up">
        <div class="pop-up__close-btn" @click="$emit('close')"></div>
        <div class="pop-up__row" v-if="!formSubmited">
            <div class="pop-up__column text-col">
                <h2 class="pop-up__heading h2-heading gradient-text">Получить консультацию</h2>

                <form class="form" @submit.prevent="submitForm">
                    <div class="form-item">
                        <p class="form-item__form-elem-box">
                            <input
                                :class="{ '_error' : errors.name }"
                                type="text"
                                name="name"
                                :placeholder="errors.name ? errors.name : 'Имя'"
                                v-model="formData.name"
                            >
                        </p>
                    </div>

                    <div class="form-item">
                        <p class="form-item__form-elem-box">
                            <input
                                :class="{ '_error' : errors.email }"
                                type="text"
                                name="email"
                                :placeholder="errors.email ? errors.email : 'E-mail'"
                                v-model="formData.email"
                            >
                        </p>
                    </div>

                    <div class="form-item">
                        <p class="form-item__form-elem-box custom-elem">
                            <span><img src="../../../assets/images/flagRussia.png" alt=""></span>
                            <input
                                :class="{ '_error' : errors.phone }"
                                type="text"
                                name="phone"
                                :placeholder="errors.phone ? errors.phone : '+7'"
                                v-model="formData.phone"
                            >
                        </p>
                    </div>

                    <div class="form-item">
                        <div class="form-item__form-elem-box">
                            <textarea
                                :class="{ '_error' : errors.descr }"
                                name="descr"
                                :placeholder="errors.descr ? errors.descr : 'Опишите для какой сферы и задач требуется преобразователь частоты'"
                                v-model="formData.descr"
                            ></textarea>
                        </div>
                    </div>

                    <div class="form-item agreement">
                        <label>
                            <input
                                :class="{ '_error' : errors.name }"
                                name="agreement"
                                type="checkbox"
                                v-model="formData.agreement"
                            >
                            <p>Я прочел и соглашаюсь с <a href="">политикой обработки персональных данных</a></p>
                        </label>
                        <div class="agreement-error" v-if="errors.agreement">Это обязательное поле</div>
                    </div>

                    <button class="btn">Оставить заявку</button>
                </form>
            </div>
            <div class="pop-up__column img-col">
                <img src="../../../assets/images/popUp.png" alt="ПЧВ">
            </div>
        </div>

        <div class="form-submited" v-else>
            <div>
                <h2 class="form-submited__heading h2-heading gradient-text">Заявка отправлена</h2>
                <p>Получили ваши контакты. Технический специалист изучает информацию и перезвонит вам в ближайшее время.</p>
                <button class="btn" @click="$emit('close')">вернуться на сайт</button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "popUp",

        data() {
            return {
                formData: { name: "", email: "", phone: "+7", descr: "", agreement: false },
                errors: { name: "", email: "", phone: "", descr: "", agreement: false },

                formSubmited: false,
            }
        },

        methods: {
            async submitForm() {
                if(!this.validation()) return;

                this.formSubmited = true;
            },

            validation() {
                this.errors.name = ""; this.errors.email = ""; 
                this.errors.phone = ""; this.errors.descr = "";
                this.errors.agreement = false;

                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const phonePattern = /^(?:\+7|8)\d{10}$/;

                if(!this.formData.agreement) {
                    this.errors.agreement = true;
                }

                if (this.formData.name.length < 2) {
                    this.errors.name = "Некорректно введено имя";
                    this.formData.name = "";
                }

                if (!emailPattern.test(this.formData.email)) { 
                    this.errors.email = "Некорректно введен email";
                    this.formData.email = "";
                }

                if (!phonePattern.test(this.formData.phone)) { 
                    this.errors.phone = "Некорректно введен номер";
                    this.formData.phone = "";
                }

                if (this.formData.descr.length < 3) {
                    this.errors.descr = "Это поля обязательное";
                    this.formData.descr = "";
                }

                for (let key in this.errors) {
                    const el = this.errors[key];
                    if(el) return false;
                }

                return true;
            },
        }
    }
</script>

<style lang="scss" scoped>
.custom-elem {
    display: flex;
    align-items: center;
    gap: 4px;

    span {
        margin: 0 0 10px 0;
    }
}

.pop-up {
    background-color: #fff;
    max-width: 1200px;
    max-height: 700px;
    width: 100%;
    height: 100%;
    position: relative;

    display: flex;
    flex-direction: column;

    color: $light-colored-text;
    
    font-size: 22px;

    overflow-x: hidden; scrollbar-width: none; &::-webkit-scrollbar { display: none; }

    form {
        padding: 10px 0;
    }

    @media (max-width: 920px) {
        overflow-y: scroll;
    }

    @media (max-width: 768px) {
        width: 100%;
        height: 100%;
    }

    &__close-btn {
        width: 35px;
        height: 35px;
        margin-left: auto;
        margin-top: 20px;
        margin-right: 20px;

        z-index: 5;

        position: relative;
        cursor: pointer;

        @media (max-width: 768px) {
            width: 30px;
            height: 30px;

            margin-top: 5px;
            margin-right: 5px;
        }

        @media (hover: hover) and (pointer: fine) {
            &:hover {
                &::before, &::after {
                    background-color: $secondary-color;
                }
            }
        }

        &::before, &::after {
            position: absolute;
            top: 15px;
            right: 7px;
            content: "";
            width: 20px;
            height: 1px;
            background-color: $primary-color;
        }
        
        &::before {
            transform: rotate(-45deg);
        }

        &::after {
            transform: rotate(45deg);
        }
    }

    &__row {
        flex: 1;

        display: flex;
        align-items: stretch;

        @media (max-width: 768px) {
            flex-direction: column;
            align-items: auto;
            height: calc(100% - 35px);
        }
    }

    &__column {

        &.text-col {
            height: 100%;
            flex: 0 0 60%;
            padding: 0 0 50px 20px;

            display: flex;
            flex-direction: column;

            @media (max-width: 768px) {
                z-index: 1;
                padding: 10px;
                width: 100%;
            }
        }

        &.img-col {
            flex: 0 0 40%;
            min-height: 100%;
            position: relative;

            display: flex;
            align-items: end;

            @media (max-width: 768px) {
                flex: auto;
                min-height: 0px;
                height: 0px;
                width: 100%;
            }

            img {
                width: 100%;
                height: auto;

                @media (max-width: 768px) {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    max-width: 250px;
                    width: 50%;
                }
            }
        }
    }

    &__form {
        flex: 1;
    }

    &__heading {
        margin: 0 0 50px 0;

        @media (max-width: 768px) {
            margin-bottom: 10px;
        }
    }
}

.form-submited {
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 10px 0 10px;

    &__heading {
        text-align: center;
        margin: 0 0 40px 0;

        @media (max-width: 768px) {
            margin-bottom: 10px;
        }
    }

    p {
        text-align: center;
        margin: 0 auto;
        margin-bottom: 40px;
        width: 60%;
        font-size: clamp(0.875rem, 0.693rem + 0.91vw, 1.375rem);

        @media (max-width: 768px) {
            margin-bottom: 15px;
            width: 70%;
        }
    }

    button {
        display: block;
        margin: 0 auto;
    }
}

</style>