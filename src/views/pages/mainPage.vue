<template>
    <div class="wrapper">
        <pageHeading :menuFixed="isScrolled ? true : false" />

        <main class="content">
            <topSection/>
            <productBenefits/>
            <keyFeatures/>
            <usageScenarios/>
            <featuresAndCharacteristics/>
            <technicalCharacteristics/>
            <productLines/>
            <additionalEquipment/>

        </main>

        <pageFooter/>
    </div>
</template>

<script>
import pageHeading from "../components/pageHeading.vue";
import topSection from "../components/mainPage/topSection.vue";
import productBenefits from "../components/mainPage/productBenefits.vue";
import keyFeatures from "../components/mainPage/keyFeatures.vue";
import usageScenarios from "../components/mainPage/usageScenarios.vue";
import featuresAndCharacteristics from "../components/mainPage/featuresAndCaracteristics.vue";
import technicalCharacteristics from "../components/mainPage/technicalCharacteristics.vue";
import productLines from "../components/mainPage/productLines.vue";
import additionalEquipment from "../components/mainPage/additionalEquipment.vue";

import pageFooter from '../components/pageFooter.vue';

export default {
    name: "mainPage",

    components: {
        pageHeading,
        topSection,
        productBenefits,
        keyFeatures,
        usageScenarios,
        featuresAndCharacteristics,
        technicalCharacteristics,
        productLines,
        additionalEquipment,

        pageFooter,
    },

    data() {
        return {
            isScrolled: false,
        };
    },

    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },

    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    methods: {
        handleScroll() {
            const topSection = document.querySelector(".top-section");
            const topSectionBottom = topSection.getBoundingClientRect().bottom;

            if (topSectionBottom < 0 ) {
                this.isScrolled = true;
            } else {
                this.isScrolled = false;
            }
        },
    },

}
</script>

<style lang="scss">
    .swiper-pagination-bullet {
        width: 16px;
        height: 16px;
        background: #F1E5F9;
        opacity: 1;

        @media(max-width: 768px) {
            width: 10px;
            height: 10px;
        }
    }

    .swiper-pagination-bullet-active {
        background: $primary-color;
    }
</style>