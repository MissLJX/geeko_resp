<template>
    <div class="mainArea">
        <div style="padding:10px 10px 0;">
            <div class="selectArea" v-show="!ifShoe">
                <div v-bind:class="{ active: isActive }" @click="changeMethod(0)">{{$t('label.inches')}}</div>
                <div v-bind:class="{ active: !isActive }" @click="changeMethod(1)">{{$t('label.centimeters')}}</div>
                <select v-model="selected">
                    <option v-for="(option,label) in getSizeMethod">
                        {{label}}
                    </option>
                </select>
            </div>

            <div class="fit-types" v-if="fitStr.fitType != null && !ifShoe">
                <div class="_title">{{$t('label.fit_type')}}</div>
               <div class="_content">
                    <div :class="{'active' : fitStr.fitType === '0'}">{{$t('label.skinny')}}</div>
                    <div :class="{'active' : fitStr.fitType === '1'}">{{$t('label.regular')}}</div>
                    <div :class="{'active' : fitStr.fitType === '2'}">{{$t('label.oversized')}}</div>    
                </div>
            </div>

            <div class="fit-types"  v-if="fitStr.stretch != null && !ifShoe">
                <div class="_title">{{$t('label.stretch')}}</div>
                <div class="_content">
                    <div :class="{'active' : fitStr.stretch === '0'}">{{$t('label.non')}}</div>
                    <div :class="{'active' : fitStr.stretch === '1'}">{{$t('label.slight')}}</div>
                    <div :class="{'active' : fitStr.stretch === '2'}">{{$t('label.medium')}}</div>
                    <div :class="{'active' : fitStr.stretch === '3'}">{{$t('label.high')}}</div>
                </div>
            </div>

            <div class="tableArea">
                <div class="_title">
                    {{$t('label.product_measurements')}}
                </div>

                <div class="_utable">
                    <table class="chartable" v-show="!ifShoe">
                        <tbody>
                            <tr>
                                <td>{{$t("label.size")}}</td>
                                <td>size({{selected}})</td>
                                <td v-for="item in objName">{{item}}</td>
                            </tr>

                            <tr v-for="item in getDataArr">
                                <td>{{item[0][0]}}</td>
                                <td>{{item[0][1][selected]}}</td>
                                <td v-for="item2 in item[1]">{{item2}}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="chartable" v-show="ifShoe">
                        <tbody>
                        <tr>
                            <th colspan="2" v-for="(key,val) in getShoeLabel" v-bind:class="{currLocal:val===getLang }">
                                <span>{{val}}</span>
                            </th>
                        </tr>
                        <tr v-for="item in getShoeSize">
                            <td colspan="2" v-for="(k,v) in item[1]" v-bind:class="{currLocal:v===getLang }">
                                {{k}}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="_message">
                    {{$t('message.product_measurements_message')}}
                </div>
            </div>

            <div class="topArea">
                <div class="measure-size" @click="isMeasureActive = !isMeasureActive">
                    <span>{{$t('message.measure_product_size')}}</span>
                    <span class="iconfont" :class="{'active' : isMeasureActive}">&#xe692;</span>
                </div>
                <div v-if="isMeasureActive" class="p-b-10">
                    <div class="_img">
                        <div style="margin: 25px 0px; width: 100%; text-align: center;">
                            <img v-bind:src="imgSrc[0]" style="width: 237px;">
                        </div>
                    </div>

                    <size-detail-msite :pmethod="pmethod[0]"></size-detail-msite>
                </div>
            </div>
        </div>
        <div class="body-measure" v-if="!ifShoe">
            <div class="_title">
                {{$t('label.body_measurements')}}
            </div>

            <div class="_size">
                <span @click="bwhSize = 'XS'" :class="{'active' : bwhSize === 'XS'}">XS</span>
                <span @click="bwhSize = 'S'" :class="{'active' : bwhSize === 'S'}">S</span>
                <span @click="bwhSize = 'M'" :class="{'active' : bwhSize === 'M'}">M</span>
                <span @click="bwhSize = 'L'" :class="{'active' : bwhSize === 'L'}">L</span>
                <span @click="bwhSize = 'XL'" :class="{'active' : bwhSize === 'XL'}">XL</span>
                <span @click="bwhSize = '2XL'" :class="{'active' : bwhSize === '2XL'}">2XL</span>
            </div>

            <div class="_content">
                <div>1. {{$t('label.bust')}}: {{getBwhMessage.bust}}</div>
                <div>2. {{$t('label.waist_size')}}: {{getBwhMessage.waist}}</div>
                <div>3. {{$t('label.hip_size')}}: {{getBwhMessage.hip}}</div>
            </div>

            <div class="_message">
                {{$t('message.body_measurements_message')}}
            </div>
        </div>
        <div style="padding:10px 10px 0;" v-if="!ifShoe">
            <div class="topArea">
                <div class="measure-size" @click="isMeasureBodyActive = !isMeasureBodyActive">
                    <span>{{$t('message.measure_body_size')}}</span>
                    <span class="iconfont" :class="{'active' : isMeasureBodyActive}">&#xe692;</span>
                </div>
                <div v-if="isMeasureBodyActive" class="_bwh">
                    <div class="_img">
                        <div>
                            <div style="margin-bottom: 15px">
                                <div class="img_t">
                                    <span>1.</span>
                                    <span>{{$t('label.your_bust')}}</span>
                                </div>

                                <div class="img_c">
                                    {{$t('message.measure_body_size_bust')}}
                                </div>
                            </div>
                            <div style="margin-bottom: 15px">
                                <div class="img_t">
                                    <span>2.</span>
                                    <span>{{$t('label.your_waist')}}</span>
                                </div>

                                <div class="img_c">
                                    {{$t('message.measure_body_size_waist')}}
                                </div>
                            </div>
                            <div style="margin-bottom: 15px">
                                <div class="img_t">
                                    <span>3.</span>
                                    <span>{{$t('label.your_hips')}}</span>
                                </div>

                                <div class="img_c">
                                    {{$t('message.measure_body_size_hip')}}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="picture-show">
                                <img src="https://image.geeko.ltd/chicme/2021042901/bwh.png">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    // @font-face {
    //     font-family: 'SlatePro';
    //     src: url('https://s3.geeko.ltd/fonts/SlatePro.ttf');
    // }

    // @font-face {
    //     font-family: 'SlatePro-Medium';
    //     src: url('https://s3.geeko.ltd/fonts/SlatePro-Medium.ttf');
    // }

    // @font-face {
    //     font-family: 'iconfont';  /* project id 384296 */
    //     src: url('//at.alicdn.com/t/font_384296_518ep8u3j93.eot');
    //     src: url('//at.alicdn.com/t/font_384296_518ep8u3j93.eot?#iefix') format('embedded-opentype'),
    //     url('//at.alicdn.com/t/font_384296_518ep8u3j93.woff2') format('woff2'),
    //     url('//at.alicdn.com/t/font_384296_518ep8u3j93.woff') format('woff'),
    //     url('//at.alicdn.com/t/font_384296_518ep8u3j93.ttf') format('truetype'),
    //     url('//at.alicdn.com/t/font_384296_518ep8u3j93.svg#iconfont') format('svg');
    // }


    // .iconfont {
    //     font-family:"iconfont" !important;
    //     font-size:16px;
    //     font-style:normal;
    //     -webkit-font-smoothing: antialiased;
    //     -moz-osx-font-smoothing: grayscale;
    // }
    .mainArea{
        width: 100%;

        .fit-types{
            margin-bottom: 20px;
            ._title{
                font-family: SlatePro-Medium;
                font-size: 15px;
                color: #222222;
            }

            ._content{
                display: flex;
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: center;
                background-color: #f5f5f5;
                margin-top: 10px;

                & > div{
                    flex: 1;
                    font-family: SlatePro;
	                font-size: 12px;
                    color: #666666; 
                }

                .active{
                    background-color: #000000;
                    color: #ffffff;
                    position: relative;

                    &::after{
                        position: absolute;
                        content: '';
                        left: 50%;
                        bottom:-10px;
                        width: 0;
                        height: 0;
                        border-style: solid;
                        border-width: 9px 4px;
                        border-color: transparent transparent #000000;
                        transform: translateX(-50%);
                    }
                }
            }
        }

        .topArea{
            margin-top: 20px;
            border-top: solid 1px #eeeeee;
            &::after{
                display: block;
                content: '';
                clear: both;
            }

            .measure-size{
                height: 43px;
                line-height: 43px;
                cursor: pointer;

                & > span{
                    vertical-align: middle;
                }

                & > span:first-child{
                    font-size: 14px;
                    color: #000000;
                    font-family: SlatePro-Medium;
                }
                

                & > span:last-child{
                    margin-left: 10px;
                    display: inline-block;
                    transition: all .3s ease;
                    -webkit-transition: all .3s ease;
                    float: right;
                }

                .active{
                    -webkit-transform: rotate(180deg);
                    transform: rotate(180deg);
                }
            }

            ._bwh{
                ._img{
                    padding-bottom: 25px;
                    display: flex;
                    align-items: center;

                    .img_t{
                        text-transform: capitalize;
                        font-family: SlatePro-Medium;
                        color: #222222;
                        font-size: 14px;

                        & span {
                            display: inline-block;
                            &:first-child {
                                // display: inline-block;
                                // width: 16px;
                                // height: 16px;
                                // border-radius: 50%;
                                // background-color: #111;
                                // color: #fff;
                                // text-align: center;
                                // line-height: 16px;
                                // font-size: 14px;
                                // margin-right: 10px;
                                // font-weight: normal;
                            }
                        }
                    }

                    .img_c {
                        font-size: 12px;
                        color: #666;
                        line-height: 16px;
                        padding-top: 8px;
                    }

                    & > div:first-child{
                        width: 60%;
                    }

                    & > div:last-child{
                        width: 40%;
                    }
                }

                .picture-show{
                    width: 75px;
                    margin: 0px auto;
                    img{
                        display: block;
                        width: 100%;
                    }
                }
            }

            .p-b-10{
                padding-bottom: 10px;
            }
        }

        .body-measure{
            border-top: 8px solid #f7f7f7;
            padding: 0px 10px;

            ._title{
                font-family: SlatePro-Medium;
	            font-size: 15px;
                color: #222222;
                margin-top: 15px;
            }
            ._size{
                margin: 10px 0px;
                font-size: 0;
                & > span{
                    height: 24px;
                    line-height: 24px;
                    border-radius: 4px;
                    width: 56px;
                    display: inline-block;
                    color: #000000;
                    font-family: SlatePro;
	                font-size: 14px;
                    border: solid 1px #dddddd;
                    text-align: center;
                    cursor: pointer;
                    margin: 0px 10px 10px 0px;
                }

                .active{
                    background-color: #222222;
                    color: #ffffff;
                }
            }

            ._content{
                background-color: #f5f5f5;
                display: flex;
                flex-wrap: wrap;
                padding: 10px;

                & > div{
                    font-family: SlatePro;
	                font-size: 13px;
                    color: #222222;
                    margin-left: 20px;
                    height: 25px;
                    line-height: 25px;
                }
            }

            ._message{
                font-family: SlatePro;
                font-size: 12px;
                color: #999999;
                margin-top: 10px;
            }
        }
    }
    .selectArea{
        margin-bottom: 12px;
        div{
            height: 33px;
            float: left;
            color: #666;
            line-height: 33px;
            text-align: center;
            font-size: 15px;
            padding: 0 10px;
            cursor: pointer;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            border: 1px solid #f3f3f3;
        }
        .active{
            background-color: #111;
            color: white;
        }
        select{
            height: 33px;
            line-height: 33px;
            cursor: pointer;
            border: 1px solid #dbdbdb;
            text-align: center;
            list-style: none;
            background-color: #fff;
            padding-left: 11px;
            float: right;
        }
        &:after{
            display: block;
            content: '';
            clear: both;
            text-align: center;
        }
    }
    .currLocal{
        background-color: #f5f5f5 !important;
        color: #222222 !important;
        font-family: SlatePro-Medium;
    }

    .tableArea{
        width: 100%;

        ._title{
            font-family: SlatePro-Medium;
	        font-size: 15px;
            color: #222222;
            margin-bottom: 10px;
        }

        ._message{
            font-family: SlatePro;
            font-size: 12px;
            color: #999999;
        }

        ._utable{
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            width: 100%;
            overflow-y: visible!important;
            overflow-x: auto;
            padding-bottom: 10px;

            &::-webkit-scrollbar {
                height: 0;
                width: 0;
                color: transparent;
            }
        }
    }

    .chartable{
        width: 100%;
        border-collapse: collapse;
    }
    .chartable th{
        border: 1px solid #e0e0e0;
        text-align: center;
        vertical-align: middle;
        line-height: 40px;
        background-color: #f5f5f5;
        font-size: 14px;
        color: #222222;
    }
    .chartable td{
        border: 1px solid #e0e0e0;
        text-align: center;
        vertical-align: middle;
        line-height: 40px;
        font-size:12px;
        color: #999;
        padding: 0px 15px;
        max-width: 100px;
        min-width: 60px;
    }

    .chartable tr:first-child td{
        font-family: SlatePro-Medium;
	    font-size: 14px;
        text-transform: capitalize;
        color: #222222;
        background-color: #f5f5f5;
    }

    .chartable td:first-child {
        font-family: SlatePro-Medium;
	    font-size: 14px;
        color: #222222;
        background-color: #f5f5f5;
    }

    .picture-show{
        width: 100%;
    }
    .t-red{
        font-size: 16px;
        color: #222;
        line-height: 19px;
        margin-bottom: 6px;
        text-transform: capitalize;
        font-weight: bold;
    }
    .tipArea{
        p{
            font-size: 14px;
            color: #666;
        }
        h4{
            text-transform:capitalize;
        }
    }
    ul{
        padding: 0;
    }
    li{
        list-style: none;
    }

    .tit_ {
        font-size: 16px;
        color: #222;
        line-height: 19px;
        margin-bottom: 6px;
        text-transform: capitalize;
        font-weight: bold;
    }

    .con_ {
        font-size: 14px;
        color: #666;
        line-height: 20px;
    }
    .conicon {
        margin-bottom: 11px;
    }

    ._t {
        font-weight: bold;
        color: #111;
    }
    
