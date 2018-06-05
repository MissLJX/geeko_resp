<template>
    <div class="st-me">
       {{me.email}}
    </div>
</template>

<style scoped lang="scss">
    .st-me{
        color: red;
    }
</style>

<script>
  import store from '../store'
  import { mapGetters } from 'vuex'

  export default {
    name: 'index',
    computed: {
      ...mapGetters([
        'me'
      ])
    },
    beforeRouteEnter(to, from, next){
      store.dispatch('init').then(() => {
        next();
      })
    }
  };
</script>

