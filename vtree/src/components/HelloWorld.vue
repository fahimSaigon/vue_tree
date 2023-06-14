<template>
  <div class="hello">
    <i>
      {{ token }}
    </i>
    {{ msg }}
    <div class="cross">
      <i v-for="i in lists" :key="i.id" class="fll">
        {{ i.name }}
      </i>
    </div>
    <button @click="ok()">token</button>
    <i v-for="z in articleslists" :key="z.id"  class="article">
    {{ z.title }}
    </i>
    <button @click="articles()">articles</button>
    <button @click="getTag()">get tag</button>
    <fieldset>
      <legend> 新增 tag </legend>
      <input v-model="Name" placeholder="name" />
      <input v-model="CreatedBy" placeholder="CreatedBy" />

      <input type="radio" id="one" value="0" v-model="State" />
      <label for="0">0</label>

      <input type="radio" id="two" value="1" v-model="State" />
      <label for="1">1</label>
      

      <button @click="addTag()">add tag</button>
      
    </fieldset>
    <fieldset>
      <legend> 编辑 tag </legend>
      <select v-model="id" @change="changeId()">
        <option v-for="i in lists" :key="i.id" :value="i.id">
          {{ i.name + "--" + i.id }}
        </option>
      </select>
      <button @click="reviseTag()">revise tag</button>
      </fieldset>

      <fieldset>
        <legend> addArticle 添加文章 </legend>
        <input v-model="title" placeholder="标题" />
        <textarea v-model="desc"  rows="4"  placeholder="摘要" />
        <textarea v-model="content"  rows="14" placeholder="内容" />
        <textarea v-model="cover_image_url" placeholder="图片地址" />
        <button @click="addArticle()"> addArticle  添加文字 </button>
      </fieldset>
  </div>
</template>
<script src="./HelloWorld.js"></script>
<style scoped>
* {
  text-align: left;
}
input[placeholder="CreatedBy"],
input[placeholder="name"] {
  display: flex;
  margin-bottom: 10px;

}
.fll {
  display: block;
  float: left;
}
textarea{
  width: 80%;
}
textarea,
select,
button {
  display: flex;
  margin-bottom: 15px;
  cursor: pointer;
  text-align: left;
  margin-top: 10px;
}
i {
  max-width: 100%;
  word-break: break-all;
  word-wrap: break-word;
}
.cross {
  display: block;
  overflow: auto;
}
.cross i {
  float: left;
  margin-right: 5px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.article{
  cursor: pointer;
}
</style>
