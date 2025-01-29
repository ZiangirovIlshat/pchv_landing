<template>
    <div class="wrapper">
        <pageHeading/>
        <main class="content">
            <topSection/>
            <productBenefits/>
        </main>
        <pageFooter/>
    </div>
</template>

<script>
import pageHeading from '../components/pageHeading.vue';
import topSection from '../components/mainPage/topSection.vue';
import  productBenefits from '../components/mainPage/productBenefits.vue';
import pageFooter from '../components/pageFooter.vue';

export default {
    name: "mainPage",

    components: {
        pageHeading,
        topSection,
        productBenefits,
        pageFooter,
    }
}
</script>

<style>

</style>