<template>
    <section class="main">

        <div class="play-block">
            <div>
                <i class="el-icon-mic" @click="playSound">Tap Me To Play</i>
                <audio id="myaudio" :src="url" controls autoplay hidden>
                    Your browser does not support the audio  element.
                </audio>
            </div>
        </div>


        <div class="answer-block">
            <div class="input-bar">
                <input class="input" v-model="userWord" @input="AnswerInput" v-on:keyup.enter="compaire" autofocus>

                <div class="input-box" v-for="n in size"><span class="box">{{nums[n-1]}}</span></div>
            </div>
        </div>

        <h3 class="answer" v-show="show" v-bind:class="ansclass">{{word}}</h3>


        <div class="fuc-block">
            <div class="fuc-center">
                <el-button @click="changeSize(1)">+</el-button>
                <el-button @click="changeSize(-1)">-</el-button>
                <el-button @click="compaire">Answer</el-button>
                <el-button @click="search" v-on:key.right="right">Next</el-button>
            </div>
        </div>

    </section>
</template>

<script>
    export default {
        name: "Number",
        data(){
            return {
                word:'34',          //要获取语音的单词
                baseurl:'http://dict.youdao.com/dictvoice?type=0&audio=',//有道翻译api
                url:'',            //合成的url = baseurl+word
                userWord:'',       //用于存放用户输入的word
                show:false,        //是否展示答案
                size:4,            //要听写的数字的长度
                nums:[],           //展示的数字
                ansclass:''
            }
        },
        created(){
            this.word = Math.round(Math.random()*Math.pow(10,this.size))
            // this.url = this.baseurl+this.getToday
            this.url = this.baseurl + this.word
            this.nums.length = this.size
        },
        computed:{
            getToday(){
                var date = new Date()
                return date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()
            }
        },
        methods:{
            right(){
                console.log('right')
            },
            search(){
                //数字
                this.word = Math.round(Math.random()*Math.pow(10,this.size))
                this.url = this.baseurl+this.word

                console.log(this.url);
                this.show = false
                this.nums.splice(0,this.size)
                this.userWord = ''
            },
            playSound(){
                var myAuto = document.getElementById('myaudio');
                myAuto.play()
            },
            compaire(){
                this.show = true
                if(this.userWord == this.word){
                    this.ansclass = 'right'
                }else{
                    this.ansclass = 'wrong'
                }
            },
            AnswerInput(){
                //限制input里面的长度
                if(this.userWord.length > this.size){
                    this.userWord = this.userWord.slice(0,this.size)
                }
                //将input中的数字输出到方块中
                for(let i=0;i < this.size;++i){
                    this.nums[i] = this.userWord[i]
                }
                console.log(this.userWord)
            },
            changeSize(cnt){
                this.size = this.size+cnt
                this.search()
            }
        }
    }
</script>

<style scoped>
    .right{
        color: #67C23A;
    }
    .wrong{
        color: #F56C6C;
    }
    .answer{
        margin: 0 auto;
        text-align: center;
    }
    .play-block {
        display: flex;
        justify-content: center;
        margin: 10px;
    }
    .fuc-block{
        display: flex;
        margin:10px 20%;
        justify-content: center;
    }
    .fuc-center{
        display: flex;
        justify-content: space-around;
    }
    .answer-block{
        width: 60%;
        margin: 0 auto;
    }
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
