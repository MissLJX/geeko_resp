<template>
    <div class="index-nav-container">
        <index-nav-item 
            :num="MyAccount.list.length" 
            :list="MyAccount" 
            v-bind="$attrs" 
            v-on='$listeners'
        ></index-nav-item>

        <index-nav-item 
            :num="MyAssets.list.length" 
            :list="MyAssets"
            v-bind="$attrs" 
            v-on='$listeners'
        ></index-nav-item>

        <index-nav-item 
            :num="MyOrders.list.length" 
            :list="MyOrders"
            v-bind="$attrs" 
            v-on='$listeners'
            :is-orders="true"
        ></index-nav-item>

        <index-nav-one-item 
            v-bind="$attrs" 
            v-on='$listeners'
        ></index-nav-one-item>

        <index-nav-item 
            :num="CustomerService.list.length" 
            :list="CustomerService"
            v-bind="$attrs" 
            v-on='$listeners'
        ></index-nav-item>

        <index-nav-item 
            :num="Policy.list.length" 
            :list="Policy"
            v-bind="$attrs" 
            v-on='$listeners'
        ></index-nav-item>
    </div>
</template>

<script>
    import IndexNavItem from "./index-nav-item.vue"
    import IndexNavOneItem from "./index-nav-one-item.vue"
    
    export default {
        name:"IndexNavContainer",
        components:{
            "index-nav-item":IndexNavItem,
            "index-nav-one-item":IndexNavOneItem
        },
        data(){
            return {
                MyAccount:{
                    title:this.$t("index.my_account"),
                    list:[
                        {
                            name:this.$t("index.my_profile"),
                            routerName:"updateProfile",
                            routerPath:"/me/m/updateProfile",
                        },
                        {
                            name:this.$t("index.my_address"),
                            routerName:"addressBook",
                            routerPath:"/me/m/addressBook"
                        },
                        {
                            name:this.$t("index.my_payment_card"),
                            routerName:"cards",
                            routerPath:"/me/m/cards"
                        },
                        {
                            name:this.$t("index.my_measurements"),
                            routerName:"my-measurements",
                            routerPath:"/me/m/my-measurements"
                        },
                        {
                            name:this.$t("index.my_preference"),
                            routerName:"my-preference",
                            routerPath:"/me/m/my-preference"
                        },
                        {
                            name:this.$t("changeEmail"),
                            routerName:"changeEmail",
                            routerPath:"/me/m/change-email"
                        },
                        {
                            name:this.$t("changepwd"),
                            routerName:"changePwd",
                            routerPath:"/me/m/changePwd"
                        }
                    ]
                },
                MyAssets:{
                    title:this.$t("index.my_assets"),
                    list:[
                        {
                            name:this.$t("mycoupons"),
                            routerName:"coupons",
                            routerPath:"/me/m/coupons"
                        },
                        {
                            name:this.$t("point.my_points"),
                            routerName:"credits",
                            routerPath:"/me/m/credits"
                        }
                    ]
                },
                MyOrders:{
                    title:this.$t("myorders"),
                    list:[
                        {
                            name:this.$t("all"),
                            routerName:"orders",
                            routerPath:"/me/m/order",
                            status:0
                        },
                        {
                            name:this.$t("unpaid"),
                            routerName:"orders",
                            routerPath:"/me/m/order",
                            status:1
                        },
                        // {
                        //     name:this.$t("paid"),
                        //     routerName:"orders",
                        //     routerPath:"/me/m/order",
                        //     status:2
                        // },
                        {
                            name:this.$t("processing"),
                            routerName:"orders",
                            routerPath:"/me/m/order",
                            status:3
                        },
                        {
                            name:this.$t("ordershipped"),
                            routerName:"orders",
                            routerPath:"/me/m/order",
                            status:4
                        },
                        {
                            name:this.$t("review"),
                            routerName:"orders",
                            routerPath:"/me/m/order",
                            status:5
                        },
                        {
                            name:this.$t("cancelorder1"),
                            routerName:"orders",
                            routerPath:"/me/m/order",
                            status:6
                        },
                        {
                            name:this.$t("index.returns"),
                            routerName:"orders",
                            routerPath:"/me/m/order",
                            status:7
                        },
                    ]
                },
                CustomerService:{
                    title:this.$t("index.customer_service"),
                    list:[
                        // {
                        //     name:this.$t("index.support"),
                        //     routerName:"",
                        //     routerPath:"/fs/contact-us-pc",
                        //     // routerPath: "/me/m/support",
                        //     pushButton:true
                        // },
                        {
                            name:this.$t("index.support"),
                            routerName:"support",
                            // routerPath:"/fs/contact-us-pc",
                            routerPath: "/me/m/support",
                            // pushButton:true
                        },
                        {
                            name:this.$t("mymessages"),
                            routerName:this.$t("mymessages"),
                            routerPath:"/me/m/notification"
                        },
                        {
                            name:this.$t("point.suggestion"),
                            routerName:"makeSug",
                            routerPath:"/me/m/makeSug"
                        }
                    ]
                },
                Policy:{
                    title:this.$t("index.policy"),
                    list:[
                        {
                            name:this.$t("index.shipping_info"),
                            routerName:"",
                            routerPath:"/fs/shipping-policy-pc",
                            pushButton:true
                        },
                        {
                            name:this.$t("index.return_policy"),
                            routerName:"",
                            routerPath:"/fs/return-policy-pc",
                            pushButton:true
                        },
                        {
                            name:this.$t("index.terms_notices"),
                            routerName:"",
                            routerPath:"/fs/privacy-policy-pc",
                            pushButton:true
                        },
                        {
                            name:this.$t("index.privacy_poilicy"),
                            routerName:"",
                            routerPath:"/fs/term-of-service-pc",
                            pushButton:true
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>