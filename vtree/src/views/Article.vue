<template>
  <div v-if="data">
    <h1>{{ data.title }}</h1>
    <div v-html="data.content"></div>
    <img :src="data.cover_image_url" alt=""/>
  </div>
</template>
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      data: null,
    };
  },
  created() {
    if (this.$route && this.$route.query && this.$route.query.id) {
      console.log(this.$route.query.id);
      this.article(this.$route.query.id);
    }
  },
  methods: {
    article(id) {
      console.log(id);

      let token = localStorage.getItem("token");
      this.articleslists = [];
      let that = this;
      fetch("/api/v1/articles/" + id + "?token=" + token, {
        method: "get",
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log(data);
          if (data && data.code === 200) {
            that.data = data.data;
          }
        });
    },
  },
};
</script>
