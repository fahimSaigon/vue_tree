<template>
  <div class="hello">
   <i>
    {{ token }}
   </i>
    {{ msg }}
    <div class="cross">
      <i v-for="i in lists"  :key="i.id" class="fll">
        {{ i.name }} 
      </i>
    </div>
    <button @click="ok()">token</button>
    <button @click="articles()">articles</button>
    <button @click="getTag()"> get tag </button>

    <input v-model="Name"  placeholder="name"/>
    <input v-model="CreatedBy"  placeholder="CreatedBy"/>
     

    <input type="radio" id="one" value="0" v-model="State" />
    <label for="0">0</label>

    <input type="radio" id="two" value="1" v-model="State" />
    <label for="1">1</label>


    <button @click="addTag()"> add tag </button>

    <select v-model="id" @onchange="changeId(v)">
      <option v-for="i in lists" :key="i.id" :value="i.id">
        {{  i.name +'--'+ i.id}}
      </option>
    </select>
    <button @click="reviseTag()"> revise tag </button>
  </div>
</template>
<style scoped>
*{
  text-align: left;
}
  input[placeholder="CreatedBy"],
  input[placeholder="name"]{
    display: flex;
    margin-bottom: 10px;
  }
  .fll{
    display: block;
    float: left;
  }
  select,
  button{
    display: flex;
    margin-bottom: 15px;
    cursor: pointer;
    text-align: left;
  }
  i{
    max-width: 100%;
    word-break: break-all;
    word-wrap: break-word;
  }
  .cross{
    display: block;
    overflow: auto;
  }
  .cross i{
    float: left;
    margin-right: 5px;
  }
</style>
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      token: null,
      Name: '',
      CreatedBy: '',
      State: '',
      msg: '',
      lists: [],
      id: null
    }
  },
  methods: {
    ok() {
      let that = this
      let fd = new FormData();
      fd.append("username", "test");
      fd.append("password", "test123");

      fetch("/auth", {
        method: "POST",
        body: fd,
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log( data );
          that.token = data.data.token
        });
    },

    articles() {
      
      fetch("/api/v1/articles?token="+this.token, {
        method: "get"
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log( data );
        });
    },

    getTag() {
      this.lists = []
      let that = this
      fetch("/api/v1/tags?token="+this.token, {
        method: "get"
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log( data );
          if(data && data.code === 200) {
            that.lists = data.data.lists
          }
        });
    },

    addTag() {
      
      let fd = new FormData();
     
      fd.append("name", this.Name);
      fd.append("created_by", this.CreatedBy);
      fd.append("state", this.State);
    
      let that = this

 
      fetch("/api/v1/tags?token="+this.token, {
        method: "POST",
        body: fd
      })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log( data );
        if(data && data.code === 200 ) {
          that.Name = ''
        } else {
          that.msg = data.msg
        }
      });
       
    },
    reviseTag() {
      let fd = new FormData();
     
     fd.append("name", this.Name);
     fd.append("modified_by", this.CreatedBy);
     fd.append("state", this.State);
     fd.append("id", this.id);
     let that = this


     fetch("/api/v1/tags/"+ that.id + "/?token="+this.token, {
       method: "put",
       body: fd
     })
     .then(function (res) {
       return res.json();
     })
     .then(function (data) {
       console.log( data );
       if(data && data.code === 200 ) {
        that.Name = ''
        that.getTag()
       } else {
         that.msg = data.msg
       }
     });
      
    },
    changeId(v) {
      debugger;
      console.log(v)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
