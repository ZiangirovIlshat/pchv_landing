<template>
    <div class="wrapper">
        <pageHeading :menuFixed="true" />

        <main class="content">
            <modificationSelector :series="$route.query.series" />
        </main>

        <pageFooter/>
    </div>
</template>

<script>
import pageHeading from "../components/pageHeading.vue";
import pageFooter from "../components/pageFooter.vue";
import modificationSelector from '../components/selectorPage/modificationSelector.vue';

    export default {
        components: {
            pageHeading,
            pageFooter,
            modificationSelector,
        },
    }
</script>