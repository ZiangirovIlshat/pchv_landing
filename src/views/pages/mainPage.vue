<template>
    <div class="wrapper">
        <heading class="heading">
            <pageHeading/>
        </heading>
        <main class="content">
            <topSection/>
            <productBenefits/>
        </main>
        <footer class="footer">
            <pageFooter/>
        </footer>
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

<!-- background: linear-gradient(0deg, #FFFFFF, #FFFFFF),
conic-gradient(from 180deg at 16.78% 12.69%, #DAE2E5 -51.35deg, #DAE2E5 79.14deg, #DAE2E5 129.49deg, #4B1466 149.28deg, #E60000 217deg, #DAE2E5 237.09deg, #DAE2E5 273.78deg, #DAE2E5 308.65deg, #DAE2E5 439.14deg),
 -->
