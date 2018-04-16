<template>
    <div class="v-list-product">
        list product
    </div>
</template>

<script>


  import * as api from './api/shoppable'
  export default {
    name: 'list-product',
    data:{

    },
    beforeMount(){
        api.getproducts(0 , 20).then((result) => {
          console.log(result)
        })
    }
  };
</script>

<style scoped>
    .v-list-product{
        color: red;
    }
</style>
