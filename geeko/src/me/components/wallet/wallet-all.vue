<template id="wallet-all">
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
        name:"WalletAll",
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
                getCashHistoryRecord({skip:this.skip, limit:20, path:"get-all"}).then(response =>{
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
            // let data = Array.from(new Array(this.skip+20));
            // data = data.map((item,index) =>({
            //     id:++index,
            //     content:`test${index}`,
            //     "name": "Spin & Win",
            //     "points": 100,
            //     "createTime": 1658999828078,
            //     "usedPoints": 0,
            //     "expiredDate": 1659172628078
            // }))
            // console.log('data', data)
            // this.loading = true;
            // this.wallets = data;
            // setTimeout(()=>{
            //      this.loading = false;
            // },5000);
        },
        activated(){
            
        }
    }
</script>

<style scoped lang="scss">

</style>