<template>
    <div class="tbl">
        <div class="totalPoints tcl">
            <p><span class="f-red f-28">{{me.points}}</span><span class="f-12">=${{pointsMoney}}</span></p>
            <p class="f-15">Total Credits</p>
        </div>
        <div class="tcl bg-line">
            <div class="line"></div>
        </div>
        <div class="expiringPoints tcl">
            <p class="f-red f-20">{{me.overduePoints}}</p>
            <p class="f-12 m-t" @click="isShow">Credits expiring soon<i class="iconfont">&#xe732;</i></p>
            <div class="msg-tips" v-if="seen">{{message.message}}.</div>
        </div>
    </div>
</template>



<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'
    export default {
        props: {
            me: {
                type: Array,
                required: true
            }
        },
        computed: {
            pointsMoney(){
                return this.me.points > 0 ? this.me.points/100 : this.me.points
            },
            ...mapGetters('me', ['message']),
        },
        data(){
            return{
                seen:false
            }
        },
        methods: {
            isShow: function(){
                this.seen = !this.seen;

            }
        },
        created(){
            this.$store.dispatch('me/getMessage', 'M1138')
        }
    }
</script>

<style scoped type="scss">
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_oqd9vvi72n.eot');
        src: url('//at.alicdn.com/t/font_384296_oqd9vvi72n.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_oqd9vvi72n.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_oqd9vvi72n.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_oqd9vvi72n.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:14px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;}
    .f-red{
        color: #e5004f;
    }
    .f-28{
        font-size: 28px;
    }
    .f-15{
        font-size: 15px;
    }
    .f-12{
        font-size: 12px;
    }
    .f-20{
        font-size: 20px;
    }
    .m-t{
        margin-top: 8px;
        i{
            color: #666;
            margin-left: 5px;
            cursor: pointer;
        }
    }
    .tbl{
        width: 100%;
        display: table;
        padding: 10px;
    }
    .tcl{
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        height: 100px;
        background-color: #f5f5f5;
        &:first-child{
            width: 50%;
        }
    }
    .bg-line{
        .line{
            width: 2px;
            height: 62px;
            background-color: #cacaca;
        }
    }
    .expiringPoints{
        position: relative;
        .msg-tips{
            width: 200px;
            height:60px;
            padding: 10px;
            position: absolute;
            background-color: white;
            color: #666;
            border: 1px solid #efefef;
            font-size: 12px;
            left: -46px;
            top: 80px;
            text-align: left;
        }
    }

</style>