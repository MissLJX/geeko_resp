<template>
    <div class="comment-alert">
        <div v-if="!data.isagree" class="logo">
            <img src="https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/promotion/20171128/logo.jpg" alt="">
        </div>
        <p v-bind:class="{'unsatisfy':!data.isagree}" v-html="data.message"></p>
        <div class="btn-container" v-if="!data.isagree">
            <div v-bind:class="{'no':true,'border-b-l-radius':true}" @click="closeAlert">{{$t('no')}}</div>
            <router-link  v-bind:class="{'yes':true,'border-b-l-radius':data.isagree}" :to="{ name: 'outsideReview', params: { id: 'myid' }}"><div>{{$t('yes')}}</div></router-link>
        </div>
        <div class="btn-container" v-if="data.isagree">
            <div v-bind:class="{'yes':true,'border-b-l-radius':data.isagree}" @click="closeAlert" v-html="data.agreeText"></div>
        </div>
    </div>
</template>
<style scoped lang="scss" type="text/scss">
    $border-radius: 5px;
    .comment-alert{
        position: fixed;
        width: 80%;
        max-width: 320px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        z-index: 201;
        text-align: center;
        border-radius: $border-radius;
        .logo{
            transform: translateY(-50%);
            img{
                width:27%;
            }
        }
        p.unsatisfy{
            margin-top: -50px;
            text-indent:1em;
        }
        p{
            font-size: 18px;
            color:#999999;
            padding: 25px;
            .big{
                color:#e3004f;
                font-weight:bold;
            }
        }
        .btn-container{
            display:flex;
            line-height:45px;
            font-size: 18px;
            width:100%;
            .border-b-l-radius{
                border-bottom-left-radius:$border-radius;
            }
            .no{
                color:#aaaaaa;
                background-color: #cccccc;
                flex:1;
                cursor: pointer;
            }
            .yes{
                color:#ffffff;
                background-color: #e3004f;
                flex:1;
                border-bottom-right-radius:$border-radius;
                text-decoration:none;
            }
        }
    }
</style>
<script type="text/ecmascript-6">
    export default{
        props:[
            'data'
        ],
        methods:{
            closeAlert(){
                this.$emit('hideAlert')
            }
        }
    }
</script>