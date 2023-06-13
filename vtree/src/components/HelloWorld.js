
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
      changeId() {
    
        console.log(this.id)
        this.lists.forEach((i) => {
            if(this.id === i.id) {
              this.Name = i.name;
              this.CreatedBy = i.created_by;
              this.State = i.state;
            }
        });
      }
    },
  };