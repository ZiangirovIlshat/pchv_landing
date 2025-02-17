<template>
    <section class="picker">
        <template v-if="!mobileVersion">
            <div class="picker__filter-item" v-for="(item, key, index) in filtersOptions" :key="key">
                <div class="picker__filter-name">{{ filterNames[index] }}</div>
                <div class="picker__filter-options">
                    <template v-for="(option, index) in item">
                        <p class="picker__radio-container radio-container" v-if="index < limits[key]" :key="option">
                            <input
                                type="radio"
                                :name="key + '_' + index"
                                :id="key + '_' + index"
                                v-model="selectedValues[key]"
                                :value="option"

                                @click="disableValue(key, option)"
                            >
                            <label :for="key + '_' + index">
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
        </template>

        <template v-else>
            <div class="picker-mobile">
                <div class="picker-mobile__item" v-for="(item, key, index) in filtersOptions" :key="key">
                    <div
                        class="picker-mobile__selector"
                        :class="{'_opened' : openSelect === key}"
                        @click="showOptions(key)"
                    >
                        <p 
                            class="picker-mobile__heading" 
                            v-if="!selectedValues[key]"
                        >{{ filterNames[index] }}</p>
                        <p v-else>{{ selectedValues[key] }}</p>
                    </div>

                    <div class="picker-mobile__options" v-if="openSelect === key">
                        <p
                            class="picker-mobile__radio-container radio-container"
                            v-for="(option, index) in item"
                            :key="option"
                        >
                            <input
                                type="radio"
                                :name="key + '_' + index"
                                :id="key + '_' + index"
                                v-model="selectedValues[key]"
                                :value="option"

                                @click="disableValue(key, option)"
                            >
                            <label :for="key + '_' + index">
                                {{ option }}
                            </label>
                        </p>
                    </div>
                </div>
            </div>
        </template>
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

            mobileVersion: {
                require: true,
                type: Boolean,
            },

            selectedSeries: {
                type: String,
            }
        },

        data() {
            return {
                filterNames: [
                    "Серия",
                    "Напряжение",
                    "Мощность",
                    "Номинальный выходной ток",
                ],

                limits: {},
                selectedValues: {},

                initialized: false,

                openSelect: null,
            }
        },

        methods: {
            initializeSelectValues() {
                if (this.initialized) return;

                for (let key in this.filtersOptions) {

                    this.limits[key] = 10;
                    this.selectedValues[key] = null;
                }

                this.initialized = true;
            },

            showOptions(key) {
                if(!this.openSelect) {
                    this.openSelect = key;
                    return;
                }

                this.openSelect = null;
            },

            disableValue(key, option) {
                if(this.selectedValues[key] === option) this.selectedValues[key] = null
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
            },

            selectedValues: {
                handler(newVal) {
                    if (newVal) {
                        this.$emit("selectValue", this.selectedValues)
                    }
                },

                deep: true,
            }
        },

        mounted() {
            if (this.selectedSeries) {
                this.selectedValues.series = this.selectedSeries;

                setTimeout(() => {
                    this.$emit("selectValue", this.selectedValues);
                }, 200)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .radio-container {
        margin: 8px 0;
        font-size: 16px;
        color: $light-colored-text;
        display: flex;
        align-items: center;
        
        label {
            cursor: pointer;
        }

        @media (max-width: 768px){
            font-size: 12px;
        }
    }

    .picker {
        color: $colored-text;
        padding: 40px 0 0 0;

        &__filter-item {
            margin: 0 0 32px 0;
        }

        &__filter-name {
            font-size: 22px;
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

    .picker-mobile {

        &__item {
            width: 100%;
            margin: 0 0 10px 0;
        }

        &__selector {
            padding: 10px 30px 10px 10px;
            border: 1px solid $light-colored-text;
            position: relative;

            &._opened {
                &::after {
                    transform: rotate(180deg);
                    top: 5px;
                }
            }

            &::after {
                content: "";
                position: absolute;
                top: 15px;
                right: 9px;
                border: 7px solid transparent;
                border-top: 10px solid $primary-color;
            }
        }

        &__heading {
            font-size: 14px;
        }

        &__selected-values {
            display: flex;
            flex-wrap: nowrap;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 100%;
        }

        &__options {
            padding: 10px;
            border: 1px solid $light-colored-text;
            border-top: none;
        }
        
    }


</style>