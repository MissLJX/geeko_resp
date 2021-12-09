<template>
    <div class="pointsProductBox">
        <div class="pointsDetail">
            <div class="pointsTitle">Points Mall</div>
        </div>
        <div class="productDetail">
            <div class="productTabBox">
                <div class="productItem productItemSelect">Points Credit</div>
                <div class="productItem">Points Redemption</div>
                <div class="productItem">Coupon</div>
            </div>
            <div class="productContentBox">
                <div class="couponItemBox">
                    <div class="couponInfoBox">
                        <div class="couponToward">For Everything</div>
                        <div class="couponNumber">30%OFF</div>
                        <div class="couponDate">Expiry date: dd/mm/yyyy ~ dd/mm/yyyy </div>
                    </div>
                    <div class="couponRedeemBox">
                        <div class="couponPoints">100 points</div>
                        <div class="couponRedeemBtn">Redeem</div>
                    </div>
                </div>
            </div>
        </div>
    
    </div>
</template>

<script>
    export default {
        data(){
            return{
                selectValue:0
            }
        }
    }
</script>

<style scoped lang="scss">
    .pointsProductBox{
        width: 100%;
        background: #000;
        color: #fff;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }
    .pointsDetail{
        width: 100%;
        height: 40px;
        text-align: center;
        padding: 4px 0;
        line-height: 32px;
    }
    .pointsTitle{
        font-family: 'ACUMINPRO-BOLD';
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        
    }
    .pointsNumber{
        font-family: 'SLATEPRO-MEDIUM';
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #fcc202;
        display: flex;
        align-item:center;
        justify-content:center;
    }
    .pointsNumber > img{
        width: 10px;
    }
    .productDetail{
        width: 100%;
        min-height: 300px;
        background: #fff;
        color: #222;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        
    }
    .productTabBox{
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-family: 'ACUMINPRO-BOLD';
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #666666;
        padding-top: 12px;
        border-bottom: 1px solid #f6f6f6;
    }
    .productItem{
        padding-bottom: 6px;
        cursor:pointer;
    }
    .productItemSelect{
        padding-bottom: 4px;
        border-bottom: 2px solid #222;
        color:#222;
    }
    
    
    .couponItemBox{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: calc(100vw * 0.27);
        width: 92%;
        margin: 0 auto;
        background: url(https://image.geeko.ltd/2021-11-01-lottery/2021-11-01-lottery-coupon-background.png) no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
    }
    .couponInfoBox{
        flex: 100;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }
    .couponToward{
        height: 19px;
        background-color: #ff7d2e;
        border-radius: 8px;
        font-family: 'SLATEPRO-MEDIUM';
        font-size: 10px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #fff5ed;
        line-height: 19px;
        padding: 0 8px;
        transform: scale(0.83);
        margin-left: 10px;
    }
    .couponNumber{
        font-family: 'ACUMINPRO-BOLD';
        font-size: 50px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ff7d2e;
        line-height: 58px;
        margin-left: 18px;
    }
    .couponDate{
        font-family: 'SLATEPRO';
        font-size: 10px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ff7d2e;
        transform: scale(0.83);
    }
    .couponRedeemBox{
        flex:38;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        height: 100%;
    }
    .couponRedeemBox::before{
        content:'';
        display:block;
        width:10px;
        height: 0px;
        margin-top: 10px;
    }
    .couponPoints{
        font-family: 'ACUMINPRO-BOLD';
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffeadb;
    }
    .couponRedeemBtn{
        background-image: linear-gradient(180deg, #fff6ef 0%, #ffeadb 100%);
        box-shadow: 0px 2px 13px 0px rgba(0,0,0,0.12);
        border-radius: 10px;
        font-family: 'ACUMINPRO-BOLD';
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ff7d2e;
        width: 60px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        margin-bottom: 10px;
        cursor: pointer;
    }

</style>