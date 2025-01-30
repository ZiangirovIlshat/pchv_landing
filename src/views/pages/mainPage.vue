<template>
    <div class="wrapper">
        <pageHeading/>
        <main class="content">
            <topSection/>
            <productBenefits/>
            <keyFeatures/>
            <usageScenarios/>
        </main>
        <pageFooter/>
    </div>
</template>

<script>
import pageHeading from '../components/pageHeading.vue';
import topSection from '../components/mainPage/topSection.vue';
import productBenefits from '../components/mainPage/productBenefits.vue';
import keyFeatures from '../components/mainPage/keyFeatures.vue';
import usageScenarios from '../components/mainPage/usageScenarios.vue';

import pageFooter from '../components/pageFooter.vue';

export default {
    name: "mainPage",

    components: {
        pageHeading,
        topSection,
        productBenefits,
        keyFeatures,
        usageScenarios,

        pageFooter,
    }
}
</script>

<style>

</style>