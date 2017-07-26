<template>
    <a class="link-image" :href="href" :title="title">
        <img :alt="title" :src="src">
    </a>
</template>

<style scoped>
    .link-image{
        display: block;
    }

    .link-image img{
        display: block;
        width: 100%;
    }
</style>

<script>
    export default{
        props: [
            'href',
            'title',
            'src'
        ]
    }
</script>