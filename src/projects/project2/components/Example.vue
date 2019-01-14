<template>
  <div>
   this is Example.
  </div>
</template>

<script>
  export default {
    created () {
      this.$emit('test','哈哈哈哈哈')
    },
    mounted(){
      this.$on('test',(msg)=>{
        console.log('msg ===')
        console.log(msg)
      })
    },
    data () {
      return {
        message: 'hello!'
      }
    },
  }
</script>
