<template>
    <div class="mainArea">
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
                    <th colspan="2">Tag Size</th>
                    <th colspan="2">{{selected}}</th>
                    <th colspan="2" v-for="(key,val) in getLabel" v-if="val!=='unit' && val!=='unidad' && val!=='Einheit' && val!=='unité' && val!=='unidade'">
                        {{ val }}
                    </th>
                </tr>
                <tr v-for="item in getDataArr">
                    <td colspan="2">{{item[0][0]}}</td>
                    <td colspan="2">{{item[0][1][selected.substring(5,7)]}}</td>
                    <td colspan="2" v-for="i in item[1]">{{i}}</td>
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
            <warm-prompt></warm-prompt>
            <picture-show :imgSrc="imgSrc[0]"></picture-show>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .mainArea{
        width: 990px;
        height: auto;
        margin: 0 auto;
        border: 1px solid #e3e3e3;
        padding: 0 50px ;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
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
        background-color: #e5004f !important;
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
            font-size: 14px;
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
            margin-left: 15px;
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
            background-color: #e5004f;
            border: 1px solid #e5004f;
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
</style>

<script type="es6">
    import store from '../store'
    import DataMap from '../../data/index.js'
    import WarmPrompt from '../components/warm-prompt.vue'
    import PictureShow from '../components/picture-show.vue'


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
                pmethod:''
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
                        if(j!=='unit' && j!=='unidad' && j!=='Einheit' && j!=='unité' && j!=='unidade'){
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
                this.selected='Size('+this.getLang+')';
            }
        }
    };
</script>
