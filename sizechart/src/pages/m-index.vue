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
                    <th colspan="2">Tag Size</th>
                    <th colspan="2">{{selected}}</th>
                    <th colspan="2" v-for="(key,val) in getLabel" v-if="val!=='unit'">
                        {{ val }}
                    </th>
                </tr>
                <tr v-for="item in getDataArr">
                    <td colspan="2">{{item[0][0]}}</td>
                    <td colspan="2">{{item[0][1][selected]}}</td>
                    <td colspan="2" v-for="i in item[1]">{{i}}</td>
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
            <ul>
                <li>
                    <h4>{{$t('label.itemmeasurements')}}:</h4>
                    <p>{{$t('message.measurements')}}</p>
                </li>
                <li>
                    <picture-show :imgSrc="imgSrc[0]"></picture-show>
                </li>
                <li>
                    <h4 class="t-red">{{$t('label.pleasenote')}}:</h4>
                    <p class="mb8">1.{{$t('message.note1')}}</p>
                    <p>2.{{$t('message.note2')}}</p>
                </li>
                <li>
                    <h4 class="t-red">{{$t('label.disclaimer')}}</h4>
                    <p>{{$t('message.disclaimer')}}</p>
                </li>
            </ul>
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
            background-color: #f3f3f3;
            color: #666;
            line-height: 33px;
            text-align: center;
            font-size: 15px;
            padding: 0 10px;
            cursor: pointer;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        }
        .active{
            background-color: #e5004f;
            color: white;
        }
        select{
            float: right;
            border: none;
            height: 33px;
            line-height: 33px;
            cursor: pointer;
        }
        &:after{
            display: block;
            content: '';
            clear: both;
            text-align: center;
        }
    }
    .currLocal{
        background-color: #e5004f !important;
        color: white !important;
    }

    .chartable{
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 30px;
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
    }
    .picture-show{
        width: 100%;
    }
    .t-red{
        color: #e5004f;
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
</style>

<script type="es6">
    import store from '../store'
    import { mapGetters } from 'vuex'
    import DataMap from '../../data/index.js'

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
                pmethod:[]
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
                        if(j!=='unit'){
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
                this.result = DataMap['result'];
                this.imgSrc = DataMap['imgSrc'];
                this.pmethod = DataMap['pMethod'];
                this.selected=this.getLang;
            },
            changeMethod(method){
                this.picked = method;
                this.isActive = !this.isActive;
            }
        }
    };
</script>
