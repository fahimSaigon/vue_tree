<template>
  <div class="about">
    <h1> {{clktip}} </h1>

        <div class="content"></div>


  </div>
</template>

<script>
import dt from "../assets/flare-2.json";
import * as d3 from "d3";
 
export default {
  name: "About",
  data() {
    return {
      msg: {},
      clktip: '--'
    };
  },

  created() {
    this.msg = dt;

    this.treex();
   
  },
  mounted() {

   
    var width = window.screen.width;
    let data = dt;
    var tree = (data) => {
      const root = d3.hierarchy(data);
      root.dx = 40;
      root.dy = width / (root.height + 1);
      return d3.tree().nodeSize([root.dx, root.dy])(root);
    };
    // attach chart to HTML body
    d3.select(".content").append(() => this.chart(tree, data, width));
  },

  methods: {
    treex() {
      console.log(this.msg);
    },

    chart(tree, data, width) {

      let that = this;
      const root = tree(data);

      let x0 = Infinity;
      let x1 = -x0;

      root.each((d) => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
      });

      const svg = d3
        .create("svg")
        .attr("viewBox", [0, 0, width, x1 - x0 + root.dx * 3]);

      const g = svg
        .append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 20)
        .attr("transform", `translate(${root.dy / 9},${root.dx - x0})`);
        

      const link = g
        .append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5)
        .selectAll("path")
        .data(root.links())
        .join("path")
        .attr(
          "d",
          d3
            .linkHorizontal()
            .x((d) => d.y)
            .y((d) => d.x)
        );

      console.log(link);

      const node = g
        .append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .selectAll("g")
        .data(root.descendants())
        .join("g")
        .attr("transform", (d) => `translate(${d.y},${d.x})`)
        .attr("cursor", "pointer")
        .attr("pointer-events", "all");

      node
        .append("circle")
        .attr("fill", (d) => (d.children ? "#555" : "#999"))
        .attr("r", 2.5);

      node
        .append("text")
        .attr("dy", "0.31em")
        .attr("x", (d) => (d.children ? -6 : 6))
        .attr("text-anchor", (d) => (d.children ? "end" : "start"))
        .text((d) => d.data.name + " (" + d.data.name.length + ")")
        .on("click",function(d){
          console.log(d)
          console.log(d.target.childNodes[0].data)
          that.clktip = d.target.childNodes[0].data;
        })
        .clone(true)
        .lower()
        .attr("stroke", "white");
        
      


      return svg.node();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

svg g:hover{
  color: red;
}
</style>