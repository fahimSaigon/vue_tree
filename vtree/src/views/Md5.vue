<template>
  <div class="home">
    md5
    {{ok}}
  </div>
</template>

<script>
// @ is an alias to /src
 
import MD5  from 'blueimp-md5'
export default {
  name: 'Md5',
   data() {
    return {
       list: [1,2,3,4,5,6,6,7],
       ok: []
    };
  },

  created() {
     
    console.log(MD5("xing cong"))

  },
  mounted() {

    for(let i = 0; i < this.list.length; i++){
      this.ok.push(MD5(this.list[i]))

    }
    console.log(this.ok)

  }
  
}
</script>
