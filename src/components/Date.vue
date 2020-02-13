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
                <div v-for="n in 4">
                    <div class="input-box">
                        <span class="box">{{nums[n-1]}}</span>
                    </div>
                </div>
                <span class="split">-</span>
                <div v-for="n in monthNumer">
                    <div class="input-box">
                        <span class="box">{{nums[n]}}</span>
                    </div>
                </div>
                <span class="split">-</span>
                <div v-for="n in dateNumer">
                    <div class="input-box">
                        <span class="box">{{nums[n]}}</span>
                    </div>
                </div>
            </div>
        </div>

        <h3 class="answer" v-show="show" v-bind:class="ansclass">{{word}}</h3>


        <div class="fuc-block">
            <div class="fuc-center">
                <el-button @click="compaire">Answer</el-button>
                <el-button @click="search" v-on:key.right="search">Next</el-button>
            </div>
        </div>

    </section>
</template>

<script>
    let count = 0;

    export default {
        name: "Date",
        data(){
            return {
                word:'34',          //要获取语音的单词
                baseurl:'http://dict.youdao.com/dictvoice?type=0&audio=',//有道翻译api
                url:'',            //合成的url = baseurl+word
                userWord:'',       //用于存放用户输入的word
                show:false,        //是否展示答案
                size:8,
                nums:[],           //展示的数字
                ansclass:'',
                monthNumer:[4,5],
                dateNumer:[6,7]
            }
        },
        created(){
            this.word = this.getdate()
            this.url = this.baseurl+this.word
            this.nums.length = this.size
        },
        methods:{
            formatTime(time,spliter){
                var d = new Date(time)
                var year = d.getFullYear()
                var month = d.getMonth() >= 10 ? d.getMonth() : ('0' + d.getMonth());
                var day = d.getDate() >= 10 ? d.getDate() : ('0' + d.getDate());
                return year+spliter+month+spliter+day
            },
            getdate(){
                var arr=new Array();
                var startTime = new Date('1980','01','01').getTime()
                var endTime = new Date('2020','01','31').getTime()
                var i = startTime
                i = startTime+ 24 * 60 * 60 * 1000 * Math.round(Math.random()*10000)
                while(i>endTime){
                    i = startTime+ 24 * 60 * 60 * 1000 * Math.round(Math.random()*10000)
                }
                return this.formatTime(i,'-')
            },
            search(){
                //日期
                this.word = this.getdate()
                console.log(this.word);
                this.url = this.baseurl+this.word
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
                var t = this.word.replace(/-/g,'')
                if(this.userWord == t){
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
                this.nums.splice(0)
                //将input中的数字输出到方块中
                for(let i=0;i < this.userWord.length;++i){
                    this.nums[i] = this.userWord[i]
                }
                console.log(this.userWord)
            }
        }
    }
</script>

<style scoped>
    .split{
        width:20px;
        font-size: 30px;
    }
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
        outline: none;
        border: 0;
        background: none;
        width: 1000px;
        height: 0;
        padding: 22px 0;
        text-align: center;
        position: absolute;
        left: -500px;
        right: 0;
        z-index: 1000;
        color:transparent;
        text-indent: -999em;
    }
</style>
