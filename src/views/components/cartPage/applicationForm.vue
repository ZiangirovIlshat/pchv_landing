<template>
    <div class="application-form">
        <div class="application-form__head-panel" v-if="!basketIsEmpty">
            <div class="container">
                <p>Оформление заказа</p>
            </div>
        </div>

        <!-- <div class="transfer-to-owen-cart">
            <div class="container">
                <p class="transfer-to-owen-cart__err-block" v-if="transferErr">{{ transferErr }}</p>
                <p>
                    <button 
                        class="transfer-to-owen-cart__link-btn btn"
                        @click="$emit('goToOwen')"
                    >Продолжить оформление на owen.ru</button>
                </p>
            </div>
        </div> -->

        <div class="application-form__body">
            <div class="container">
                <form id="form" class="form" @submit.prevent="submitForm" v-if="!basketIsEmpty">
                    <div class="form__row">
                        <div class="form__title">Плательщик*</div>

                        <div class="form-item">
                            <p class="form-item__form-elem-box select">
                                <select 
                                    v-model="formData.basicInformation.payer"
                                    name="payer"
                                >
                                    <option value="Физическое лицо">Физическое лицо</option>
                                    <option value="Юридическое лицо / ИП">Юридическое лицо / ИП</option>
                                </select>
                            </p>
                            <p 
                                class="form-item__hint"
                                v-if="formData.basicInformation.payer === 'Физическое лицо'"
                            >Внимание! Переоформление документов на “юридическое лицо” невозможно!</p>
                            <p 
                                class="form-item__error" 
                                v-if="errors.basicInformation_payer"
                            >{{ errors.basicInformation_payer }}</p>
                        </div>
                    </div>

                    <div class="form__row">
                        <div class="form__title">Способ оплаты*</div>

                        <div class="form-item">
                            <p class="form-item__form-elem-box select">
                                <select 
                                    v-model="formData.basicInformation.paymentMethod"
                                    name="paymentMethod"
                                >
                                    <option value="Безналичный расчет">Безналичный расчет</option>
                                </select>
                            </p>
                            <p class="form-item__hint">Возможна только безналичная оплата заказа</p>
                            <p 
                                class="form-item__error" 
                                v-if="errors.basicInformation_paymentMethod"
                            >{{ errors.basicInformation_paymentMethod }}</p>
                        </div>
                    </div>

                    <div class="form__row">
                        <div class="form__title">Способ доставки*</div>

                        <div class="form-item">
                            <p class="form-item__form-elem-box select">
                                <select 
                                    v-model="formData.basicInformation.shippingMethod"
                                    @change="formData.basicInformation.deliveryCompany = ''"
                                    name="shippingMethod"
                                >
                                    <option value="До двери">До двери</option>
                                    <option value="Самовывоз со склада ТК в своем городе">Самовывоз со склада ТК в своем городе</option>
                                    <option value="Почта России">Почта России</option>
                                    <option value="Самовывоз со склада ОВЕН г. Москва">Самовывоз со склада ОВЕН г. Москва</option>
                                </select>
                            </p>
                            <p 
                                class="form-item__error" 
                                v-if="errors.basicInformation_shippingMethod"
                            >{{ errors.basicInformation_shippingMethod }}</p>
                        </div>
                    </div>

                    <div class="form__row" 
                        v-if="formData.basicInformation.shippingMethod !== 'Почта России' &&
                        formData.basicInformation.shippingMethod !== 'Самовывоз со склада ОВЕН г. Москва' "
                    >
                        <div class="form-item">
                            <template v-if="formData.basicInformation.shippingMethod === 'До двери'">
                                <div class="form-item__form-elem-box checkbox">
                                    <label>
                                        <input 
                                            type="radio"
                                            value="Мейджор Экспресс"
                                            name="deliveryCompany"
                                            v-model="formData.basicInformation.deliveryCompany">
                                        <p>Мейджор Экспресс. <a href="/">Тарифы</a></p>
                                    </label>
                                </div>

                                <div class="form-item__form-elem-box checkbox">
                                    <label>
                                        <input 
                                            type="radio"
                                            value="Курьер сервис экспресс"
                                            name="deliveryCompany"
                                            v-model="formData.basicInformation.deliveryCompany">
                                        <p>Курьер сервис экспресс. <a href="/">Тарифы</a></p>
                                    </label>
                                </div>
                            </template>

                            <template v-if="formData.basicInformation.shippingMethod === 'Самовывоз со склада ТК в своем городе'">
                                <div class="form-item__form-elem-box checkbox">
                                    <label>
                                        <input
                                            type="radio"
                                            value="Кашалот"
                                            name="deliveryCompany"
                                            v-model="formData.basicInformation.deliveryCompany"
                                        >
                                        <p>Кашалот</p>
                                    </label>
                                </div>

                                <div class="form-item__form-elem-box checkbox">
                                    <label>
                                        <input
                                            type="radio"
                                            value="Деловые линии"
                                            name="deliveryCompany"
                                            v-model="formData.basicInformation.deliveryCompany"
                                        >
                                        <p>Деловые линии. <a href="/">Тарифы</a></p>
                                    </label>
                                </div>

                                <div class="form-item__form-elem-box checkbox">
                                    <label>
                                        <input
                                            type="radio"
                                            value="ПЭК"
                                            name="deliveryCompany"
                                            v-model="formData.basicInformation.deliveryCompany"
                                        >
                                        <p>ПЭК. <a href="/">Тарифы</a></p>
                                    </label>
                                </div>
                            </template>

                            <p
                                class="form-item__error" 
                                v-if="errors.basicInformation_deliveryCompany"
                            >{{ errors.basicInformation_deliveryCompany }}</p>
                        </div>
                    </div>

                    <div class="form__address-info" v-if="formData.basicInformation.shippingMethod === 'Самовывоз со склада ОВЕН г. Москва'">
                        <p><span>Самовывоз со склада ОВЕН г. Москва</span></p>
                        <p><span>Адрес офиса для самовывоза продукции ОВЕН и срочного ремонта:</span> г. Москва, 1-я ул. Энтузиастов д.15 стр. 1</p>
                        <p><span>Режим работы:</span> понедельник – пятница с 9:00 до 17:30 (без перерыва). Режим работы за наличный расчет с 9:00 до 16:00</p>
                        <br>
                        <p><span>Адрес центрального офиса:</span> г. Москва, 2-я ул. Энтузиастов д.5 корп.5</p>
                        <p><span>Единая диспетчерская служба:</span> тел. +7 (495) 64-111-56</p>
                        <p><span>Отдел сбыта:</span> тел. (495) 64-111-56; факс: (495) 728-41-45, 258-99-01, 258-99-02; e-mail: sales@owen.ru</p>
                        <p><span>Группа технической поддержки:</span> тел. (495) 64-111-56; е-mail: support@owen.ru</p>
                        <p><span>Режим работы центрального офиса:</span> понедельник – четверг с 9:00 до 18:00, пятница с 9:00 до 17:00</p>
                    </div>

                    <div class="form__separator"></div>

                    <div class="form__row">
                        <div class="form-item">
                            <p class="form-item__form-elem-box">
                                <input
                                    type="text"
                                    v-model="formData.buyerInformation.fio"
                                    placeholder="ФИО*"
                                    name="fio"
                                >
                            </p>
                            <p
                                class="form-item__error" 
                                v-if="errors.buyerInformation_fio"
                            >{{ errors.buyerInformation_fio }}</p>
                        </div>
                    </div>

                    <div class="form__row">
                        <div class="form-item">
                            <p class="form-item__form-elem-box"
                            >
                                <input
                                    type="text"
                                    v-model="formData.buyerInformation.phone"
                                    placeholder="Телефон*"
                                    name="phone"
                                >
                            </p>
                            <p
                                class="form-item__error" 
                                v-if="errors.buyerInformation_phone"
                            >{{ errors.buyerInformation_phone }}</p>
                        </div>
                    </div>

                    <div class="form__row">
                        <div class="form-item">
                            <p class="form-item__form-elem-box">
                                <input
                                    type="text"
                                    v-model="formData.buyerInformation.secondaryPhone"
                                    placeholder="Доп. телефон"
                                    name="secondaryPhone"
                                >
                            </p>
                            <p
                                class="form-item__error" 
                                v-if="errors.buyerInformation_secondaryPhone"
                            >{{ errors.buyerInformation_secondaryPhone }}</p>
                        </div>
                    </div>

                    <div class="form__row">
                        <div class="form-item">
                            <p class="form-item__form-elem-box">
                                <input
                                    type="text"
                                    v-model="formData.buyerInformation.email"
                                    placeholder="E-mail*"
                                    name="email"
                                >
                            </p>
                            <p
                                class="form-item__error" 
                                v-if="errors.buyerInformation_email"
                            >{{ errors.buyerInformation_email }}</p>
                        </div>
                    </div>

                    <div 
                        class="form__row"
                        v-if="
                            formData.basicInformation.payer === 'Физическое лицо' &&
                            formData.basicInformation.shippingMethod === 'Самовывоз со склада ТК в своем городе'
                        "
                    >
                        <div class="form-item">
                            <p class="form-item__form-elem-box">
                                <input
                                    type="text"
                                    v-model="formData.buyerInformation.passportData"
                                    placeholder="Паспортные данные*"
                                    name="passportData"
                                >
                            </p>
                            <p
                                class="form-item__error" 
                                v-if="errors.buyerInformation_passportData"
                            >{{ errors.buyerInformation_passportData }}</p>
                        </div>
                    </div>

                    <div class="form__row">
                        <div class="form-item high">
                            <p class="form-item__form-elem-box">
                                <input
                                    type="text"
                                    v-model="formData.buyerInformation.address"
                                    name="address"
                                >
                                <label
                                    class="form-item__custom-placeholder"
                                    v-if="formData.buyerInformation.address.length === 0"
                                >
                                    {{ 
                                        formData.basicInformation.shippingMethod === 'Самовывоз со склада ТК в своем городе' ?
                                        'Город доставки*' :
                                        'Полный адрес доставки, включая квартиру(офис)*'
                                    }}
                                </label>
                            </p>
                            <p
                                class="form-item__error" 
                                v-if="errors.buyerInformation_address"
                            >{{ errors.buyerInformation_address }}</p>
                        </div>
                    </div>

                    <template v-if="formData.basicInformation.payer === 'Юридическое лицо / ИП'">
                        <div class="form__separator"></div>

                        <div class="form__row">
                            <div class="form__title">Наименование<br>организации / ИП*</div>

                            <div class="form-item">
                                <p class="form-item__form-elem-box">
                                    <input
                                        type="text"
                                        v-model="formData.organizationData.name"
                                        placeholder="Название, ИНН или адрес*"
                                        name="organizationName"
                                    >
                                </p>
                                <p
                                    class="form-item__error" 
                                    v-if="errors.organizationData_name"
                                >{{ errors.organizationData_name }}</p>
                            </div>
                        </div>

                        <div class="form__row">
                            <div class="form__title">Юридический адрес*</div>

                            <div class="form-item">
                                <p class="form-item__form-elem-box">
                                    <input
                                        type="text"
                                        v-model="formData.organizationData.address"
                                        placeholder="Юридический адрес с индексом*"
                                        name="organizationAddress"
                                    >
                                </p>
                                <p
                                    class="form-item__error" 
                                    v-if="errors.organizationData_address"
                                >{{ errors.organizationData_address }}</p>
                            </div>
                        </div>

                        <div class="form__row">
                            <div class="form__title">Данные по организации*</div>

                            <div class="form-item">
                                <p class="form-item__form-elem-box">
                                    <input
                                        type="text"
                                        v-model="formData.organizationData.data"
                                        placeholder="ОГРН/ИНН/КПП и прочее"
                                        name="organizationData"
                                    >
                                </p>
                                <p
                                    class="form-item__error" 
                                    v-if="errors.organizationData_data"
                                >{{ errors.organizationData_data }}</p>
                            </div>
                        </div>

                        <div class="form__separator"></div>

                        <div class="form__row">
                            <div class="form__title">Банк*</div>

                            <div class="form-item">
                                <p class="form-item__form-elem-box">
                                    <input
                                        type="text"
                                        v-model="formData.bankDetails.name"
                                        placeholder="Название банка или БИК*"
                                        name="bankName"
                                    >
                                </p>
                                <p
                                    class="form-item__error" 
                                    v-if="errors.bankDetails_name"
                                >{{ errors.bankDetails_name }}</p>
                            </div>
                        </div>

                        <div class="form__row">
                            <div class="form__title">Банковские реквизиты*</div>

                            <div class="form-item high">
                                <p class="form-item__form-elem-box">
                                    <input
                                        type="text"
                                        v-model="formData.bankDetails.requisites"
                                        name="requisites"
                                    >
                                    <label
                                        class="form-item__custom-placeholder"
                                        v-if="formData.bankDetails.requisites.length === 0"
                                    >Корреспондентский счет. БИК, название и город банка, дополнительные банковские реквизиты</label>
                                </p>
                                <p
                                    class="form-item__error" 
                                    v-if="errors.bankDetails_requisites"
                                >{{ errors.bankDetails_requisites }}</p>
                            </div>
                        </div>

                        <div class="form__row">
                            <div class="form__title">Расчетный счет*</div>

                            <div class="form-item">
                                <p class="form-item__form-elem-box">
                                    <input
                                        type="text"
                                        v-model="formData.bankDetails.paymentAccount"
                                        placeholder="Номер расчетного счета"
                                        name="paymentAccount"
                                    >
                                </p>
                                <p
                                    class="form-item__error" 
                                    v-if="errors.bankDetails_paymentAccount"
                                >{{ errors.bankDetails_paymentAccount }}</p>
                            </div>
                        </div>

                        <div class="form__separator"></div>
                    </template>

                    <div class="form__row">
                        <div class="form-item">
                            <p class="form-item__form-elem-box">
                                <input
                                    type="text"
                                    v-model="formData.comment"
                                    placeholder="Комментарий к заявке"
                                    max="200"
                                    name="comment"
                                >
                            </p>
                        </div>
                    </div>

                    <div class="form__row">
                        <div class="form-item agreement">
                            <label>
                                <input
                                    name="agreement"
                                    type="checkbox"
                                    v-model="formData.agreement"
                                >
                                <p>Я прочел и соглашаюсь с <a href="">политикой обработки персональных данных</a></p>
                            </label>
                            <p
                                class="agreement-error"
                                v-if="errors.agreement"
                            >{{ errors.agreement }}</p>
                        </div>
                    </div>

                    <div class="form__row">
                        <p class="form-item__error" v-if="errors.input">{{ errors.input }}</p>
                    </div>

                    <br>
                    <button
                        class="btn"
                        :class="{'_loading' : loading}"
                        type="submit">оформить заявку</button>
                </form>

                <div class="location-inf" v-if="formData.basicInformation.shippingMethod === 'Самовывоз со склада ОВЕН г. Москва'">
                    <div class="location-inf__row">
                        <div class="location-inf__column">
                            <p class="location-inf__heading">Как добраться:</p>
                            <ul>
                                <li><span>на метро:</span> до станции м. Авиамоторная, 1-й выход налево из перехода, пройти под автомобильной эстакадой к платформе «Новая», пройти вдоль платформы «Новая» до конца, перейти через ж/д пути по пешеходному мосту, далее по схеме.</li>
                                <li><span>на электричке:</span> с Казанского вокзала до платформы Новая, подняться на мост через ж/д пути, повернуть направо, из турникетов – направо – вдоль платформы «Новая», к магазину «Энтузиаст», далее по схеме.</li>
                                <li><span>на автомобиле:</span> по шоссе Энтузиастов, далее по схеме.</li>
                            </ul>
                        </div>
                        <div class="location-inf__column">
                            <div class="location-inf__img-box">
                                <img src="../../../assets/images/map.png" alt="карта">
                            </div>
                            <p>Адрес: г. Москва, 2-я ул. Энтузиастов, д. 5, корп. 5 (на территории завода «Компрессор»).</p>
                            <br>
                            <p>Открыть на <a href="https://yandex.ru/maps/?pt=37.735916,55.749998&z=17&l=map" target="_blank">Яндекс карте</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

    export default {
        name: "applicationForm",

        props: {
            transferErr: {
                type: String,
                default: "",
            },

            basketIsEmpty: {
                type: Boolean,
            }
        },

        computed: {
            ...mapGetters("cart", ["cartItems", "totalPrice"]),
        },

        data() {
            return {
                formData: {
                    basicInformation: {
                        payer: "Физическое лицо",
                        paymentMethod: "Безналичный расчет",
                        shippingMethod: "До двери",
                        deliveryCompany: "",
                    },

                    buyerInformation: {
                        fio: "",
                        phone: "",
                        secondaryPhone: "",
                        email: "",
                        passportData: "",
                        address: "",
                    },

                    organizationData: {
                        name: "",
                        address: "",
                        data: "",
                    },

                    bankDetails: {
                        name: "",
                        requisites: "",
                        paymentAccount: "",
                    },

                    comment: "",
                    agreement: false,
                },

                loading: false,
                
                errors: {},

            }
        },

        methods: {
            ...mapActions("cart", ["clearCart"]),

            async submitForm() {
                if(this.loading === true) return;

                this.loading      = true;
                this.errors       = {};

                this.formData["totalPrice"] = this.totalPrice;
                this.formData["cartItems"]  = this.cartItems;

                try {
                    const response = await fetch(process.env.VUE_APP_API_URL + "cart.php", {
                        method: "POST",
                        body: JSON.stringify(this.formData),
                    });

                    if(!response.ok) { throw new Error(); }

                    let data = await response.json();

                    if(!data.success) {
                        if(data.erros) {
                            this.errors = data.erros;
                            return;
                        }

                        throw new Error();
                    }

                    if(data.success) {
                        this.$emit("formSubmited", data.orderNumber)
                        this.clearCart();
                    }

                } catch (error) {
                    this.errors.input = "Что-то пошло не так, пожалуйста, перезагрузите страницу и повторите попытку";
                    return;
                } finally {
                    this.loading = false;
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .application-form {
        color: $colored-text;

		&__head-panel {
            padding: 45px 0;
            color: #fff;

            background:
                conic-gradient(from 179.97deg at 73.28% 99%,
                #2B0080 -33.49deg, 
                #000000 80deg, 
                #4D0099 93deg, 
                #B7007A 95deg, 
                #550080 100deg, 
                #FF00AA 220deg, 
                #FF3399 255deg, 
                #2B0080 260deg, 
                #000000 270deg, 
                #2B0080 300deg, 
                #000000 360deg
            );
            background-size: cover;

            @media (max-width: 768px) {
                padding: 20px 0;
            }

            p {
                font-size: clamp(0.875rem, 0.732rem + 0.71vw, 1.375rem);
            }
		}

        &__message {
            text-align: center;
            font-size: 32px;
            color: $secondary-color;
            padding: 30px 0;
        }

        &__link-btn {
            margin: 20px 0;
            width: auto;
        }
    }

    .transfer-to-owen-cart {
        padding: 20px 0;

        &__err-block {
            margin: 0 0 5px 0;
            color: $err-text;
        }

        &__link-btn {
            width: auto;
        }
    }

    .form {
        padding: 40px 0;

        &__row {
            display: flex;
            justify-content: flex-end;
            margin: 0 0 20px 0;
            width: 80%;

            @media (max-width: 1200px) {
                width: 100%;
            }

            @media (max-width: 920px) {
                flex-direction: column;
                margin: 0 0 15px 0;
                width: 100%;
            }
        }

        &__title {
            flex: 0 0 40%;
            font-size: clamp(0.875rem, 0.732rem + 0.71vw, 1.375rem);

            @media (max-width: 920px) {
                flex: 0 0 100%;
            }
        }

        &__address-info {
            margin: 0 0 35px 0;

            p {
                color: $light-colored-text;
                margin: 0 0 10px 0;

                span {
                    color: $colored-text;
                }
            }
        }

        &__separator {
            height: 2px;
            width: 100%;
            background-color: $light-colored-text;
            margin: 0 0 60px 0;

            @media (max-width: 920px) {
                margin: 0 0 30px 0;
            }
        }
    }
    

    .form-item {
        flex: 0 0 60%;

        @media (max-width: 920px) {
            flex: 0 0 100%;
        }
    }

    .location-inf {
        padding: 0 0 45px 0;

        &__row {
            display: flex;
            justify-content: space-between;

            @media (max-width: 768px) {
                flex-direction: column;
            }
        }

        &__column {
            flex: 0 0 48%;

            ul {
                list-style-type: disc;
                list-style-position: outside;
                padding: 0 0 0 20px;

                li {
                    color: $light-colored-text;
                    line-height: 2;

                    &::marker {
                        color: $colored-text;
                    }

                    span {
                        color: $colored-text;
                    }
                }
            }
        }

        &__heading {
            font-size: clamp(0.875rem, 0.732rem + 0.71vw, 1.375rem);
        }

        &__img-box {
            text-align: center;

            img {
                margin: 0 0 10px 0;

                @media (max-width: 520px) {
                    width: 100%;
                    height: auto;
                }
            }
        }

        a {
            color: $primary-color;

            @media (hover: hover) and (pointer: fine) {
                &:hover {
                    color: $secondary-color;
                } 
            }
        }
    }


</style>

