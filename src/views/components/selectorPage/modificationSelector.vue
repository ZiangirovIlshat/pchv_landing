<template>
    <section class="modification-selector">
        <div class="container">
            <p v-if="priceData.loading">Загрузка цен...</p>
            <p v-else-if="priceData.error">{{ priceData.error }}</p>
            <template v-else>
                <div class="modification-selector__header">
                    <button class="modification-selector__clear-btn" @click="clearFilters()">Очистить фильтры</button>
                </div>
                <div class="modification-selector__filters">
                    <div class="filter">
                        <div class="filter__name">Серия</div>
                        <div class="filter__select-box">
                            <select
                                name="select-series"
                                id="select-series"
                                v-model="filtersValues.series"
                            >
                                <option :value="null">Выберите</option>
                                <option
                                    :value="option"
                                    v-for="option in filtersOptions.series"
                                    :key="option"
                                >{{ option }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="filter">
                        <div class="filter__name">Мощность</div>
                        <div class="filter__select-box">
                            <select
                                name="select-power"
                                id="select-power"
                                v-model="filtersValues.power"
                            >
                                <option :value="null">Выберите</option>
                                <option :value="option"
                                    v-for="option in filtersOptions.power"
                                    :key="option"
                                >{{ option }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="filter">
                        <div class="filter__name">Напряжение</div>
                        <div class="filter__select-box">
                            <select
                                name="select-power"
                                id="select-power"
                                v-model="filtersValues.voltage"
                            >
                                <option :value="null">Выберите</option>
                                <option :value="option"
                                    v-for="option in filtersOptions.voltage"
                                    :key="option"
                                >{{ option }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="filter">
                        <div class="filter__name">Наминальный выходной ток</div>
                        <div class="filter__select-box">
                            <select
                                name="select-power"
                                id="select-power"
                                v-model="filtersValues.nominal_output_current"
                            >
                                <option :value="null">Выберите</option>
                                <option
                                    :value="option"
                                    v-for="option in filtersOptions.nominal_output_current"
                                    :key="option"
                                >{{ option }}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="modification-selector__products">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Модификация</th>
                                <th>Аксессуары</th>
                                <th>Мощность</th>
                                <th>Напряжение</th>
                                <th>Наминальный выходной ток</th>
                                <th>Цена с НДС	</th>
                                <th>Заказ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(item, key, index) in filteredModifications">
                                <tr 
                                    :class="{'_non-border' : accessoriesIsActive === key}"
                                    :key="key + '_product'"
                                    v-if="index < limit"
                                >
                                    <td>
                                        <img :src="item.image_thumb" :alt="key">
                                    </td>

                                    <td>
                                        <a
                                            :href="item.link"
                                            target="_blank"
                                            title="На страницу товара">{{ key }}
                                        </a>
                                    </td>

                                    <td>
                                        <div 
                                            class="modification-selector__accessory-btn"
                                            :class="{'_opened' : accessoriesIsActive === key}"
                                            @click="getAccessories(key)"
                                            title="Панель аксессуаров">
                                        </div>
                                    </td>
                                    <td>{{ item.power }}</td>
                                    <td>{{ item.voltage }}</td>
                                    <td>{{ item.nominal_output_current }}</td>
                                    <td>
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
                                    </td>
                                    <td>
                                        <cartButton :data="[item.price, item.code]" v-if="item.price" />
                                        <span v-else>По запросу</span>
                                    </td>
                                </tr>

                                <tr :key="key + '_accessories'"
                                    v-if="index < limit && accessoriesIsActive === key"
                                >
                                    <td colspan="8">
                                        <p 
                                            class="accessories__loading" 
                                            v-if="modificationAccessoriesData.loading"
                                        >Загрузка...</p>
                                        <p 
                                            class="accessories__error" 
                                            v-else-if="modificationAccessoriesData.error"
                                        >{{ modificationAccessoriesData.error }}</p>
                                        <div class="accessories__body" v-else>
                                            <p class="accessories__heading">Дополнительное оборудование</p>
                                            <accessoryPicker :data="modificationAccessoriesData.data" />
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>

                <button class="more-btn" @click="limit = 100" v-if="limit !== 100">Показать еще</button>
                <button class="more-btn" @click="limit = 5" v-else>Свернуть</button>
            </template>
        </div>
    </section>
</template>

<script>
import accessoryPicker from "./accessoryPicker.vue";
import cartButton from "./cartButton.vue";

    export default {
        name: "modificationSelector",

        components: {
            accessoryPicker,
            cartButton,
        },

        props: {
            series: {
                default: null,
                type: String,
            }
        },

        data() {
            return {
                modifications: {
                    "ПЧВ1-11К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/448/pchv1-kartochki_pchv1-11k-v_m01.png",
                            "alt": "ПЧВ1-11К-В",
                        },
                        "voltage": "380 В",
                        "power": "11,0 кВт",
                        "nominal_output_current": "25,0 А",
                        "link": "https://owen.ru/product/pchv1_11k_v",
                    },

                    "ПЧВ1-15К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/448/pchv1-kartochki_pchv1-15k-v_m01.png",
                            "alt": "ПЧВ1-15К-В",
                        },
                        "desc": "Преобразователь частоты ПЧВ1-15К-В [М01] предназначен для управления электродвигателями мощностью 15,0 кВт. Номинальный выходной ток – 32,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "15,0 кВт",
                        "nominal_output_current": "32,0 А",
                        "link": "https://owen.ru/product/pchv1_15k_v",
                    },

                    "ПЧВ1-18К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/448/pchv1-kartochki_pchv1-18k-v_m01.png",
                            "alt": "ПЧВ1-18К-В",
                        },
                        "desc": "Преобразователь частоты ПЧВ1-18К-В [М01] предназначен для управления электродвигателями мощностью 18,5 кВт. Номинальный выходной ток – 38,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "18,5 кВт",
                        "nominal_output_current": "38,0 А",
                        "link": "https://owen.ru/product/pchv1_18k_v",
                    },

                    "ПЧВ1-1К5-А": {
                        "image":  {
                            "src": "https://owen.ru/uploads/448/pchv1-kartochki_pchv1-1k5-a_m01.png",
                            "alt": "ПЧВ1-1К5-А",
                        },
                        "desc": "Преобразователь частоты ПЧВ1-1К5-А [М01] предназначен для управления электродвигателями мощностью 1,5 кВт. Номинальный выходной ток – 7,0 А, использует однофазный источник питания переменного напряжения 220 В.",
                        "voltage": "220 В",
                        "power": "1,5 кВт",
                        "nominal_output_current": "7,0 А",
                        "link": "https://owen.ru/product/pchv1_1k5_a",
                    },

                    "ПЧВ1-1К5-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/448/pchv1-kartochki_pchv1-1k5-v_m01.png",
                            "alt": "ПЧВ1-1К5-В",
                        },
                        "desc": "Преобразователь частоты ПЧВ1-1К5-В [М01] предназначен для управления электродвигателями мощностью 1,5 кВт. Номинальный выходной ток – 4,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "1,5 кВт",
                        "nominal_output_current": "4,0 А",
                        "link": "https://owen.ru/product/pchv1_1k5_v",
                    },

                    "ПЧВ1-22К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/448/pchv1-kartochki_pchv1-22k-v_m01.png",
                            "alt": "ПЧВ1-22К-В",
                        },
                        "desc": "Преобразователь частоты ПЧВ1-22К-В [М01] предназначен для управления электродвигателями мощностью 22,0 кВт. Номинальный выходной ток – 45,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "22,0 кВт",
                        "nominal_output_current": "45,0 А",
                        "link": "https://owen.ru/product/pchv1_22k_v",
                    },

                    "ПЧВ1-2К2-А": {
                        "image":  {
                            "src": "https://owen.ru/uploads/448/pchv1-2k2-a_m01.png",
                            "alt": "ПЧВ1-2К2-А",
                        },
                        "desc": "Преобразователь частоты ПЧВ1-2К2-А [М01] предназначен для управления электродвигателями мощностью 2,2 кВт. Номинальный выходной ток – 10,0 А, использует однофазный источник питания переменного напряжения 220 В.",
                        "voltage": "220 В",
                        "power": "2,2 кВт",
                        "nominal_output_current": "10,0 А",
                        "link": "https://owen.ru/product/pchv1_2k2_a",
                    },

                    "ПЧВ1-2К2-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/448/pchv1-kartochki_pchv1-2k2-v_m01.png",
                            "alt": "ПЧВ1-2К2-В",
                        },
                        "desc": "Преобразователь частоты ПЧВ1-2К2-В [М01] предназначен для управления электродвигателями мощностью 2,2 кВт. Номинальный выходной ток – 5,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "2,2 кВт",
                        "nominal_output_current": "10,0 А",
                        "link": "https://owen.ru/product/pchv1_2k2_v",
                    },

                    "ПЧВ1-4К0-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/448/pchv1-kartochki_pchv1-4k0-v_m01.png",
                            "alt": "ПЧВ1-4К0-В",
                        },
                        "desc": "Преобразователь частоты ПЧВ1-4К0-В [М01] предназначен для управления электродвигателями мощностью 4,0 кВт. Номинальный выходной ток – 9,5 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "4,0 кВт",
                        "nominal_output_current": "9,5 А",
                        "link": "https://owen.ru/product/pchv1_4k0_v",
                    },

                    "ПЧВ1-5К5-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/448/pchv1-kartochki_pchv1-5k5-v_m01.png",
                            "alt": "ПЧВ1-5К5-В",
                        },
                        "desc": "Преобразователь частоты ПЧВ1-5К5-В [М01] предназначен для управления электродвигателями мощностью 5,5 кВт. Номинальный выходной ток – 13,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "5,5 кВт",
                        "nominal_output_current": "13,0 А",
                        "link": "https://owen.ru/product/pchv1_5k5_v",
                    },

                    "ПЧВ1-7К5-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/448/pchv1-7k5-v_m01.png",
                            "alt": "ПЧВ1-7К5-В",
                        },
                        "desc": "Преобразователь частоты ПЧВ1-7К5-В [М01] предназначен для управления электродвигателями мощностью 7,5 кВт. Номинальный выходной ток – 17,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "7,5 кВт",
                        "nominal_output_current": "17,0 А",
                        "link": "https://owen.ru/product/pchv1_7k5_v",
                    },

                    "ПЧВ1-К75-А": {
                        "image":  {
                            "src": "https://owen.ru/uploads/448/pchv1-kartochki_pchv1-k75-a_m01.png",
                            "alt": "ПЧВ1-К75-А",
                        },
                        "desc": "Преобразователь частоты ПЧВ1-К75-А [М01] предназначен для управления электродвигателями мощностью 0,75 кВт. Номинальный выходной ток – 4,0 А, использует однофазный источник питания переменного напряжения 220 В.",
                        "voltage": "220 В",
                        "power": "0,75 кВт",
                        "nominal_output_current": "4,0 А",
                        "link": "https://owen.ru/product/pchv1_k75_a",
                    },

                    "ПЧВ1-К75-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/448/pchv1-kartochki_pchv1-k75-v_m01.png",
                            "alt": "ПЧВ1-К75-В",
                        },
                        "desc": "Преобразователь частоты ПЧВ1-К75-В [М01] предназначен для управления электродвигателями мощностью 0,75 кВт. Номинальный выходной ток – 3,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "0,75 кВт",
                        "nominal_output_current": "3,0 А",
                        "link": "https://owen.ru/product/pchv1_k75_v",
                    },

                    "ПЧВ3-110К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-110k-v_m01.png",
                            "alt": "ПЧВ3-110К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-110К-В [М01] предназначен для управления электродвигателями мощностью 110,0 кВт. Номинальный выходной ток – 210,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "110,0 кВт",
                        "nominal_output_current": "210,0 А",
                        "link": "https://owen.ru/product/pchv3_110k_b",
                    },

                    "ПЧВ3-11К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-11k-v_m01.png",
                            "alt": "ПЧВ3-11К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-11К-В [М01] предназначен для управления электродвигателями мощностью 11,0 кВт. Номинальный выходной ток – 25,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "11,0 кВт",
                        "nominal_output_current": "25,0 А",
                        "link": "https://owen.ru/product/pchv3_11k_b",
                    },

                    "ПЧВ3-132К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-132k-v_m01.png",
                            "alt": "ПЧВ3-132К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-132К-В [М01] предназначен для управления электродвигателями мощностью 132,0 кВт. Номинальный выходной ток – 250,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "132,0 кВт",
                        "nominal_output_current": "250,0 А",
                        "link": "https://owen.ru/product/pchv3_132k_b",
                    },

                    "ПЧВ3-15К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-15k-v_m01.png",
                            "alt": "ПЧВ3-15К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-15К-В [М01] предназначен для управления электродвигателями мощностью 15,0 кВт. Номинальный выходной ток – 32,5 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "15,0 кВт",
                        "nominal_output_current": "32,5 А",
                        "link": "https://owen.ru/product/pchv3_15k_b",
                    },

                    "ПЧВ3-160К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-160k-v_m01.png",
                            "alt": "ПЧВ3-160К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-160К-В [М01] предназначен для управления электродвигателями мощностью 160,0 кВт. Номинальный выходной ток – 310,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "160,0 кВт",
                        "nominal_output_current": "310,0 А",
                        "link": "https://owen.ru/product/pchv3_160k_b",
                    },

                    "ПЧВ3-185К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-185k-v_m01.png",
                            "alt": "ПЧВ3-185К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-185К-В [М01] предназначен для управления электродвигателями мощностью 185,0 кВт. Номинальный выходной ток – 340,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "185,0 кВт",
                        "nominal_output_current": "340,0 А",
                        "link": "https://owen.ru/product/pchv3_185k_b",
                    },

                    "ПЧВ3-18К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-18k-v_m01.png",
                            "alt": "ПЧВ3-18К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-18К-В [М01] предназначен для управления электродвигателями мощностью 18,5 кВт. Номинальный выходной ток – 38,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "18,5 кВт",
                        "nominal_output_current": "38,0 А",
                        "link": "https://owen.ru/product/pchv3_18k_b",
                    },

                    "ПЧВ3-1К5-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-1k5-v_m01.png",
                            "alt": "ПЧВ3-1К5-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-1К5-В [М01] предназначен для управления электродвигателями мощностью 1,5 кВт. Номинальный выходной ток – 4,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "1,5 кВт",
                        "nominal_output_current": "4,0 А",
                        "link": "https://owen.ru/product/pchv3_1k5_b",
                    },

                    "ПЧВ3-200К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-200k-v_m01.png",
                            "alt": "ПЧВ3-200К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-200К-В [М01] предназначен для управления электродвигателями мощностью 200,0 кВт. Номинальный выходной ток – 380,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "200,0 кВт",
                        "nominal_output_current": "380,0 А",
                        "link": "https://owen.ru/product/pchv3_200k_b",
                    },

                    "ПЧВ3-220К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-220k-v_m01.png",
                            "alt": "ПЧВ3-220К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-220К-В [М01] предназначен для управления электродвигателями мощностью 220,0 кВт. Номинальный выходной ток – 415,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "220,0 кВт",
                        "nominal_output_current": "415,0 А",
                        "link": "https://owen.ru/product/pchv3_220k_b",
                    },

                    "ПЧВ3-22К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-22k-v_m01.png",
                            "alt": "ПЧВ3-22К-В",
                        },
                        "desc": "Преобразователь частоты ПЧВ3-22К-В [М01] предназначен для управления электродвигателями мощностью 22,0 кВт. Номинальный выходной ток – 45,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "22,0 кВт",
                        "nominal_output_current": "45,0 А",
                        "link": "https://owen.ru/product/pchv3_22k_b",
                    },

                    "ПЧВ3-250К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-250k-v_m01.png",
                            "alt": "ПЧВ3-250К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-250К-В [М01] предназначен для управления электродвигателями мощностью 250,0 кВт. Номинальный выходной ток – 470,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "250,0 кВт",
                        "nominal_output_current": "470,0 А",
                        "link": "https://owen.ru/product/pchv3_250k_b",
                    },

                    "ПЧВ3-280К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-280k-v_m01.png",
                            "alt": "ПЧВ3-280К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-280К-В [М01] предназначен для управления электродвигателями мощностью 280,0 кВт. Номинальный выходной ток – 510,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "280,0 кВт",
                        "nominal_output_current": "510,0 А",
                        "link": "https://owen.ru/product/pchv3_280k_b",
                    },

                    "ПЧВ3-2К2-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-2k2-v_m01.png",
                            "alt": "ПЧВ3-2К2-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-2К2-В [М01] предназначен для управления электродвигателями мощностью 2,2 кВт. Номинальный выходной ток – 6,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "2,2 кВт",
                        "nominal_output_current": "6,0 А",
                        "link": "https://owen.ru/product/pchv3_2k2_b",
                    },

                    "ПЧВ3-30К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-30k-v_m01.png",
                            "alt": "ПЧВ3-30К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-30К-В [М01] предназначен для управления электродвигателями мощностью 30,0 кВт. Номинальный выходной ток – 60,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "30,0 кВт",
                        "nominal_output_current": "60,0 А",
                        "link": "https://owen.ru/product/pchv3_30k_b",
                    },

                    "ПЧВ3-315К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-315k-v_m01.png",
                            "alt": "ПЧВ3-315К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-315К-В [М01] предназначен для управления электродвигателями мощностью 315,0 кВт. Номинальный выходной ток –600,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "315,0 кВт",
                        "nominal_output_current": "600,0 А",
                        "link": "https://owen.ru/product/pchv3_315k_b",
                    },

                    "ПЧВ3-355К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-355k-v_m01.png",
                            "alt": "ПЧВ3-355К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-355К-В [М01] предназначен для управления электродвигателями мощностью 355,0 кВт. Номинальный выходной ток – 670,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "355,0 кВт",
                        "nominal_output_current": "670,0 А",
                        "link": "https://owen.ru/product/pchv3_355k_b",
                    },

                    "ПЧВ3-37К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-37k-v_m01.png",
                            "alt": "ПЧВ3-37К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-37К-В [М01] предназначен для управления электродвигателями мощностью 37,0 кВт. Номинальный выходной ток – 75,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "37,0 кВт",
                        "nominal_output_current": "75,0 А",
                        "link": "https://owen.ru/product/pchv3_37k_b",
                    },

                    "ПЧВ3-400К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-400k-v_m01.png",
                            "alt": "ПЧВ3-400К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-400К-В [М01] предназначен для управления электродвигателями мощностью 400,0 кВт. Номинальный выходной ток – 750,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "400,0 кВт",
                        "nominal_output_current": "750,0 А",
                        "link": "https://owen.ru/product/pchv3_400k_b",
                    },

                    "ПЧВ3-450К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-450k-v_m01.png",
                            "alt": "ПЧВ3-450К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-450К-В [М01] предназначен для управления электродвигателями мощностью 450,0 кВт. Номинальный выходной ток – 810,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "450,0 кВт",
                        "nominal_output_current": "8100,0 А",
                        "link": "https://owen.ru/product/pchv3_450k_b",
                    },

                    "ПЧВ3-45К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-45k-v_m01.png",
                            "alt": "ПЧВ3-45К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-45К-В [М01] предназначен для управления электродвигателями мощностью 45,0 кВт. Номинальный выходной ток – 90,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "45,0 кВт",
                        "nominal_output_current": "90,0 А",
                        "link": "https://owen.ru/product/pchv3_45k_b",
                    },

                    "ПЧВ3-55К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-55k-v_m01.png",
                            "alt": "ПЧВ3-55К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-55К-В [М01] предназначен для управления электродвигателями мощностью 55,0 кВт. Номинальный выходной ток – 110,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "55,0 кВт",
                        "nominal_output_current": "110,0 А",
                        "link": "https://owen.ru/product/pchv3_55k_b",
                    },

                    "ПЧВ3-5К5-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-5k5-v_m01.png",
                            "alt": "ПЧВ3-5К5-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-5К5-В [М01] предназначен для управления электродвигателями мощностью 5,5 кВт. Номинальный выходной ток – 13,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "5,5 кВт",
                        "nominal_output_current": "13,0 А",
                        "link": "https://owen.ru/product/pchv3_5k5_b",
                    },

                    "ПЧВ3-75К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-75k-v_m01.png",
                            "alt": "ПЧВ3-75К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-75К-В [М01] предназначен для управления электродвигателями мощностью 75,0 кВт. Номинальный выходной ток – 150,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "75,0 кВт",
                        "nominal_output_current": "150,0 А",
                        "link": "https://owen.ru/product/pchv3_75k_b",
                    },

                    "ПЧВ3-7К5-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-7k5-v_m01.png",
                            "alt": "ПЧВ3-7К5-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-7К5-В [М01] предназначен для управления электродвигателями мощностью 7,5 кВт. Номинальный выходной ток – 17,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "7,5 кВт",
                        "nominal_output_current": "17,0 А",
                        "link": "https://owen.ru/product/pchv3_7k5_b",
                    },

                    "ПЧВ3-90К-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-90k-v_m01.png",
                            "alt": "ПЧВ3-90К-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-90К-В [М01] предназначен для управления электродвигателями мощностью 90,0 кВт. Номинальный выходной ток – 180,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "90,0 кВт",
                        "nominal_output_current": "180,0 А",
                        "link": "https://owen.ru/product/pchv3_90k_b",
                    },

                    "ПЧВ3-К75-В": {
                        "image":  {
                            "src": "https://owen.ru/uploads/442/pchv3-k75-v_m01.png",
                            "alt": "ПЧВ3-К75-В",
                        },
                        "desc":  "Преобразователь частоты ПЧВ3-К75-В [М01] предназначен для управления электродвигателями мощностью 0,75 кВт. Номинальный выходной ток – 3,0 А, использует трехфазный источник питания переменного напряжения 380 В.",
                        "voltage": "380 В",
                        "power": "0,75 кВт",
                        "nominal_output_current": "3,0 А",
                        "link": "https://owen.ru/product/pchv3_k75_b",
                    },
                },

                accessories: [
                    {
                        "modification": "ПЧВ1-К75-А ",
                        "Моторный дроссель РМО/РМТ": "РМО-004-А / РМТ-004-А",
                        "Сетевой дроссель РСО/РСТ": "РСО-016-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": "none",
                        "Тормозные резисторы РБ3": "none"
                    },
                    {
                        "modification": "ПЧВ1-1К5-А ",
                        "Моторный дроссель РМО/РМТ": "РМО-006-А / РМТ-006-А",
                        "Сетевой дроссель РСО/РСТ": "РСО-020-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": "none",
                        "Тормозные резисторы РБ3": "РБ3-110-К45",
                        "Тормозные резисторы РБ1": "РБ1-400-К20",
                    },
                    {
                        "modification": "ПЧВ1-2К2-А ",
                        "Моторный дроссель РМО/РМТ": "РМО-010-А / РМТ-010-А",
                        "Сетевой дроссель РСО/РСТ": "РСО-025-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": "none",
                        "Тормозные резисторы РБ3": "РБ3-070-К20",
                        "Тормозные резисторы РБ1": "РБ1-400-К20",
                    },
                    {
                        "modification": "ПЧВ1-К75-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-002-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-004-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": "none",
                        "Тормозные резисторы РБ3": "none",
                        "Тормозные резисторы РБ1": "РБ1-400-К20",
                    },
                    {
                        "modification": "ПЧВ1-1К5-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-004-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-006-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": "none",
                        "Тормозные резисторы РБ3": "РБ3-270-К20",
                        "Тормозные резисторы РБ1": "РБ1-400-К20",
                    },
                    {
                        "modification": "ПЧВ1-2К2-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-006-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-008-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": "none",
                        "Тормозные резисторы РБ3": "РБ3-200-К20",
                        "Тормозные резисторы РБ1": "РБ1-400-К20",
                    },
                    {
                        "modification": "ПЧВ1-4К0-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-010-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-016-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": "none",
                        "Тормозные резисторы РБ3": "РБ3-110-К45",
                        "Тормозные резисторы РБ1": "РБ1-400-К20",
                    },
                    {
                        "modification": "ПЧВ1-5К5-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-015-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-020-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": "none",
                        "Тормозные резисторы РБ3": "РБ3-080-К57",
                        "Тормозные резисторы РБ1": "РБ1-080-1К0",
                    },
                    {
                        "modification": "ПЧВ1-7К5-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-015-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-025-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": "none",
                        "Тормозные резисторы РБ3": "РБ3-080-К57",
                        "Тормозные резисторы РБ1": "РБ1-080-1К0",
                    },
                    {
                        "modification": "ПЧВ1-11К-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-025-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-035-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": "none",
                        "Тормозные резисторы РБ3": "РБ3-056-К68",
                        "Тормозные резисторы РБ1": "РБ1-080-1К0",
                    },
                    {
                        "modification": "ПЧВ1-15К-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-030-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-040-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": "none",
                        "Тормозные резисторы РБ3": "РБ3-038-1К1",
                        "Тормозные резисторы РБ1": ["РБ1-400-К20", "РБ1-080-1К0"],
                    },
                    {
                        "modification": "ПЧВ1-18К-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-040-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-050-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": "none",
                        "Тормозные резисторы РБ3": "РБ3-038-1К1",
                        "Тормозные резисторы РБ1": ["РБ1-400-К20", "РБ1-080-1К0"],
                    },
                    {
                        "modification": "ПЧВ1-22К-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-050-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-060-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": "none",
                        "Тормозные резисторы РБ3": "РБ3-028-1К4",
                        "Тормозные резисторы РБ1": "РБ1-400-К20",
                    },
                    {
                        "modification": "ПЧВ3-К75-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-004-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-004-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none",
                        "Тормозные резисторы РБ1": "РБ1-080-1К0",
                    },
                    {
                        "modification": "ПЧВ3-1К5-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-006-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-006-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none",
                        "Тормозные резисторы РБ1": "РБ1-400-К20",
                    },
                    {
                        "modification": "ПЧВ3-2К2-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-010-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-008-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none",
                        "Тормозные резисторы РБ1": "РБ1-400-К20",
                    },
                    {
                        "modification": "ПЧВ3-5К5-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-015-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-016-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none",
                        "Тормозные резисторы РБ1": "РБ1-080-1К0",
                    },
                    {
                        "modification": "ПЧВ3-7К5-В",
                        "Моторный дроссель РМО/РМТ": "РМТ-025-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-020-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none",
                        "Тормозные резисторы РБ1": "РБ1-400-К20",
                    },
                    {
                        "modification": "ПЧВ3-11К-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-030-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-025-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none",
                        "Тормозные резисторы РБ1": "РБ1-080-1К0",
                    },
                    {
                        "modification": "ПЧВ3-15К-В",
                        "Моторный дроссель РМО/РМТ": "РМТ-040-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-035-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none",
                        "Тормозные резисторы РБ1": "РБ1-080-1К0",
                    },
                    {
                        "modification": "ПЧВ3-18К-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-040-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-040-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none",
                        "Тормозные резисторы РБ1": ["РБ1-400-К20", "РБ1-080-1К0"],
                    },
                    {
                        "modification": "ПЧВ3-22К-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-050-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-050-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none",
                        "Тормозные резисторы РБ1": "РБ1-080-1К0",
                    },
                    {
                        "modification": "ПЧВ3-30К-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-060-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-060-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none"
                    },
                    {
                        "modification": "ПЧВ3-37К-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-080-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-080-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none"
                    },
                    {
                        "modification": "ПЧВ3-45К-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-090-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-120-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none"
                    },
                    {
                        "modification": "ПЧВ3-55К-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-120-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-120-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none"
                    },
                    {
                        "modification": "ПЧВ3-75К-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-150-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-160-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none"
                    },
                    {
                        "modification": "ПЧВ3-90К-В ",
                        "Моторный дроссель РМО/РМТ": "РМТ-200-А",
                        "Сетевой дроссель РСО/РСТ": "РСТ-200-А",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none"
                    },
                    {
                        "modification": "ПЧВ3-110К-В ",
                        "Моторный дроссель РМО/РМТ": "none",
                        "Сетевой дроссель РСО/РСТ": "none",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none"
                    },
                    {
                        "modification": "ПЧВ3-132К-В ",
                        "Моторный дроссель РМО/РМТ": "none",
                        "Сетевой дроссель РСО/РСТ": "none",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none"
                    },
                    {
                        "modification": "ПЧВ3-160К-В ",
                        "Моторный дроссель РМО/РМТ": "none",
                        "Сетевой дроссель РСО/РСТ": "none",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none"
                    },
                    {
                        "modification": "ПЧВ3-185К-В ",
                        "Моторный дроссель РМО/РМТ": "none",
                        "Сетевой дроссель РСО/РСТ": "none",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none"
                    },
                    {
                        "modification": "ПЧВ3-200К-В ",
                        "Моторный дроссель РМО/РМТ": "none",
                        "Сетевой дроссель РСО/РСТ": "none",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none"
                    },
                    {
                        "modification": "ПЧВ3-220К-В ",
                        "Моторный дроссель РМО/РМТ": "none",
                        "Сетевой дроссель РСО/РСТ": "none",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none"
                    },
                    {
                        "modification": "ПЧВ3-250К-В ",
                        "Моторный дроссель РМО/РМТ": "none",
                        "Сетевой дроссель РСО/РСТ": "none",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none"
                    },
                    {
                        "modification": "ПЧВ3-280К-В ",
                        "Моторный дроссель РМО/РМТ": "none",
                        "Сетевой дроссель РСО/РСТ": "none",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none"
                    },
                    {
                        "modification": "ПЧВ3-315К-В ",
                        "Моторный дроссель РМО/РМТ": "none",
                        "Сетевой дроссель РСО/РСТ": "none",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none"
                    },
                    {
                        "modification": "ПЧВ3-355К-В ",
                        "Моторный дроссель РМО/РМТ": "none",
                        "Сетевой дроссель РСО/РСТ": "none",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none"
                    },
                    {
                        "modification": "ПЧВ3-400К-В ",
                        "Моторный дроссель РМО/РМТ": "none",
                        "Сетевой дроссель РСО/РСТ": "none",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none"
                    },
                    {
                        "modification": "ПЧВ3-450К-В ",
                        "Моторный дроссель РМО/РМТ": "none",
                        "Сетевой дроссель РСО/РСТ": "none",
                        "ЛПО": [
                            "ЛПО1",
                            "ЛПО2",
                            "ЛПО3"
                        ],
                        "Платы расширения": [
                            "ПИП1",
                            "ПИП2",
                            "ПВВ1",
                            "ПЭ1",
                            "ПЭ2",
                            "ПРЕ1",
                            "ПИК1",
                            "ПИЭ1",
                            "ПИЭ2"
                        ],
                        "Тормозные резисторы РБ3": "none"
                    }
                ],

                filtersValues: { series: null, power: null, voltage: null, nominal_output_current: null, },
                filtersOptions: { series: [], power: [], voltage: [], nominal_output_current: [] },

                filteredModifications: {},

                limit: 5,

                width: 0,

                priceGeter: "https://owen.ru/upl_files/modules/price_getter/get.php",
                priceData: { loading: false, error: "" },

                accessoriesIsActive: null,
                modificationAccessoriesData: {
                    data: {},
                    loading: false,
                    error: ""
                },

                selectedTabs: [],
            }
        },

        methods: {
            updateWidth() {
                this.width = window.innerWidth;
            },

            async getPriceGetterData(products) {
                const chunks = chunkArray(products, 30);

                let data = [];

                try {
                    for (const el of chunks) {
                        let articles = "";
        
                        el.forEach(modification => {
                            articles += `${modification};`;
                        });
        
                        articles = articles.slice(0, -1);

                        data = data.concat(
                            await response(articles, this.priceGeter)
                        );
                    }

                } catch (error) {
                    console.error("Ошибка при получении цен:", error);
                    return null;
                }

                return data;
            
                async function response(articles, url) {
                    try {
                        const res = await fetch(url + "?articles=" + articles);
                        const prices = await res.json();

                        return prices;
                    } catch (error) {
                        console.error("Ошибка при получении цен:", error);
                        return null;
                    }
                }
            
                function chunkArray(array, chunkSize) {
                    const result = [];

                    for (let i = 0; i < array.length; i += chunkSize) {
                        const chunk = array.slice(i, i + chunkSize);
                        result.push(chunk);
                    }

                    return result;
                }
            },

            async getAllData() {
                this.priceData.loading = true;

                let products = Object.keys(this.modifications);

                let priceData = await this.getPriceGetterData(products);

                if(!priceData) {
                    this.priceData.error = "Что-то пошло не так, пожалуйста, перезагрузите страницу и повторите попытку";
                }

                priceData.forEach(el => {
                    this.modifications[el.name].image_main  = el.image_main ?? null;
                    this.modifications[el.name].image_thumb = el.image_thumb ?? null;
                    this.modifications[el.name].code        = el.code ?? null;
                    this.modifications[el.name].price       = el.price ?? null;
                });

                this.priceData.loading = false;
            },

            async getAccessories(key) {
                if(!this.accessoriesIsActive || this.accessoriesIsActive !== key) {
                    this.accessoriesIsActive = key;
                } else if(this.accessoriesIsActive === key) {
                    this.accessoriesIsActive = null;
                    return;
                }

                this.modificationAccessoriesData.loading = true;
                this.modificationAccessoriesData.error = "";
                this.modificationAccessoriesData.data = {};

                let modificationAccessories = this.accessories.filter(el => el.modification.trim() == key)[0];

                let productList = [];

                for (let key in modificationAccessories) {
                    if(key === "modification") continue;

                    const el = modificationAccessories[key];

                    if(Array.isArray(el)) {
                        el.forEach(product => { productList.push(product) });
                    } else {
                        productList.push(el);
                    }
                }

                let accessoriesPGData = await this.getPriceGetterData(productList);

                if(!accessoriesPGData) { this.modificationAccessoriesData.error = "Не удалось получить данные" } 

                for (let key in modificationAccessories) {
                    if(key === "modification") continue;

                    const el = modificationAccessories[key];


                    if(Array.isArray(el)) {
                        el.forEach(product => {
                            let productInf = accessoriesPGData.filter(item => item.name == product)[0];

                            if(productInf) {
                                if(!this.modificationAccessoriesData.data[key]) this.modificationAccessoriesData.data[key] = [];
                                this.modificationAccessoriesData.data[key].push(productInf);
                            }
                        });
                    } else {
                        let productInf = accessoriesPGData.filter(item => item.name == el)[0];
                        if(!productInf) continue;

                        if(!this.modificationAccessoriesData.data[key]) this.modificationAccessoriesData.data[key] = [];
                        this.modificationAccessoriesData.data[key].push(productInf);
                    }
                }

                this.modificationAccessoriesData.loading = false;

                console.log(this.modificationAccessoriesData.data);
            },

            getFiltersOptions() {
                this.filtersOptions.series = [];

                this.filtersOptions.voltage = [];
                this.filtersOptions.power = [];
                this.filtersOptions.nominal_output_current = [];

                for(let modification in this.filteredModifications) {
                    const el = this.filteredModifications[modification];

                    if(modification.indexOf("ПЧВ1") !== -1) {
                        if(!this.filtersOptions.series.includes("ПЧВ1")) this.filtersOptions.series.push("ПЧВ1");
                    }

                    if(modification.indexOf("ПЧВ3") !== -1) {
                        if(!this.filtersOptions.series.includes("ПЧВ3")) this.filtersOptions.series.push("ПЧВ3");
                    }

                    for(let key in this.filtersOptions) {
                        if(key === "series") continue;

                        if(!this.filtersOptions[key].includes(el[key])) this.filtersOptions[key].push(el[key]);
                    }
                }

                for(let key in this.filtersOptions) {
                    if(this.filtersOptions[key].length === 1) this.filtersValues[key] = this.filtersOptions[key][0];
                }

                for(let key in this.filtersOptions) {
                    sortNumbersWithLetters(this.filtersOptions[key])
                }

                function sortNumbersWithLetters(arr) {
                    return arr.sort((a, b) => {
                        const numA = parseFloat(a);
                        const numB = parseFloat(b);

                        return numA - numB;
                    });
                }
            },

            getFilteredModifications() {
                this.filteredModifications = {};

                for (let modification in this.modifications) {
                    const el = this.modifications[modification];

                    let matchesAllFilters = true;

                    if(this.filtersValues.series && modification.indexOf(this.filtersValues.series) == -1) {
                        matchesAllFilters = false;
                        continue;
                    }
        
                    for (let key in this.filtersValues) {
                        if(key === "series") continue;

                        if (this.filtersValues[key] && this.filtersValues[key] !== el[key]) {
                            matchesAllFilters = false;
                            break;
                        }
                    }

                    if (matchesAllFilters) {
                        this.filteredModifications[modification] = el;
                    }
                }
            },

            clearFilters() {
                this.limit = 5;

                this.filtersValues.series = null;
                this.filtersValues.power = null;
                this.filtersValues.voltage = null; 
                this.filtersValues.nominal_output_current = null;

                this.filteredModifications = Object.assign({}, this.modifications);
            }
        },

        watch: {
            filtersValues: {
                handler() {
                    this.getFilteredModifications();
                    this.getFiltersOptions();
                },

                deep: true,
            }
        },

        async created() {
            window.addEventListener("resize", this.updateWidth);

            await this.getAllData();

            this.filteredModifications = Object.assign({}, this.modifications);

            this.getFilteredModifications();
            this.getFiltersOptions();

            if(this.series) {
                this.filtersValues.series = this.series;
            }
        },
    }
