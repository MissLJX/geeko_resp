<template>
    <div>
        <div class="selectArea">
            <div v-bind:class="{ active: isActive }" @click="changeSize('in')">{{$t('label.inches')}}</div>
            <div v-bind:class="{ active: !isActive }" @click="changeSize('cm')">{{$t('label.centimeters')}}</div>
        </div>

        <div class="tableArea">
            <table class="chartable" v-show="isActive">
                <tbody>
                    <tr>
                        <td>{{$t('label.model')}}</td>
                        <td v-for="(item,index) in model.modelListOnCm">{{item.name}}</td>
                    </tr>
                    <tr>
                        <td>{{$t('label.height')}}</td>
                        <td v-for="(item,index) in model.modelListOnCm">{{item.height}}</td>
                    </tr>
                    <tr>
                        <td>{{$t('label.bust')}}</td>
                        <td v-for="(item,index) in model.modelListOnCm">{{item.bust}}</td>
                    </tr>
                    <tr>
                        <td>{{$t('label.waist')}}</td>
                        <td v-for="(item,index) in model.modelListOnCm">{{item.waist}}</td>
                    </tr>
                    <tr>
                        <td>{{$t('label.hips')}}</td>
                        <td v-for="(item,index) in model.modelListOnCm">{{item.hip}}</td>
                    </tr>
                    <tr>
                        <td>{{$t('label.size_guide')}}</td>
                        <td v-for="(item,index) in model.modelListOnCm">{{item.wear}}</td>
                    </tr>
                </tbody>
            </table>

            <table class="chartable" v-show="!isActive">
                <tbody>
                    <tr>
                        <td>{{$t('label.model')}}</td>
                        <td v-for="(item,index) in model.modelListOnInch">{{item.name}}</td>
                    </tr>
                    <tr>
                        <td>{{$t('label.height')}}</td>
                        <td v-for="(item,index) in model.modelListOnInch">{{item.height}}</td>
                    </tr>
                    <tr>
                        <td>{{$t('label.bust')}}</td>
                        <td v-for="(item,index) in model.modelListOnInch">{{item.bust}}</td>
                    </tr>
                    <tr>
                        <td>{{$t('label.waist')}}</td>
                        <td v-for="(item,index) in model.modelListOnInch">{{item.waist}}</td>
                    </tr>
                    <tr>
                        <td>{{$t('label.hips')}}</td>
                        <td v-for="(item,index) in model.modelListOnInch">{{item.hip}}</td>
                    </tr>
                    <tr>
                        <td>{{$t('label.size_guide')}}</td>
                        <td v-for="(item,index) in model.modelListOnInch">{{item.wear}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="note">
            <div>{{$t('label.pleasenote')}}:</div>
            <div>{{model.note}}</div>
        </div>
    </div> 
</template>

<script>
export default {
    name:"model-stature",
    props:{
        model:{
            type: Object,
        }
    },
    data(){
        return {
            isActive:true
        }
    },
    methods:{
        changeSize:function(index){
            if(index === 'in'){
                this.isActive = true;
            }else{
                this.isActive = false;
            }
        }
    }
}
</script>

<style scoped lang="scss">
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
        
        &:after{
            display: block;
            content: '';
            clear: both;
            text-align: center;
        }
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
        text-transform: capitalize;
    }

    .note{
        & > div:first-child{
            font-family: SlatePro-Medium;
	        font-size: 16px;
            color: #222222;
            text-transform: capitalize;
        }

        & > div:last-child{
            font-family: SlatePro;
            color: #666666;
            font-size: 14px;
            margin-top: 5px;
        }
    }
</style>