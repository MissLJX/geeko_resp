<template>
    <div>
        <list :items="points" @listing="$emit('listing')" :loading="loading" :finished="finished">
            <template slot="li" slot-scope="props">
                <li :key="props.item.id">
                    <point class="el-notification" :points="props.item"/>
                </li>
            </template>
        </list>
    </div>
</template>

<script>
    import List from '../../components/point/list.vue';
    import Point from './PointItem.vue';
    export default {
        name:"PointsList",
        props: {
            points: {
                type: Array
            },
            loading: {
                type: Boolean,
                default: false
            },
            finished: {
                type: Boolean,
                default: false
            }
        },
        components:{
            "list":List,
            "point":Point
        }
    }
</script>

<style>

</style>