const URL_API = "https://api.zipaddress.net/";


let app = new Vue({
    // 適用する要素を指定
    el:"#app",
    // 使用する変数を定義
    data:{
        message:"Hello World!",
        variable:"red",
        iserror:false,
        iserror2:false,
        items:[
            {"color":"redstone","size":"big"},
            {"color":"greenstone","size":"medium"},
            {"color":"bluestone","size":"small"}
        ],
        inputtext:"データ初期値",
        inputNumber:"",
        defaultNumber:"0000000",
        results:""
    },
    // 使用するメソッドを定義
    methods:{
        // クリック時のメソッド
        clicked:function(){
            alert("クリックされました")
        },
        // APIを叩いて郵便番号から住所を取得する
        getAddress: function(z){
            let params = {params:{zipcode: z}};
            axios
              .get(URL_API, params)
              .then(res => {
                this.results = res.data.code == 200 ? res.data.data.fullAddress : res.data.message;
            });
          }
    },
    // 使用するフィルターメソッドを定義
    // これはあくまで入力値の整形なので、最後のリターンは普通はいらない気がする
    filters: {
        filterNum: function (Number) {
            let bufNumber = (Number + '0000000').slice(0, 7);
            return isNaN(bufNumber) ? '半角数字で入力してください' : bufNumber;
        }
    },
    //   使用する算出プロパティを定義
    // ここで条件分岐等のバックの処理を行って返すべき、というかhtmlでそもそも指定の形式以外受け付けないようにするほうが良いと思う
    computed:{
        passNumber:function(){
            return !isNaN(this.inputNumber) && this.inputNumber.length == 7 ? this.inputNumber : this.defaultNumber
        }
    }

})