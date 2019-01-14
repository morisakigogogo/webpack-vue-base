<template>
  <div id="project1">
    <h2>{{project}}</h2>
    <div :class="$style.pink">this is {{msg}} pink.</div>
    <h2 class="a">this is less a.<p :class='a.red'>this is {{msg}} a</p></h2>
    <p :class='b.green'>this is {{msg}} b</p>
      focus: <input type="text" v-focus>
      <Example />
  </div>
</template>

<script>
import Example from '@com/Example';

export default {
  data(){
    return {
      project: 'this page project1',
      msg: 'css module'
    }
  },
  directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      console.log(el)
      el.focus()
    }
  },
},
  mounted () {
    console.log(this.$style)
    console.log(this.b)
    console.log(this.a)
  },
  components: {
      Example
  }
}
</script>
<style module>
  .pink{
    color: pink;
  }
</style>
<style module="a">
  /* identifiers injected as a */
.red {
  color: red;
}
.bold {
  font-weight: bold;
}
</style>

<style module="b">
  /* identifiers injected as b */
  .green{
    color: green;
  }
</style>

<style lang="less">
@color: blue;
h2{
  font-size: 18px;
  text-align: center;
  .a{
    color: @color;
    font-size: 22px;
    font-weight: bold;
  }
}
</style>
