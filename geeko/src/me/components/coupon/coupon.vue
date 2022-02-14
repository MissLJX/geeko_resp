<template>
    <div class="el-coupon st-table">
        <!-- <div class="el-coupon-info st-cell st-v-m">
            <span class="el-coupon-amount">{{coupontAmount}}</span>
            <span class="el-coupon-name" v-if="coupon.coupon.name">{{coupon.coupon.name}}</span>
            <p class="el-coupon-clearance" v-if="coupon.coupon.description">{{coupon.coupon.description}}</p>
            <p class="el-coupon-date">{{expireDate}}</p>
        </div>

        <div class="st-cell st-v-m st-t-r">
            <i class="iconfont expired-icon" v-if="isExpried">&#xe748;</i>
        </div> -->

        <div class="x-table __vm x-fw __fixed"
            :style="{background: isAvailable ?
                    `url('https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021-12-17/coupon_available.png') no-repeat` :
                    `url('https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021-12-17/coupon_disavailable.png') no-repeat`,
                'background-size': '100% 100%'}"
            >
		<div class='couponMainInfo'>
			<div class="x-cell" style="height: 100%">
				<div style="display: flex; align-items: center; justify-content: flex-start">
					<span class="couponAmount" :style="{'color':isAvailable?'#ff782a' : '#999'}">{{coupontAmount}}</span>

				</div>
				
                <div v-if="coupon.coupon.name" :style="{ 'margin-top': 4, 'color': isAvailable ? '#ff782a' : '#999' }">
                    <span class='description'>{{coupon.coupon.name}}</span>
                </div>
            
                <div v-if="coupon.coupon.description" :style="{ 'margin-top': 4, 'color': isAvailable ? '#ff782a' : '#999' }">
                    <span class='description'>{{coupon.coupon.description}}</span>
                </div>
				
			</div>
			<div class="x-cell">
			</div>
		</div>
		<div class='dateInfo'>
			 <li v-if="expireDate">
                <span class='dot'>.</span>
                <span class="el-coupon-date">{{expireDate}}</span>
            </li>
				
            <li v-if="expireDate">
                <span class='dot'>.</span>
                <span class="el-coupon-date">{{expireDate}}</span>
            </li>
		</div>

	</div>
    </div>
</template>

<style scoped lang="scss">
    .el-coupon{

        max-height: 121px;

        .couponAmount{
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            margin-right: 10px;
            white-space: nowrap;
            font-family: 'ACUMINPRO-BOLD';
            font-size: 20px;
            line-height: 24px;
            text-transform: uppercase;
        }

        .couponMainInfo{
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-height: 93px;
            border-bottom: 1px solid #fff;
            padding: 13px 0px 5px 15px;

            & > div:last-child{
                width: 70px;
                text-align: right;
                position:relative;
                right: 27px;
            }
        }
        .dateInfo{
            padding: 4px 15px;
            font-family: 'SLATEPRO';
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #999999;

            & > li{
                position: relative;
                top: -4px;
            }
        }

        .description{
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }
        
        .dot{
            vertical-align: super;
        }
    }
</style>

<script type="text/ecmascript-6">

    import fecha from 'fecha'
    import Btn from '../../../components/btn.vue'

    import * as utils from '../../../utils/geekoutils.js'

    export default{
        props: {
            coupon: {
                type: Object
            },
            isExpried:{
                type:Boolean,
                default:false
            }
        },
        computed: {
            coupontAmount(){
                /*var amount = this.coupon.coupon.amount
                if (amount && amount.indexOf('%') >= 0) {
                    return amount
                } else {
                    return '$' + amount
                }*/
                if(this.coupon && this.coupon.coupon){
                    return this.coupon.coupon.couponName2
                }
            },
            expireDate(){
                var [beginDate, endDate] = [this.coupon.coupon.beginDate, this.coupon.coupon.endDate]


                if (beginDate && endDate) {
                    return utils.dateFormat(beginDate) + "-" + utils.dateFormat(endDate);
                }

                return ''

            },
            isAvailable(){
                console.log(this.coupon)
                return this.coupon.isAvailable
            }
        },
        methods: {
            useHandle(){
                this.$store.dispatch('useCoupon', this.coupon.coupon.id).then(() => {
                    window.location.href = window.ctx + '/shoppingcart/show'
                })
            }
        },
        components: {
            'btn': Btn
        }
    }
</script>