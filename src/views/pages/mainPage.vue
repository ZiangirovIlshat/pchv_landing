<template>
    <div class="wrapper">
        <pageHeading :menuFixed="isScrolled ? true : false" />
        <main class="content">
            <topSection/>
            <productBenefits/>
            <keyFeatures/>
            <usageScenarios/>
            <featuresAndCharacteristics/>
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

<style>

</style>