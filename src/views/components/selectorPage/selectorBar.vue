<template>
    <section class="picker">
        <div class="picker__filter-item" v-for="(item, key, index) in filtersOptions" :key="key">
            <div class="picker__filter-name">{{ filterNames[index] }}</div>
            <div class="picker__filter-options">
                <template v-for="(option, index) in item">
                    <p class="picker__checkbox-container" v-if="index < limits[key]" :key="option">
                        <input
                            type="checkbox"
                            :name="`${key}_${option}`"
                            v-model="selectedValues[key][option]"
                            @change="$emit('selectValue', selectedValues)"
                        >
                        <label :for="`${key}_${option}`">
                            {{ option }}
                        </label>
                    </p>
                </template>

                <template v-if="limits[key] !== 100 && item.length > 10">
                    <p class="picker__nodes">˙ ˙ ˙</p>
                    <p class="picker__show-more-btn open" @click="limits[key] = 100">Показать все</p>
                </template>
                <p class="picker__show-more-btn close" v-if="limits[key] === 100  && item.length > 10" @click="limits[key] = 10">Скрыть</p>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "selectorBar",

        props: {
            filtersOptions: {
                require: true,
                type: Object,
            },
        },

        data() {
            return {
                filterNames: [
                    "Серия",
                    "Напряжение",
                    "Мощность",
                    "Наминальный выходной ток",
                ],

                limits: {},

                selectedValues: {},

                initialized: false,
            }
        },

        methods: {
            initializeSelectValues() {
                if (this.initialized) return;

                for (let key in this.filtersOptions) {
                    this.selectedValues[key] = {};

                    this.limits[key] = 10;

                    const options = this.filtersOptions[key];

                    for (let i = 0; i < options.length; i++) {
                        const el = options[i];

                        this.selectedValues[key][el] = false;
                    }
                }

                this.initialized = true;
            }
        },

        watch: {
            filtersOptions: {
                immediate: true,

                handler(newVal) {
                    if (newVal) {
                        this.initializeSelectValues();
                    }
                },

                deep: true,
            }
        },

        created() {}
    }
</script>

<style lang="scss" scoped>
    .picker {
        color: $colored-text;
        padding: 40px 0 0 0;

        &__filter-item {
            margin: 0 0 32px 0;
        }

        &__filter-name {
            font-size: 22px;
        }

        &__filter-options {}

        &__checkbox-container {
            margin: 8px 0;
            font-size: 16px;
            color: $light-colored-text;
            display: flex;
            align-items: center;

            input[type="checkbox"] {
                appearance: none;
                position: relative;
                width: 14px;
                height: 14px;
                margin: 0 7px 3px 0;
                background: #fff;
                border: 1px solid $light-colored-text;
                transition: 500ms;
                cursor: pointer;

                &::after {
                    content: "✔";
                    position: absolute;
                    display: none;
                    color: $primary-color;
                    font-size: 15px;
                    top: -4px;
                }

                &:checked::after {
                    display: block;
                    transition: 500ms;
                }
            }
        }

        &__nodes {
            color: $light-colored-text;
            margin: 0;
        }

        &__show-more-btn {
            font-size: 16px;
            margin: 5px 0 0 0;
            color: $primary-color;
            cursor: pointer;
            padding: 0 15px 0 0;

            display: inline-block;
            position: relative;

            @media (hover: hover) and (pointer: fine) {
                &:hover {
                    color: $secondary-color;

                    &:before {
                        border-color: $secondary-color;
                    }
                } 
            }

            &:before {
                content: "";
                position: absolute;
                right: 0;
                top: 0;
                transform: rotate(45deg);
                width: 6px;
                height: 6px;
                border-color: $primary-color;
            }

            &.open {
                &:before {
                    top: 1px;
                    border-bottom: 2px solid;
                    border-right: 2px solid;
                }
            }

            &.close {
                &:before {
                    top: 5px;
                    border-top: 2px solid;
                    border-left: 2px solid;
                }
            }
        }

    }

</style>