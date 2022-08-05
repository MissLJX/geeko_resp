<template id="wallet-earned">
    <WalletList  
        :wallets="wallets"
        :loading="loading"
        :finished="finished"
        @listing="listHandle"
    />
</template>

<script>
    import WalletList from "./wallet-list.vue";
    import { getCashHistoryRecord } from "../../api/index";

    export default {
        name:"WalletExpired",
        components:{
            "WalletList":WalletList
        },
        data(){
            return {
                wallets:[],
                loading:false,
                finished:false,
                skip:0
            }
        },
        methods:{
            listHandle(){
                this.loading = true;
                getCashHistoryRecord({skip:this.skip, limit:20, path:"get-expired"}).then(response =>{
                    this.loading = false;

                    if(response?.result?.length > 0){
                        this.skip += 20; 
                        this.wallets.push(...response?.result)
                    }else{
                       this.finished = true;
                    }
                }).catch(response =>{
                    alert(response.result);
                    this.loading = false;
                })
            }
        },
        created(){
            this.listHandle();
        },
    }
</script>

<style scoped lang="scss">

</style>