</script>

<style lang="scss" scoped>
    $gray: #f0f0f0;

    .modification-selector {
        padding: 120px 0 60px 0;
        color: $colored-text;

        &__header {
            display: flex;
            justify-content: end;
            margin: 0 0 40px 0;
        }

        &__clear-btn {
            padding: 10px 20px;
            background-color: $gray;
            border: none;
            font-weight: 600;

            cursor: pointer;
        }

        &__filters {
            display: flex;
            justify-content: space-between;
            align-items: end;
            margin: 0 0 30px 0;
        }

        &__products {}

        &__accessory-btn {
            position: relative;
            cursor: pointer;
            width: 20px;
            height: 20px;
            display: block;
            margin: 0 auto;

            &._opened {
                transform: rotate(180deg);

                &::after { top: 0; }
            }

            @media (hover: hover) and (pointer: fine) {
                &:hover {
                    &::after { border-top: 10px solid $secondary-color; }
                }
            }

            &::after {
                content: "";
                position: absolute;
                top: 10px;
                left: 0;
                border: 10px solid transparent;
                border-top: 10px solid $primary-color;
            }
        }
    }

    .filter {
        flex: 0 0 24%;

        &__name {
            padding: 0 0 5px 0;
        }

        &__select-box {
            margin: 5px 0 0 0;
            position: relative;

            &:after {
                content: "";
                position: absolute;
                top: calc(50% - 5px);
                right: 15px;
                border: 5px solid transparent;
                border-top: 8px solid $colored-text;
            }

                select {
                    width: 100%;
                    border: none;
                    background-color: $gray;
                    padding: 20px 10px;
                    font-size: 14px;

                    cursor: pointer;

                    appearance: none;

                    &:focus-visible, &:focus {
                        outline: none;
                    }
                }
        }
    }

    table {
        width: 100%;

        th{
            background-color: $gray;
            padding: 15px 0;
            text-align: left;
            font-size: 15px;
            font-weight: 600;

            text-align: center;

            &:nth-child(2), &:nth-child(7) {
                text-align: left;
            }
        }

        tr {
            border-bottom: 1px solid $gray;
            padding: 6px 0;

            &._non-border {
                border-bottom: none;
            }
        }

        td{
            align-content: center;
            vertical-align: middle;

            &:first-child, &:nth-child(2) &:last-child {
                text-align: center;

                img {
                    width: 60px;
                    height: 60px;
                }
            }

            &:nth-child(2) {
                a {
                    color: inherit;

                    @media (hover: hover) and (pointer: fine) {
                        &:hover {
                            color: $secondary-color;
                        }
                    }
                }
            }

            &:nth-child(4), &:nth-child(5), &:nth-child(6) {
                color: $light-colored-text;
                text-align: center;
            }
        }
    }

    .accessories {

        &__loading { text-align: center; }

        &__error { text-align: center; }

        &__body {
            padding: 10px 30px;
            margin: 0 0 30px 0;
        }

        &__heading {
            font-size: 22px;
            text-align: left;
            margin: 10px 0;
        }
    }

    .more-btn {
        margin: 30px 0 0 0;
        background-color: $primary-color;
        color: #fff;
        font-size: 16px;
        border: none;
        padding: 10px 30px;

        cursor: pointer;
    }
</style>