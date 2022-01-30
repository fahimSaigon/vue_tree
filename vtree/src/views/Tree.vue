<template>
  <div class="home">
    
    <div v-if="popshow"  id="popup"   v-bind:style="styleObject"> {{ msg }} </div>
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
      msg: '--',
      styleObject: {
        left: "0px",
        top: "0px"
      },
      popshow: false,
      nodeindex: null,
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
      if(a){
        this.styleObject.left = a.event.offsetX  + "px";
        this.styleObject.top = a.event.offsetY + "px";
      }
      if(this.nodeindex === a.dataIndex){
        this.popshow = false;
        this.nodeindex = null;
      }else{
        this.popshow = true;
        this.nodeindex = a.dataIndex;
      }
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
                top: '2%',
                left: '7%',
                bottom: '12%',
                right: '20%',
                symbolSize: 17,
                edgeShape: "polyline",
                label: {
                  position: 'left',
                  verticalAlign: 'middle',
                  align: 'right',
                  fontSize: 19
                },
                leaves: {
                  label: {
                    position: 'right',
                    verticalAlign: 'middle',
                    distance: 25,
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
  width: 100%;
  height: 100%;
  overflow: auto;
  min-height:  2900px;
}
#popup{
  position: absolute;
  background: #ffffff;
  box-shadow: 4px 4px 4px #e2e2e2;
  padding: 25px;
  z-index: 999;
  border: 1px solid #e2e2e2;
}
</style>