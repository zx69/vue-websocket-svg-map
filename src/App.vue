<template>
  <div id="app">
    <Monitor></Monitor>
  </div>
</template>

<script>
import Monitor from '@/views/Monitor';

export default {
  name: 'app',
  components: {
    Monitor,
  },
  created(){
  }
};
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  text-align center
  color #2c3e50
  margin-top 60px
</style>
