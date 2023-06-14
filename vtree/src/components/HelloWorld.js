
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
        articleslists: [],
        id: null,

        tag_id: '',
        title: '',
        desc: '',
        content: '',
        created_by:  '',
        cover_image_url: '',
        state:  ''

        
      }
    },
    created() {
      this.ok()
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
            that.getTag()
          });
      },
  
      articles() {
        this.articleslists = []
        let that = this
        fetch("/api/v1/articles?token="+this.token, {
          method: "get"
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            console.log( data );
            if(data && data.code === 200) {
              that.articleslists = data.data.lists
            }
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
      changeId() {
    
        console.log(this.id)
        this.lists.forEach((i) => {
            if(this.id === i.id) {
              this.Name = i.name;
              this.CreatedBy = i.created_by;
              this.State = i.state;
            }
        });
      },

 
      addArticle() {
        
        let fd = new FormData();
        fd.append("tag_id", this.id);
        fd.append("title", this.title);
        fd.append("desc", this.desc);
        fd.append("content", this.content);

        fd.append("created_by", this.CreatedBy);
        fd.append("cover_image_url", this.cover_image_url);
        fd.append("state", this.State);
      
        let that = this
  
   
        fetch("/api/v1/articles?token="+this.token, {
          method: "POST",
          body: fd
        })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log( data );
          if(data && data.code === 200 ) {
            that.content = ''
            that.desc = ''
            that.cover_image_url = ''
          } else {
            that.msg = data.msg
          }
        });
         
      },

    },
  };