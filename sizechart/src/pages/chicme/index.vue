<template>
    <div class="mainArea">
        <div class="close">
            <i class="iconfont">&#xe69a;</i>
        </div>
        <div style="text-align: center; font-weight: bold; padding-top: 21px; font-size: 18px;">{{$t('label.size_chart')}}</div>
        <div class="selectArea" v-show="!ifShoe">
            <div class="sizeSelect">
                <span>{{$t('label.sizeconversation')}}</span>
                <select v-model="selected">
                    <option v-for="(option,label) in getSizeMethod">
                        Size({{label}})
                    </option>
                </select>
            </div>
            <div class="unitSelect">
                <div>
                    <input type="radio" id="in" value="0" v-model="picked">
                    <label for="in"></label>
                    <span>{{$t('label.inches')}}</span> 
                </div>
                <div>
                    <input type="radio" id="cm" value="1" v-model="picked">
                    <label for="cm"></label>
                    <span>{{$t('label.centimeters')}}</span>
                </div>
            </div>
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
                <table class="chartable" v-if="!ifShoe">
                    <tbody>
                        <tr>
                            <td>{{$t("label.size")}}</td>
                            <td>{{selected}}</td>
                            <td v-for="item in objName">{{item}}</td>
                        </tr>

                        <tr v-for="item in getDataArr">
                            <td>{{item[0][0]}}</td>
                            <td>{{item[0][1][selected.substring(5,7)]}}</td>
                            <td v-for="item2 in item[1]">{{item2}}</td>
                        </tr>
                    </tbody>
                </table>

                <table class="chartable" v-if="ifShoe">
                    <tbody>
                    <tr>
                        <th colspan="2" v-for="(key,val) in getShoeLabel" v-bind:class="{currLocal:val===getLang }">
                            {{val}}
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
            <div v-if="isMeasureActive">
                <div class="con_">{{$t('message.measurements')}}</div>
                <size-detail :pmethod="pmethod[0]" :imgSrc="imgSrc"></size-detail>
            </div>
        </div>

        <model-size-fit-pc :model="model" :active="picked" v-if="Object.keys(model).length > 0"></model-size-fit-pc>

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

        <div class="topArea" v-if="!ifShoe">
            <div class="measure-size" @click="isMeasureBodyActive = !isMeasureBodyActive">
                <span>{{$t('message.measure_body_size')}}</span>
                <span class="iconfont" :class="{'active' : isMeasureBodyActive}">&#xe692;</span>
            </div>
            <div v-if="isMeasureBodyActive" class="_bwh">
                <div class="_img">
                    <div>
                        <div style="margin-bottom: 15px">
                            <div class="img_t">
                                <span>1</span>
                                <span>{{ $t("label.bust") }}</span>
                            </div>

                            <div class="img_c">
                                {{$t('message.measure_body_size_bust')}}
                            </div>
                        </div>
                        <div style="margin-bottom: 15px">
                            <div class="img_t">
                                <span>2</span>
                                <span>{{ $t("label.waist") }}</span>
                            </div>

                            <div class="img_c">
                                {{$t('message.measure_body_size_waist')}}
                            </div>
                        </div>
                        <div style="margin-bottom: 15px">
                            <div class="img_t">
                                <span>3</span>
                                <span>{{ $t("label.hip") }}</span>
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
</template>

