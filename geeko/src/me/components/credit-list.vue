<template>
    <div class="el-credits">
        <div class="item-list" v-for="(group, index) in groups" :key="index">
            <div class="li-tit">{{index}} <div id="triangle-down"></div></div>
            <list :items="group" :loading="loading && group.length-1 === index" :finished="finished && group.length-1 === index" @listing="$emit('listing')" :scrollable="true">
                <template slot="li" scope="props">
                        <li :key="props.item.id">
                            <credit class="el-credit" :credit="props.item"/>
                        </li>
                </template>
            </list>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .el-credits {
        margin-bottom: 80px;
        li {
            height: 50px;
            padding: 10px 10px;
            border-top: 1px solid #dcdcdc;
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
                type: Boolean,
            }
        },
        computed: {
            groups(){
                var items = [];
                this.credits.forEach(item1=>{
                    if(!this.isReceived){
                        if(item1.points<0){
                            items.push(item1);
                        }
                    }else{
                        if(item1.points>0){
                            items.push(item1);
                        }
                    }
                })

                return _.groupBy(items, (item) => {
                    const date = new Date(item.createTime);
                    const month = fecha.format(date, 'mediumDate').slice(0,3);
                    if(month==='Jul'){
                        return 'July. '+ date.getFullYear();
                    }else{
                        return month + '. ' + date.getFullYear();
                    }
                });
            },
        },
        components: {
            'list': List,
            'credit': Credit
        }
    }
</script>