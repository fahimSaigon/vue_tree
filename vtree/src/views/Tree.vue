<template>
  <div class="home">
    {{ msg }}

    <div id="main"></div>
    
  </div>
</template>

<script>
 import data from '../assets/flare-2.json'
 import * as echarts from 'echarts';

export default {
  name: 'Home',
  data(){
    return {
      msg: '--'
    }
  },

  created(){

  
  },
  mounted(){
    this.ok();
  },
  methods: {

    pass(a){

      console.log(a);
      this.msg = a.name;
    },

    ok(){



        // initialize the echarts instance
        var myChart = echarts.init(document.getElementById('main'));
        // Draw the chart
        



           
          let  option = {
            tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove'
            },
            series: [
              {
                type: 'tree',
                data: [data],
                top: '1%',
                left: '7%',
                bottom: '1%',
                right: '20%',
                symbolSize: 7,
                label: {
                  position: 'left',
                  verticalAlign: 'middle',
                  align: 'right',
                  fontSize: 9
                },
                leaves: {
                  label: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
                  }
                },
                emphasis: {
                  focus: 'descendant'
                },
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
              }
            ]
          };

          if(option && typeof option === "object"){

            myChart.setOption(option);
          }

          myChart.on("click", this.pass);
    }
  }
}
</script>
<style>
#main{
  width: 900px;
  height: 2600px;
}
</style>