<script type="es6">
    // import DataMap from '../../data/index.js'
    import { getData } from '../../../data/pc/index.js'

    import SizeDetail from '../../components/size-detail.vue'

    import PictureShow from '../../components/picture-show.vue'
    import ImageDATA from '../../../data/image.js'

    import sizeBwh from '../../../data/sizeBwh.js'

    import ModelSizeFitPc from "../../components/model-size-fit-pc.vue";


    export default {
        name: 'index',
        components: {
            PictureShow,
            SizeDetail,
            "model-size-fit-pc":ModelSizeFitPc
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
                isActive:'true',
                pmethod:'',
                objName:[],
                message:"",
                isMeasureActive:false,
                isMeasureBodyActive:false,
                bwhSize:"XS",
                fitStr:{},
                model:{}
            }
        },
        computed: {
            getLang(){
                console.log(window.locale)
                if(window.locale && (window.locale ==='de_DE' || window.locale === 'es_ES')){
                    return 'EU'
                }else if(window.locale && window.locale ==='en_GB'){
                    this.picked='0';
                    return 'UK'
                }else if(window.locale && window.locale ==='pt_BR'){
                    return 'BR'
                }else if(window.locale && window.locale ==='en_CA'){
                    this.picked='0';
                    return 'CA'
                }else if(window.locale && window.locale ==='fr_FR'){
                    return 'FR'
                }else {
                    this.picked='0';
                    return 'US'
                }
            },
            //生成表格头中【Bust,Waist,...】
            getLabel(){
                let arr = [];
                let num = 0;
                let index = 0;
                console.log("this.result",this.result);
                for (let i=0;i<this.result.length;i++){
                    if(typeof this.result[i][2] === 'object'){
                        let count = 0;
                        // 遍历表头有几个属性记录
                        for(let j in this.result[i][2][0]){
                            count++
                        }
                        if(count > num){
                            index  = i;
                            num = count;
                        }
                    }
                }
                console.log("index",index);
                // 最少有一个尺码
                if(this.result[index]){
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
            // getChangeArr(){
            //     for (let i=0;i<this.result.length;i++){
            //         if(typeof this.result[i][2] === 'object'){
            //             return this.result[i][2]
            //         }
            //     }
            // },
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
            // this.getLocalMessage(this.pmethod[0]);
        },
        methods:{
            getData() {
                // this.result = DataMap['result'];
                // this.pmethod = DataMap['pMethod'];
                // console.log("this.pmethod",this.pmethod);
                // console.log(this.pmethod[0]);
                
                // console.log("this.imgSrc",this.imgSrc);
                this.selected='Size('+this.getLang+')';

                
                getData(window.productId).then(dataMap => {
                    if(dataMap){
                        this.result = dataMap['result']
                        this.pmethod = dataMap['pMethod']
                        this.imgSrc = ImageDATA.imgDataPc[this.pmethod[0]]
                        this.fitStr = dataMap['fitStr'];

                        this.model = dataMap['modelStature'];
                    }else{
                        return;
                    }
                })
                
            }
        }
    };
</script>

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

    @font-face {
    font-family: 'iconfont';  /* Project id 384296 */
    src: url('//at.alicdn.com/t/font_384296_47cj6px3rdv.woff2?t=1628055254161') format('woff2'),
        url('//at.alicdn.com/t/font_384296_47cj6px3rdv.woff?t=1628055254161') format('woff'),
        url('//at.alicdn.com/t/font_384296_47cj6px3rdv.ttf?t=1628055254161') format('truetype');
    }
    .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    }

    @font-face {
        font-family: 'SlatePro';
        src: url('https://s3.geeko.ltd/fonts/Roboto-Regular.ttf');
        font-display: swap;
    }

    @font-face {
        font-family: 'SlatePro-Medium';
        src: url('https://s3.geeko.ltd/fonts/Roboto-Medium.ttf');
        font-display: swap;
    }


    @font-face {
        font-family: 'AcuminPro-Bold';
        src: url('https://s3.geeko.ltd/fonts/Roboto-Bold.ttf');
        font-display: swap;
    }

    .mainArea{
        width: 528px;
        height: auto;
        margin: 0 auto;
        padding: 0 20px;
        position: relative;
        font-family: SlatePro,"Open Sans",Arial,"Helvetica Neue",Helvetica,sans-serif;
        padding-bottom: 30px;

        .fit-types{
            margin-bottom: 30px;
            ._title{
                font-family: SlatePro-Medium;
                font-size: 18px;
                color: #000000;
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

        .body-measure{
            ._title{
                font-family: SlatePro-Medium;
	            font-size: 18px;
                color: #000000;
                margin-top: 15px;
            }
            ._size{
                margin: 10px 0px;
                & > span{
                    height: 30px;
                    line-height: 30px;
                    border-radius: 15px;
                    width: 66px;
                    display: inline-block;
                    color: #000000;
                    font-family: SlatePro;
	                font-size: 14px;
                    border: solid 1px #000000;
                    margin-left: 10px;
                    text-align: center;
                    cursor: pointer;
                }

                & > span:first-child{
                    margin-left: 0px;
                }

                .active{
                    background-color: #000000;
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
	                font-size: 12px;
                    color: #000000;
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

    .tableArea{
        margin-top: 10px;
        width: 100%;

        ._title{
            font-family: SlatePro-Medium;
	        font-size: 18px;
            color: #000000;
            margin-bottom: 10px;
        }

        ._message{
            font-family: SlatePro;
            font-size: 12px;
            color: #999999;
            margin-top: 10px;
        }

        ._utable{
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            width: 100%;
            overflow-y: visible!important;
            overflow-x: auto;
            padding-bottom: 5px;

            &::-webkit-scrollbar {
			    width: 6px;
			    height: 6px;
			}
	    	
			/*滑块*/
			&::-webkit-scrollbar-thumb {
			  background-color: #eee;
			  border-radius: 10px;
			}
			
			&::-webkit-scrollbar-thumb:hover {
			  background-color: #ccc;
			}
        }
    }
    .currLocal{
        background-color: #f5f5f5 !important;
        color: #222222 !important;
        font-family: SlatePro-Medium;
    }
    .topArea{
        margin-top: 20px;
        border-top: solid 1px #eeeeee;
        border-bottom: solid 1px #eeeeee;
        &::after{
            display: block;
            content: '';
            clear: both;
        }

        .measure-size{
            height: 56px;
            line-height: 56px;
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
                -webkit-transition: all .3s ease;
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
                    color: #000000;

                    & span {
                        display: inline-block;
                        &:first-child {
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            border-radius: 50%;
                            background-color: #111;
                            color: #fff;
                            text-align: center;
                            line-height: 16px;
                            font-size: 14px;
                            margin-right: 10px;
                            font-weight: normal;
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
    }
    .chartable{
        width: 100%;
        border-collapse: collapse;
        cursor: pointer;
    }
    .chartable th{
        border: 1px solid #d6d6d6;
        text-align: center;
        vertical-align: middle;
        line-height: 40px;
        background-color: #f5f5f5;
        color: #222222;
        font-family: SlatePro-Medium;
        font-size: 14px;
    }
    .selectArea{
        display: block;
        content: '';
        clear: both;
        height: 40px;
        line-height: 40px;
        margin-top: 50px;
        margin-bottom: 15px;
    }
    .sizeSelect{
        float: right;
        span{
            font-size: 13px;
            color: #20282f;
            font-weight: bold;
        }
        select{
            width: 87px;
            height: 23px;
        }
        option{
            &:checked{
                color: #e5004f;
            }
            &:hover{
                cursor: pointer;
                color: green;
            }
        }
    }
    .unitSelect{
        float: left;
        div {
            position: relative;
            line-height: 30px;
            float: left;
            margin-left: 10px;
        }

        input[type="radio"] {
            width: 20px;
            height: 20px;
            opacity: 0;
            cursor: pointer;
        }

        label {
            position: absolute;
            left: 5px;
            top: 7px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid #999;
            cursor: pointer;
        }
        input:checked+label {
            background-color: black;
            border: 1px solid black;
        }

        input:checked+label::after {
            position: absolute;
            content: "";
            width: 5px;
            height: 10px;
            top: 3px;
            left: 7px;
            border: 2px solid #fff;
            border-top: none;
            border-left: none;
            transform: rotate(45deg)
        }
    }

    .chartable td{
        border: 1px solid #e0e0e0;
        text-align: center;
        vertical-align: middle;
        line-height: 40px;
        font-size:14px;
        color: #666666;
        padding: 0px 10px;
        max-width: 100px;
    }

    .chartable tr:first-child td{
        font-family: SlatePro-Medium;
	    font-size: 12px;
        text-transform: capitalize;
        color: #000000; 
    }

    .chartable td:first-child {
        font-family: SlatePro-Medium;
        font-size: 12px;
        color: #000000;
        background-color: #f5f5f5;
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
        font-size: 12px;
        color: #4a4a4a;
        line-height: 20px;
    }
    .conicon {
        margin-bottom: 11px;
    }

    ._t {
        font-weight: bold;
        color: #111;
    }


    .close i {
        font-size: 18px;
    }

    .close {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }
</style>
