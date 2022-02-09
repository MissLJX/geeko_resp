<template>
    <div class="el-coupons">
        <list :items="coupons" :scrollable="scrollable" :loading="loading" :finished="finished" @listing="$emit('listing')">
            <template slot="li" slot-scope="props">
                <li :key="props.item.coupon.id" :class="{'el-coupon-li' : !props.item.isAvailable}">
                    <div class="__container">
                        <coupon class="el-coupon" :coupon="props.item"/>
                    </div>
                </li>
            </template>
        </list>
    </div>
</template>

<script type="text/ecmascript-6">
    import List from '../../../components/list.vue'
    import Coupon from './coupon.vue'

    export default{
        props:{
            coupons:{
                type: Array
            },
            loading:{
                type:Boolean
            },
            finished:{
                type:Boolean
            },
            scrollable:{
                type:Boolean,
                default:false
            },
            isExpried:{
                type:Boolean,
                default:false
            }
        },
        components: {
            'list': List,
            'coupon': Coupon
        }
    }
</script>

<style scoped lang="scss">
    .el-coupons  li{
        .__container{
            position: relative;
            // &::after{
            //     content: '';
            //     position: absolute;
            //     width: 10px;
            //     height: 100%;
            //     top: 0;
            //     bottom: 0;
            //     right: -10px;
            //     background: radial-gradient(8px 10px ellipse at right, transparent 3px , #faefd2 3px);
            //     background-size: 10px 9px;
                
            // }

            // &::before{
            //     content: '';
            //     position: absolute;
            //     width: 10px;
            //     height: 100%;
            //     top: 0;
            //     bottom: 0;
            //     left: -10px;
            //     background: radial-gradient(8px 10px ellipse at left, transparent 3px , #faefd2 3px);
            //     background-size: 10px 9px;
                
            // }
        }

        &:first-child{
            border-top: none;
        }
        .el-coupon{
            width: 100%;
            // border-top: 6px solid #faefd2;
            // border-bottom: 6px solid #faefd2;
            // padding: 10px;
        }
        padding: 10px;
    }

    .el-coupons  li.el-coupon-li{
        .__container{
            // &::after{
            //     background: radial-gradient(8px 10px ellipse at right, transparent 3px , #cacaca 3px);
            //     background-size: 10px 9px;
            // }

            // &::before{
            //     background: radial-gradient(8px 10px ellipse at left, transparent 3px , #cacaca 3px);
            //     background-size: 10px 9px;
            // }
        }

        .el-coupon{
            // border-top: 6px solid #cacaca;
            // border-bottom: 6px solid #cacaca;
        }
    }
</style>