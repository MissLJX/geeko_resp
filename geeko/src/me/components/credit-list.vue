<template>
    <div class="el-credits">
        <list :items="groups" :finished="finished">
            <template slot="li" slot-scope="props">
                <li :key="props.item.id">
                    <credit class="el-credit" :credit="props.item"/>
                </li>
            </template>
        </list>
    </div>
</template>

<style scoped lang="scss">
    .el-credits {
        margin-bottom: 80px;
        padding-top: 20px;
        li {
            height: 50px;
            // padding: 10px 10px;
            // border-top: 1px solid #dcdcdc;
            padding: 0px 20px;
            &:first-child {
                border-top: none;
            }
            .el-credit {
                width: 100%;
            }
        }
        .li-tit{
            padding-left: 10px;
            height: 40px;
            line-height: 40px;
            background-color: #f5f5f5;
            color: #222;
        }
        #triangle-down {
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 10px solid white;
            position: relative;
            top: -8px;
            left: 20px;
        }
    }
</style>

<script type="text/ecmascript-6">
    import List from '../../components/list.vue'
    import Credit from '../components/credit.vue'
    import _ from 'lodash'
    import fecha from 'fecha'

    export default{
        props: {
            credits: {
                type: Array
            },
            loading: {
                type: Boolean,
                default: false
            },
            finished: {
                type: Boolean,
                default: false
            },
            isReceived:{
                type: String,
            }
        },
        computed: {
            groups(){
                if(this.isReceived === "0"){
                    return this.credits;
                }

                var items = [];
                this.credits.forEach(item1=>{
                    if(this.isReceived === "2"){
                        if(item1.points<0){
                            items.push(item1);
                        }
                    }else{
                        if(item1.points>0){
                            items.push(item1);
                        }
                    }
                })

                if(items && items.length <= 0) this.finished = true;

                return items;
            },
        },
        components: {
            'list': List,
            'credit': Credit
        }
    }
</script>