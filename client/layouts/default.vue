<template>
    <v-app>
        <my-header/>
        <nuxt/>
        <my-footer/>
    </v-app>
</template>

<script>
    import MyFooter from '~/components/Footer.vue'
    import MyHeader from '~/components/Header.vue'

    export default {
        components: {
            MyHeader,
            MyFooter
        }
    }
</script>