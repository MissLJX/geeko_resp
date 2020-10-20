<template>
    <div class="mainArea">
        <div class="selectArea" v-show="!ifShoe">
            <div v-bind:class="{ active: isActive }" @click="changeMethod(0)">{{$t('label.inches')}}</div>
            <div v-bind:class="{ active: !isActive }" @click="changeMethod(1)">{{$t('label.centimeters')}}</div>
            <select v-model="selected">
                <option v-for="(option,label) in getSizeMethod">
                    {{label}}
                </option>
            </select>
        </div>
        <div class="tableArea">
            <table class="chartable" v-show="!ifShoe">
                <tbody>
                <tr>
                    <td>{{$t('label.size')}}</td>
                    <td v-for="item in getDataArr">{{item[0][0]}}</td>
                </tr>
                <tr>
                    <td>{{$t('label.size')}} ({{selected}})</td>
                    <td v-for="item in getDataArr">{{item[0][1][selected]}}</td>
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

        <div class="tipArea">
            <div class="tit_">{{$t('label.itemmeasurements')}}</div>
            <div class="con_">{{$t('message.measurements')}}</div>

            <div class="_img">
                <div style="margin: 25px 0px; width: 100%; text-align: center;">
                    <img v-bind:src="imgSrc[0]" style="width: 237px;">
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
        width: 100%;
        padding-top: 15px;
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
        background-color: black !important;
        color: white !important;
    }

    .chartable{
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 30px;
        table-layout: fixed;
    }
    .chartable th{
        border: 1px solid #e0e0e0;
        text-align: center;
        vertical-align: middle;
        line-height: 40px;
        background-color: #f3f3f3;
        font-size: 14px;
        color: #666;
    }
    .chartable td{
        border: 1px solid #e0e0e0;
        text-align: center;
        vertical-align: middle;
        line-height: 40px;
        font-size:12px;
        color: #999;
    }

    .chartable tr:nth-child(even) td{
        background-color: #f5f5f5;
    }

    .chartable tr:first-child td{
        font-weight: bold;
        text-transform: capitalize;
        color: #222;
        font-size:13px;
    }

    .chartable td:first-child {
        font-weight: bold;
        font-size: 13px;
        color: #111;
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
        font-size: 14px;
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
    
</style>

<script type="es6">
    import store from '../store'
    import { mapGetters } from 'vuex'
    // import DataMap from '../../data/index.js'

    import { getData } from '../../data/index.js'

    import WarmPrompt from '../components/warm-prompt.vue'
    import PictureShow from '../components/picture-show.vue'


    export default {
        name: 'mIndex',
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
                isActive:false,
                pmethod:[],
                objName:[]
            }
        },
        computed: {
            ...mapGetters([
                'me'
            ]),
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
        },
        methods:{
            getData() {
                getData(window.productId).then(dataMap => {
                    if(dataMap){
                        this.result = dataMap['result']
                        this.pmethod = dataMap['pMethod']
                   
                        this.imgSrc = dataMap['imgSrc'];
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
            }
        }
    };
</script>
