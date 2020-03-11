const app = new Vue({
    el : '#app',
    data : {
        homePage : false,
        formLogin : true,
        formRegister : false,
        navbar : false
    },
    created(){
        console.log(this.isLogin)
    },
    methods: {
        login(){
            this.formRegister = false
            this.formLogin = true
        },
        register(){
            this.formLogin = false
            this.formRegister = true
        },
        home(){
            this.homePage = true,
            this.formLogin = false,
            this.formRegister = false
            this.navbar = true
        }
    },
})