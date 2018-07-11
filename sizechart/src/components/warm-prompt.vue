<template>
    <div class="tipArea">
        <ul>
            <li>
                <h4>{{$t('label.itemmeasurements')}}:</h4>
                <p>{{$t('message.measurements')}}</p>
            </li>
            <li>
                <h4>{{$t('label.pleasenote')}}:</h4>
                <p class="mb8">1.{{$t('message.note1')}}</p>
                <p>2.{{$t('message.note2')}}</p>
            </li>
            <li>
                <h4>{{$t('label.disclaimer')}}</h4>
                <p>{{$t('message.disclaimer')}}</p>
            </li>
        </ul>
    </div>
</template>

<script type="es6">
    export default {
        name: "warm-prompt"
    }
</script>

<style scoped>
    .tipArea{
        width: 50%;
        float: left;
        margin-top: 30px;
    }
    h4{
        font-size: 20px;
        color: #20282f;
    }
    p{
        font-size: 14px;
        color: #666;
    }
    ul{
        padding: 0;
    }
    li{
        margin-bottom: 24px;
        list-style: none;
    }
    .mb8{
        margin-bottom: 8px;
    }
</style>