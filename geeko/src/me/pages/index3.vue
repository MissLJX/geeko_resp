<template>
    <div class="index">
        <index-message></index-message>

        <index-recommend></index-recommend>
    </div>
</template>

<script>
    import IndexMessage from "../components/index/IndexMessage.vue"
    import IndexRecommend from "../components/index/IndexRecommend.vue"

    export default {
        name:"Index",
        components:{
            "index-message":IndexMessage,
            "index-recommend":IndexRecommend
        }
    }
</script>

<style scoped lang="scss">
    .index{
        background-image: linear-gradient(2deg, 
		#ffffff 0%, 
        #f6f6f6 100%);
    }
</style>