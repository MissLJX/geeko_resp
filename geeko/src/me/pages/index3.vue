<template>
    <div class="index">
        <template v-if="initFlag">
            <index-message></index-message>

            <index-recommend></index-recommend>
        </template>

        <template v-else>
            <vue-content-loading :width="400" :height="700">
                <rect x="0" y="15" width="400" height="40" />
                <rect x="0" y="65" width="400" height="40" />
                <rect x="10" y="117" rx="10" width="380" height="245" />
                <circle cx="70" cy="137" r="20" fill="white"/>
                <rect x="10" y="382" rx="15" width="380" height="100" />
                <rect x="10" y="502" rx="15" width="380" height="100" />
                <rect x="30" y="622" width="160" height="40" />
                <rect x="210" y="622" width="160" height="40" />
            </vue-content-loading>
        </template>
    </div>
</template>

<script>
    import IndexMessage from "../components/index/IndexMessage.vue"
    import IndexRecommend from "../components/index/IndexRecommend.vue"
    import VueContentLoading from "../../components/skeleton/index.vue"
    import store from "../../store/index";

    export default {
        name:"Index",
        data(){
            return {
                initFlag:false
            }
        },
        beforeRouteEnter (to, from, next) {
            let me = store.getters['me/me'];
            
            if(!!me){
                next(vm =>{
                    vm.initFlag = true;
                })
                return;
            }

            store.dispatch('me/init').then((data) => {
                next(vm =>{
                    vm.initFlag = true;
                })
            }).catch(e => {
                next();
            });
        },
        components:{
            "index-message":IndexMessage,
            "index-recommend":IndexRecommend,
            "vue-content-loading":VueContentLoading
        }
    }
</script>

<style scoped lang="scss">
    .index{
        background-image: linear-gradient(240deg, 
		#f6f6f6 0%, 
        #ffffff 100%);
    }
</style>