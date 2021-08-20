<template>
    <div class="index-service-container">
        <div class="_hd">
            {{$t("index.customer_service")}}
        </div>

        <div class="_bd">
            <router-link to="/me/m/tickets">
                <p style="font-size:25px;" class="iconfont">&#xe6e8;</p>
                <p>{{$t("ticket")}}</p>
            </router-link>
                
            <router-link to="/me/m/notification">
                <p class="iconfont">&#xe60b;</p>
                <p>{{$t("index.messages")}}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name:"IndexServiceContainer"
    }
</script>

<style scoped lang="scss">
    .index-service-container{
        ._hd{
            font-family: 'AcuminPro-Bold';
            font-size: 18px;
            color: #000000;
            padding: 0px 18px;
        }

        ._bd{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 25px;

            & > a{
                color: #222222;
                display: inline-block;
                width: 50%;
                text-align: center;
                margin-bottom: 15px;

                & > p{
                    &:first-child{
                        font-size: 23px;
                    }

                    &:last-child{
                        font-size: 12px;
                        color: #000000;
                        margin-top: 4px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
    }
</style>