<template>
    <div class="wrapper">
        <heading class="heading">
            <page-heading></page-heading>
        </heading>
        <main class="content">
            <section>
                <div class="container">
                    <p style="color: #000;">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti excepturi, neque accusantium cumque alias, voluptatibus quos fuga quia repudiandae consectetur quasi dolorum. Maxime, unde delectus! Dolorum debitis facilis eveniet rem.
                    </p>
                </div>
            </section>
        </main>
        <footer class="footer">
            <pageFooter/>
        </footer>
    </div>
</template>

<script>

import pageFooter from '../components/pageFooter.vue'

export default {
    name: "mainPage",

    components: {
        pageFooter,
    }
}

</script>

<style>

</style>