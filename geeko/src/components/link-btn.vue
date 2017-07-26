<template>
    <a :href="href" :title="title">{{label}}</a>
</template>

<style type="scss/text" lang="scss">

</style>

<script type="text/ecmascript-6">
    export default{
        props:['label','href','title']
    }
</script>