<template>
  <div class="login-back">
      <div style="width:70%;height:60%;">
        <div class="login-title">计量业务系统</div>
        <div class="login-inputs">
            <div class="login-inputs-item">
                <span>用户名:</span>
                <input v-model="name" type="text" class="login-input"/>
            </div>
            <div class="login-inputs-item">
                <span>密码:</span>
                <input v-model="password" type="password" class="login-input"/>
            </div>
        </div>
        <div class="login-submit">
            <button @click="handleLogin">登 录</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            name: '',
            password: ''
        }
    },
    methods:{
        handleLogin() {
            if(this.name === "" || this.password === "") {
                this.$message.error("用户名或密码不能为空！")
                return;
            }
            this.$http({
                method: 'post',
                url: '/example/login',
                data: {
                    id: this.name,
                    password: this.password
                }
            }).then((data) => {
                data = data.data;
                if(data.mes == 'NOT EXIST') {
                    this.$message.error("用户名不存在！")
                }else if(data.mes == 'WRONG') {
                    this.$message.error("用户名或密码错误，请重试！")
                }else {
                    this.$store.dispatch('initInfo',{
                        id: data.mes.id,
                        permission: data.mes.permission,
                        name: data.mes.name
                    })
                    this.$router.push({path: '/homePage'}).catch(() => {});
                }
            })
        }
    }
}
</script>

<style>
.login-back {
    width: 100%;
    height: 100%;
    background: url(./imgs/background.jpg) no-repeat;
    background-size: 100% 100%;
    display:flex;
    justify-content:center;
    align-items:center;
    color: rgba(138,198,209,1);
}
.login-title {
    width: 100%;
    height: 20%;
    text-align: center;
    font-size: 3em;
}
.login-inputs {
    width: 100%;
    height: 50%;
}
.login-inputs-item {
    height: 12%;
    width: 100%;
    margin: 5% auto;
    text-align: center;
}
.login-inputs-item > span {
    display: inline-block;
    width: 4em;
}
.login-inputs-item > input{
    width: 30%;
    height: 100%;
    border: 1px solid rgba(187,222,214,1);
    border-radius: 2px;
    outline: none;
    background: rgba(0,0,0,.3);
    color: rgba(187,222,214,1);
    font-size: 90%;
    text-indent: 3%;
}
.login-submit {
    height: 20%;
    width: 100%;
}
.login-submit > button {
    display: block;
    width: 25%;
    height: 30%;
    margin-left: 40%;
    margin-top: -5%;
    border: 1px solid rgba(187,222,214,1);
    background: rgba(0,0,0,.3);
    color: rgba(187,222,214,1);
    font-size: 90%;
    cursor: pointer;
}
</style>