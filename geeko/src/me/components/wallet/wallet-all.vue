<template>
    <WalletList  
        :wallets="wallets"
        :loading="loading"
        :finished="finished"
        @listing="listHandle"
    />
</template>

<script>
    import WalletList from "./wallet-list.vue";

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
                console.log('触发');
                let data = Array.from(new Array(20)).map((v,k)=>(k));
                console.log('this.skip', this.skip)
                this.skip += 20;
                console.log('this.skip2', this.skip)
                data = data.map((item,index) =>({
                    id:(this.skip+(++index)),
                    content:`test${index}`,
                    "name": "Spin & Win",
                    "points": 100,
                    "createTime": 1658999828078,
                    "usedPoints": 0,
                    "expiredDate": 1659172628078
                }))
                this.loading = true;
                this.wallets.push(...data);
                console.log('this.this.wallets', this.wallets)
                setTimeout(()=>{
                    this.loading = false;
                },5000);
            }
        },
        created(){
            let data = Array.from(new Array(this.skip+20));
            data = data.map((item,index) =>({
                id:++index,
                content:`test${index}`,
                "name": "Spin & Win",
                "points": 100,
                "createTime": 1658999828078,
                "usedPoints": 0,
                "expiredDate": 1659172628078
            }))
            console.log('data', data)
            this.loading = true;
            this.wallets = data;
            setTimeout(()=>{
                 this.loading = false;
            },5000);
        },
    }
</script>

<style scoped lang="scss">

</style>