</style>

<script type="es6">
    import { getData } from '../../../data/msite/index.js'

    import sizeBwh from '../../../data/sizeBwh.js'

    import SizeDetailMsite from '../../components/size-detail-msite.vue'

    export default {
        name: 'mIndex',
        components: {
            SizeDetailMsite
        },
        data(){
            return {
                result:[],
                sizeArr:[],
                sizeMethod:[],
                changeArr:[],
                getSize:[],
                label:[],
                imgSrc:'',
                selected:'',
                picked:'1',
                isActive:false,
                pmethod:[],
                objName:[],
                model:{},
                scrollActive:true,
                sizename:"size",
                fitStr:{
                    "fitType":"0",
                    "stretch":"0"
                },
                isMeasureActive:false,
                isMeasureBodyActive:false,
                bwhSize:"XS",
            }
        },
        computed: {
            getLang(){
                if(window.locale && (window.locale ==='de_DE' || window.locale === 'es_ES')){
                    return 'EU'
                }else if(window.locale && window.locale ==='en_GB'){
                    this.picked='0';
                    this.isActive = true;
                    return 'UK'
                }else if(window.locale && window.locale ==='pt_BR'){
                    return 'BR'
                }else if(window.locale && window.locale ==='en_CA'){
                    this.picked='0';
                    this.isActive = true;
                    return 'CA'
                }else if(window.locale && window.locale ==='fr_FR'){
                    return 'FR'
                }else {
                    this.picked='0';
                    this.isActive = true;
                    return 'US'
                }
            },
            //生成表格头中【Bust,Waist,...】
            getLabel(){
                let arr = [];
                let num = 0;
                let index = 0;
                for (let i=0;i<this.result.length;i++){
                    if(typeof this.result[i][2] === 'object'){
                        let count = 0;
                        for(let j in this.result[i][2][0]){
                            count++
                        }
                        if(count > num){
                            index  = i;
                            num = count;
                        }
                    }
                }
                if(this.result[index]){
                    // console.log("this.result[index][2][0]",this.result[index][2]);
                    var i = 0;
                    for(var item in this.result[index][2][0]){
                        if(item === 'unit' || item==='unidad' || item==='Einheit' || item==='Unité' || item==='unidade' || item==='enhet' 
                        || item==='enhed' || item==='enhet' || item==='eining' || item==='yksikkö'){
                            continue;
                        }
                        this.objName.push(item);
                        i += 1;
                    }
                    // console.log(this.objName);
                    return this.result[index][2][0]
                }
            },
            //生成下拉列表中选项【Size(US),....】
            getSizeMethod(){
                for (let i=0;i<this.result.length;i++){
                    if(typeof this.result[i][1] === 'object'){
                        return this.result[i][1]
                    }
                }
            },
            getChangeArr(){
                for (let i=0;i<this.result.length;i++){
                    if(typeof this.result[i][2] === 'object'){
                        return this.result[i][2]
                    }
                }
            },
            getDataArr(){
                let lastArr = [];
                for(let i = 0; i< this.result.length;i++){
                    let obj=[];
                    for(let j in this.getLabel){
                        if(j!=='unit' && j!=='unidad' && j!=='Einheit' && j!=='Unité' && j!=='unidade' && j!=='enhet' && j!=='enhed' && j!=='enhet' && j!=='eining' && j!=='yksikkö'){
                            if(this.result[i][2]){
                                let currVal = this.result[i][2][this.picked];
                                if(currVal[j]){
                                    obj.push(currVal[j])
                                }else{
                                    obj.push('-')
                                }
                            }else{
                                obj.push('-')
                            }
                        }
                    }
                    lastArr.push([this.result[i],[...obj]])
                }
                return lastArr
            },
            ifShoe(){
                if(this.pmethod[0]==='shoes'){
                    return true
                }
            },
            getShoeSize(){
                if(this.result){
                    return this.result
                }
            },
            getShoeLabel(){
                if(this.result[0]){
                    return this.result[0][1]
                }
            },
            getBwhMessage:function(){
                return sizeBwh['sizeBwh'][this.bwhSize][this.picked];
            }
        },
        beforeRouteEnter(to, from, next) {
            store.dispatch('init').then(() => {
                next();
            })
        },
        mounted() { 
            this.getData();
        },
        methods:{
            getData() {
                getData(window.productId).then(dataMap => {
                    if(dataMap){
                        this.result = dataMap['result']
                        this.pmethod = dataMap['pMethod']

                        this.imgSrc = dataMap['imgSrc'];

                        this.fitStr = dataMap['fitStr'];
                    }else{
                        return;
                    }
                    
                })
                // this.result = DataMap['result'];
                // this.pmethod = DataMap['pMethod'];
                // this.imgSrc = DataMap['imgSrc'];
                this.selected=this.getLang; 
            },
            changeMethod(method){
                this.picked = method;
                this.isActive = !this.isActive;
            },
            scorllTo:function(scroll){
                if(scroll === "model"){
                    this.scrollActive = true;
                }else{
                    this.scrollActive = false;
                }
            }
        }
    };
</script>
