<template>
      <!--  核心思想：
            是使用CSS将Input放在最上层，然后透明化.
            灰色方块放在下层用于显示
      -->
    <div class="input-bar">
        <input class="input" v-model="value" @input="AnswerInput" v-on:keyup.enter="compaire" autofocus>
        <div class="input-box" v-for="n in size"><span class="box">{{nums[n-1]}}</span></div>
    </div>
</template>

<script>
    export default {
        name: "InputBox",
        data(){
            return {
                size:6,   //方块的数量
                value:'', //输入的值
                nums:[]   //和每个方块绑定的响应式数组
            }
        },
        created() {
            this.nums.length = this.size
        },
        methods:{
            AnswerInput(){
                //限制input里面的长度
                if(this.value.length > this.size){
                    this.value = this.value.slice(0,this.size)
                }
                //将input中的数字输出到方块中
                for(let i=0;i < this.size;++i){
                    this.nums[i] = this.value[i]
                }
            },
        }
    }
</script>

<style scoped>
    .input-bar{
        display: flex;
        justify-content: space-around;
        position: relative;
        font-size: 0;
        height: 45px;
        width: 50%;
        margin:0 auto;
        line-height: 45px;
        /*border: 1px solid #ccc;*/
    }
    .input-box{
        width: 45px;
        height: 45px;
        border:solid grey 1px;
        background-color: #f3f3f3;
        display: flex;
        justify-content: center;
        align-items: center;
        margin:0 5px;
    }
    .box{
        text-align: center;
        margin: 0 auto;
        font-size: 16px;
    }
    input{
        outline: none;     /*获取焦点时的轮廓*/
        border: 0;
        background: none;
        width: 1000px;
        height: 0;
        padding: 22px 0;
        text-align: center;
        position: absolute;
        left: -500px;
        right: 0;
        z-index: 1000;         /*设置层叠样式*/
        color:transparent;
        text-indent: -999em;  /*设置缩进 负号表示向左侧缩进*/
    }
</style>
