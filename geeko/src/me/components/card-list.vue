<template>
    <div class="el-cards">
        <list :items="creditcards" :scrollable="false">
            <template slot="li" scope="props">
                <li :key="props">
                    <card :quickpayRecord="props.item.quickpayRecord" :cardStyle="props.item.style" @delete="deleteHandle"/>
                </li>
            </template>
        </list>
    </div>
</template>

<script type="text/ecmascript-6">
    import List from "../../components/list.vue";
    import Card from "../components/card.vue";

    export default {
        props:{
            creditcards:{
                type: Array
            }
        },
        components: {
            'list': List,
            'card': Card
        },
        name: "card-list",
        methods:{
            deleteHandle(cardId,method){
                this.$emit('delete', cardId ,method)
            }
        }
    }
</script>

<style scoped>
.el-cards{
    background-color: #fff;
    padding-bottom: 15px;
}
</style>