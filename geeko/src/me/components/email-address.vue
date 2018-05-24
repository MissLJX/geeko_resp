<template>
    <div class="emailAddress">
        <p>Email Address</p>
        <input type="text">
    </div>
</template>

<script>
    export default {
        name: "email-address.vue"
    }
</script>

<style scoped>
    .emailAddress{
        width: 85%;
        margin: 10px auto;
        padding-bottom: 30px;
    }
    p{
        font-size: 18px;
        color: #222;
        margin-bottom: 10px;
    }
    input{
        width: 100%;
        height:40px ;
    }
/*        p{
            width: 85%;
            margin: 0 auto;
            text-align: left;
            color: #222;
            font-size: 28px;
        }
        input{
            width: 85%;
            margin: 0 auto;
        }*/
</style>