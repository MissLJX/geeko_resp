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
        <div class="tableArea">
            <table class="chartable" v-show="!ifShoe">
                <tbody>
                <tr>
                    <td>{{$t("label.size")}}</td>
                    <td v-for="item in getDataArr">{{item[0][0]}}</td>
                </tr>
                <tr>
                    <td>{{selected}}</td>
                    <td v-for="item in getDataArr">{{item[0][1][selected.substring(5,7)]}}</td>
                </tr>

                <tr v-for="(item,key) in objName">
                    <td v-if="objName[key]!=='unit' && objName[key]!=='unidad' && objName[key]!=='Einheit' && objName[key]!=='Unité' && objName[key]!=='unidade' 
                    && objName[key]!=='enhet' && objName[key]!=='enhed' && objName[key]!=='enhet' && objName[key]!=='eining' && objName[key]!=='yksikkö'">{{objName[key]}}</td>
                    
                    <td v-for="(item,index) in getDataArr">
                        {{item[1][key]}}
                    </td>
                    
                </tr>
                </tbody>
            </table>
            <table class="chartable" v-show="ifShoe">
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
        <div class="topArea">
            <div class="tit_">{{$t('label.itemmeasurements')}}</div>
            <div class="con_">{{$t('message.measurements')}}</div>

            <div class="_img" v-if="pmethod[0] === 'jumpsuits'">
                <div>
                    <div style="margin: 25px 0px; width: 100%; text-align: center;">
                        <img v-bind:src="imgSrc">
                    </div>
                </div>

                <div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>1</span>
                            <span>{{$t("label.waist")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.waist_note")}}
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>2</span>
                            <span>{{$t("label.hip")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.hip_note")}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="_img" v-if="pmethod[0] === 'dress'">
                <div>
                    <div style="margin: 25px 0px; width: 100%; text-align: center;">
                        <img v-bind:src="imgSrc">
                    </div>
                </div>

                <div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>1</span>
                            <span>{{$t("label.bust")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.bust_note")}}
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>2</span>
                            <span>{{$t("label.waist")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.waist_note")}}
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>3</span>
                            <span>{{$t("label.hip")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.hip_note")}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="_img" v-if="pmethod[0] === 'shoes'">
                <div>
                    <div style="margin: 25px 0px; width: 100%; text-align: center;">
                        <img v-bind:src="imgSrc">
                    </div>
                </div>

                <div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>1</span>
                            <span>{{$t("label.length")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.length_note")}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="_img" v-if="pmethod[0] === 'top'">
                <div>
                    <div style="margin: 25px 0px; width: 100%; text-align: center;">
                        <img v-bind:src="imgSrc">
                    </div>
                </div>

                <div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>1</span>
                            <span>{{$t("label.bust")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.bust_note")}}
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>2</span>
                            <span>{{$t("label.waist")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.waist_note")}}
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>3</span>
                            <span>{{$t("label.hip")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.hip_note")}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="_img" v-if="pmethod[0] === 'underwear'">
                <div>
                    <div style="margin: 25px 0px; width: 100%; text-align: center;">
                        <img v-bind:src="imgSrc">
                    </div>
                </div>

                <div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>1</span>
                            <span>{{$t("label.bust")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.bust_note")}}
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>2</span>
                            <span>{{$t("label.waist")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.waist_note")}}
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>3</span>
                            <span>{{$t("label.hip")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.hip_note")}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="_img" v-if="pmethod[0] === 'bathing'">
                <div>
                    <div style="margin: 25px 0px; width: 100%; text-align: center;">
                        <img v-bind:src="imgSrc">
                    </div>
                </div>

                <div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>1</span>
                            <span>{{$t("label.bust")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.bust_note")}}
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>2</span>
                            <span>{{$t("label.hip")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.hip_note")}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="_img" v-if="pmethod[0] === 'bottom'">
                <div>
                    <div style="margin: 25px 0px; width: 100%; text-align: center;">
                        <img v-bind:src="imgSrc">
                    </div>
                </div>

                <div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>1</span>
                            <span>{{$t("label.waist")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.waist_note")}}
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>2</span>
                            <span>{{$t("label.hip")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.hip_note")}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="_img" v-if="pmethod[0] === 'coat'">
                <div>
                    <div style="margin: 25px 0px; width: 100%; text-align: center;">
                        <img v-bind:src="imgSrc">
                    </div>
                </div>

                <div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>1</span>
                            <span>{{$t("label.bust")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.bust_note")}}
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>2</span>
                            <span>{{$t("label.waist")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.waist_note")}}
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>3</span>
                            <span>{{$t("label.hip")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.hip_note")}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="_img" v-if="pmethod[0] === 'onepiece'">
                <div>
                    <div style="margin: 25px 0px; width: 100%; text-align: center;">
                        <img v-bind:src="imgSrc">
                    </div>
                </div>

                <div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>1</span>
                            <span>{{$t("label.bust")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.bust_note")}}
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>2</span>
                            <span>{{$t("label.waist")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.waist_note")}}
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>3</span>
                            <span>{{$t("label.hip")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.hip_note")}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="_img" v-if="pmethod[0] === 'highheels'">
                <div>
                    <div style="margin: 25px 0px; width: 100%; text-align: center;">
                        <img v-bind:src="imgSrc">
                    </div>
                </div>

                <div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>1</span>
                            <span>{{$t("label.waist")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.bust_note")}}
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div class="img_t">
                            <span>2</span>
                            <span>{{$t("label.hip")}}</span>
                        </div>

                        <div class="img_c">
                            {{$t("message.hip_note")}}
                        </div>
                    </div>
                </div>
            </div>


            
            

            <div class="tit_">{{$t('label.pleasenote')}}</div>
            <div class="con_ conicon">
                {{$t('message.note1')}}
            </div>
            <div class="con_ conicon">
                {{$t('message.note2')}}
            </div>
            <div class="con_">
                <span class="_t">{{$t('label.inelastic')}}</span>
                {{$t('message.inelastic_message')}}
            </div>
             <div class="con_">
                <span class="_t">{{$t('label.micro')}}</span>
                {{$t('message.micro_message')}}
            </div>
            <div class="con_">
                <span class="_t">{{$t('label.stretchy')}}</span>
                {{$t('message.stretchy_message')}}
            </div>
            <div class="con_">
                <span class="_t">{{$t('label.high')}}</span>
                {{$t('message.high_message')}}
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

    .mainArea{
        width: 528px;
        height: auto;
        margin: 0 auto;
        padding: 0 20px;
        position: relative;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        padding-bottom: 30px;
    }

    .picture-show{
        width: 50%;
        float: left;
        img{
            width: 400px;
            height: 360px;
        }
    }
    .tableArea{
        margin-top: 10px;
    }
    .currLocal{
        background-color: black !important;
        color: white !important;
    }
    .topArea{
        margin-top: -20px;
        &::after{
            display: block;
            content: '';
            clear: both;
        }
    }
    .chartable{
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 30px;
        cursor: pointer;
    }
    .chartable th{
        border: 1px solid #d6d6d6;
        text-align: center;
        vertical-align: middle;
        line-height: 40px;
        background-color: #f5f5f5;
        color: #666;
    }
    .chartable td{
        border: 1px solid #d6d6d6;
        text-align: center;
        vertical-align: middle;
        line-height: 40px;
    }
    .selectArea{
        display: block;
        content: '';
        clear: both;
        height: 40px;
        margin-top: 50px;
        margin-bottom: 15px;
    }
    .sizeSelect{
        float: left;
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
        float: right;
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
        font-size:12px;
        color: #999;
    }

    .chartable tr:first-child td{
        font-weight: bold;
        text-transform: capitalize;
        color: #666;
        font-size:12px;
    }

    .chartable td:first-child {
        font-weight: bold;
        font-size: 13px;
        color: #111;
        font-size:12px;
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

    ._img img{
        display: flex;
        display: block;
        width: 135px;
        margin-right: 38px;
    }

    ._img{
        padding-top: 15px;
        padding-bottom: 25px;
        display: flex;
        align-items: center;
    }

    .img_t span:first-child {
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

    .img_c {
        font-size: 12px;
        color: #666;
        line-height: 16px;
        padding-top: 8px;
    }

    .img_t{
        text-transform: capitalize;
        font-weight: bold;
    }

    .img_t span {
        display: inline-block;
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

<script type="es6">
    import store from '../../store'


    // import DataMap from '../../data/index.js'
    import { getData } from '../../../data/pc/index.js'



    import WarmPrompt from '../../components/warm-prompt.vue'
    import PictureShow from '../../components/picture-show.vue'
    import ImageDATA from '../../../data/image.js'


    export default {
        name: 'index',
        components: {
            WarmPrompt,
            PictureShow
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
                message:""
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
                // 最少有一个尺码
                if(this.result[index]){
                    var i = 0;
                    for(var item in this.result[index][2][0]){
                        if(item === 'unit' || item==='unidad' || item==='Einheit' || item==='Unité' || item==='unidade' || item==='enhet' 
                        || item==='enhed' || item==='enhet' || item==='eining' || item==='yksikkö'){
                            continue;
                        }
                        this.objName[i] = item;
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
                    }else{
                        return;
                    }
                })
                
            },
            // getLocalMessage(value){
                
            // }
        }
    };
</script>
