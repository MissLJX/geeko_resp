<template>
    <div class="animation-input">
        <label 
            :for="label" 
            :class="{'focus-scale' : isActive || mouseActive}"
        >{{title}}</label>
        <input 
            type="text" 
            :id="label" 
            @blur="mouseScale('mouseScale','blur')" 
            @focus="mouseScale('mouseScale','focus')"
            @input="$emit('update:inputValue',$event.target.value);"
            :value="inputValue"
        />
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {
        name:"AnimationInput",
        props:['inputValue','label','title'],
        data(){
            return {
                isActive:false
            }
        },
        methods:{
            mouseScale(name,type){
                if(name == "mouseScale"){
                    if(type == "focus"){
                        this.isActive = true;
                    }else{
                        this.isActive = false;
                    }
                }
            }
        },
        computed:{
            mouseActive:function(){
                return (this.inputValue && this.inputValue != null);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .animation-input{
        & > label{
            font-family: SlatePro;
            font-size: 14px;
            color: #666666;
            position: absolute;
            left: 0;
            top: 10px;
            transform: scale(1) translate(0, 0);
            transition: all .1s linear;
            z-index: 1;
            text-transform: uppercase;
        }

        & > input{
            width: 100%;
            border: none;
            border-bottom: 1px solid #e6e6e6;
            outline: none;
            box-shadow: none;
            font-family: SlatePro;
            color: #222222;
            font-size: 16px;
            padding: 8px 5px 5px 0px;
        }

        & .focus-scale{
            transform: scale(1) translate(0, -25px);
            color: #999999;
        }
    }
</style>