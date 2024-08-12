<template>
  <div class="bg h-100" :style="'zoom:'+ zoomVal">
    <br/>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-12" style="height:540px;overflow: hidden;">  <!-- 可见部分可展示9行,第5行为C位 -->

          <div id="test" class="move-up">
            <dl>
              <dt v-for="n in 4" :key="n" style="height: 60px;">  <!-- 前4行占位作用 -->
              </dt>
              <dt v-for="musicLyrics,i in musicLyricsList" :key="i+4" style="height: 60px;" :id="'musicLyrics-'+(i+4)">
                <span v-if="getcolorsLength(musicLyrics.color)==0" :style="'line-height: 60px;font-weight: bold;font-size:'+currentMusicLyricsIndex==i?'26px;':'18px;'">{{ musicLyrics.text }}</span>
                <span v-if="getcolorsLength(musicLyrics.color)==1" :style="'line-height: 60px;font-weight: bold;color:'+musicLyrics.color+';font-size:'+(currentMusicLyricsIndex==i?'26px;':'18px;')">{{ musicLyrics.text }}</span>
                <span v-if="getcolorsLength(musicLyrics.color)>1" :style="'line-height: 60px;font-weight: bold;background: linear-gradient(to right,'+musicLyrics.color+');-webkit-background-clip: text;background-clip: text;color: transparent;font-size:'+(currentMusicLyricsIndex==i?'26px;':'18px;')">{{ musicLyrics.text }}</span>
              </dt>
            </dl>
          </div>

        </div>
      </div>
    </div>
    <br/>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-12">
          <!-- <label for="duration" class="form-label">{{currentTime}}/{{totalTime}}</label> -->
          <!-- <p class="fw-bold"><span style="color: #ff3377;">{{currentTime}}</span><span style="color: #33ddaa;">/</span><span style="color: #ffdd00;">{{totalTime}}</span></p> -->
          <p class="fw-bold" style="color: #ff88bb;">{{currentTime}}/{{totalTime}}</p>
          <input type="range" class="form-range" min="0" max="500" :value="durationValue" id="duration" @mousedown="downDuration" @mouseup="upDuration" @change="changeDuration()">
        </div>
        <div class="col-1">
          <div class="btn">
            <font-awesome-icon :icon="['far', 'circle-play']" size="xl" style="color: #ff5522;" v-if="!play" @click="playOrPause(true)"/><!-- 播放 -->
            <font-awesome-icon :icon="['far', 'circle-pause']" size="xl" style="color: #0077dd;" v-if="play" @click="playOrPause(false)"/><!-- 暂停 -->
          </div>
        </div>
        <div class="col-1">
          <div class="btn">
            <font-awesome-icon :icon="['fas', 'repeat']" size="xl" style="color: #e53344;" v-if="repeat" @click="repeatOrShuffle()"/><!-- 重复 -->
            <font-awesome-icon :icon="['fas', 'shuffle']" size="xl" style="color: #ff9999;" v-if="!repeat" @click="repeatOrShuffle()"/><!-- 随机 -->
          </div>
        </div>
        <div class="col-1">
          <div class="btn">
            <font-awesome-icon :icon="['fas', 'backward']" size="xl" style="color: #ffeeaa;" @click="prev()"/><!-- 上一首 -->
          </div>
        </div>
        <div class="col-1">
          <div class="btn">
            <font-awesome-icon :icon="['fas', 'record-vinyl']" size="xl" style="color: #ddbbff;" data-bs-toggle="offcanvas" data-bs-target="#musicInfoCanvas" aria-controls="musicInfoCanvas"/><!-- music基本信息 -->
          </div>
        </div>
        <div class="col-1">
          <div class="btn">
            <font-awesome-icon :icon="['fas', 'forward']" size="xl" style="color: #99dd88;" @click="next()"/><!-- 下一首 -->
          </div>
        </div>
        <div class="col-1" v-if="hasValue(musicInfo.mvLink)">
          <div class="btn">
            <!-- 旧:将第三方视频嵌入自己项目 -->
            <!-- <font-awesome-icon :icon="['fab', 'bilibili']" size="xl" style="color: #42AFEF;" data-bs-toggle="modal" data-bs-target="#videoModal"  @click="openVideoModal()"/> -->
            <!-- 新:直接连接跳转至第三方平台,好处是简单通用无需额外去适配 -->
            <a target="_blank" :href="musicInfo.mvLink"><font-awesome-icon :icon="['fab', 'bilibili']" size="xl" style="color: #42AFEF;"></font-awesome-icon></a>
          </div>
        </div>
        <div class="col-1">
          <div class="btn">
            <font-awesome-icon :icon="['fas', 'volume-xmark']" size="xl" style="color: #ff9922;" v-if="volume==0"/><!-- 静音 -->
            <font-awesome-icon :icon="['fas', 'volume-low']" size="xl" style="color: #ffee22;" v-if="volume>0&&volume<0.5"/>
            <font-awesome-icon :icon="['fas', 'volume-high']" size="xl" style="color: #44ddff;" v-if="volume>=0.5"/>
          </div>
        </div>
        <div class="col-1">
          <div class="btn">
            <input type="range" class="form-range" min="0" max="100" value="40" @change="changeVolume()" id="audioVolume"><!-- 音量 -->
          </div>
        </div>
      </div>
    </div>

    <!-- 不使用原生组件,隐藏 -->
    <audio id="audioUnit" ref="audioRef" :loop="loop" controls style="display:none;">
        <source :src="musicInfo.audioLink" type="audio/mpeg">
    </audio>

    <!-- 侧边栏,music信息 -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="musicInfoCanvas" aria-labelledby="musicInfoCanvasLabel">
      <div class="offcanvas-header">
        <h5 id="musicInfoCanvasLabel">Music信息</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="container h-100 text-center">
          <div class="row  align-items-center h-100">
            <div class="col-12">
              <img :src="musicInfo.coverLink"  class="rounded-2" style="max-width: 250px;">
              <p class="fw-bold lh-sm text-break mt-4">{{musicInfo.name}}</p>
              <br>
              <span class="badge rounded-pill bg-primary">作曲</span>&ensp;
              <span class="lh-sm text-break">{{musicInfo.composing}}</span>
              <br>
              <span class="badge rounded-pill bg-primary">作词</span>&ensp;
              <span class="lh-sm text-break">{{musicInfo.lyrics}}</span>
              <br>
              <span class="badge rounded-pill bg-primary">编曲</span>&ensp;
              <span class="lh-sm text-break">{{musicInfo.arranger}}</span>
              <br>
              <span class="badge rounded-pill bg-danger">演唱</span>&ensp;
              <span class="lh-sm text-break">{{musicInfo.singer}}</span>
              <br>
              <span class="badge rounded-pill bg-success">专辑</span>&ensp;
              <span class="lh-sm text-break">{{musicInfo.album}}</span>
              <br>
              <span class="badge rounded-pill bg-success">发布时间</span>&ensp;
              <span class="lh-sm text-break">{{musicInfo.releaseTimeStr}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 第三方视频播放窗口 -->
    <!-- <div class="modal fade" id="videoModal" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">MV(关闭前需手动暂停 o_o ....)</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeVideoModal()"></button>
          </div>
          <div class="modal-body">
            <div class="container text-center">
              <div class="row  align-items-center">
                <div class="col">
                  <iframe :src="musicInfo.mvLink" style="width: 100%;height: 200px;" ref="mvVideo" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

  </div>
</template>
<script>
import { Toast } from 'bootstrap';
import Top from "@/components/Top.vue";
import Page from '@/components/Page.vue';
import { saveVisitLog } from "../api/welcome";
import { getMusic } from "../api/music";
export default {
  name: "music",
  components: {
    Top,
    Page,
  },
  data() {
    return {
      commonResponseData: { // 通用 Modal 弹窗数据
        success: true,
        msg: '',
      },
      page: { // 通用 Page
        size: 10,
        currentPage: 1, // 偏移量,数据库从0开始
        totalPage: 0,
      },
      musicId: 1,  // 当前播放音乐的id
      play: false,
      repeat: false,
      rangeVal: 50,
      volume: 20,
      currentSecond:0,
      currentTime: "00:00",
      totalSecond:0,
      totalTime: "00:00",
      durationValue: 0,
      autoRun: true,  // 自动运动
      loop: false,
      musicInfo: {
        name:"♪~"
      },
      musicLyricsList: [],
      currentMusicLyricsIndex: 0,  // 下一个C位
      playList: [],
      playIndex: 0,
      light: false,  // 当点击下一首或上一首,资源加载完后需要触发播放
      zoomVal: 0,  // 当前页面缩放比
      type:3700,
    }
  },
  created() {

    var zoomLevel = window.devicePixelRatio;  
    console.log("系统缩放级别: " + zoomLevel);
    if (zoomLevel==1) {
      this.zoomVal = 1.25;
    }
    
    var id = this.$route.params.musicId;
    var type = this.$route.params.type;
    if (id != "undefined" &&id != null) {
      this.musicId = id;
    }
    if (type != "undefined" &&type != null) {
      this.type = type;
    }
    this.playList.push(this.musicId);
  },
  mounted() {
    saveVisitLog(Object.assign({ key: 26, data: this.musicId }));  // 访问日志
    this.initMusicData();
  },
  methods: {
    commonPageChange(event) {
      this.page = event;
    },
    playOrPause(opt) {
      this.play = opt;
      if (this.play) {
        console.log("播放");
        document.getElementById("audioUnit").play();
      }
      else {
        console.log("暂停");
        document.getElementById("audioUnit").pause();
      }
    },
    commonTip(code,msg) {
        var response = {
            data: {
                code: code,
                msg: msg,
            },
        }
        this.showToast(response);
    },
    showToast(response) { // 通用信息展示
        if (response.data.code == 0) {
            this.commonResponse.success = false;
        } else {
            this.commonResponse.success = true;
        }
        this.commonResponse.msg = response.data.msg;
        this.$emit('commonResponse', this.commonResponse);
        var toastLiveExample = document.getElementById('commonToast');
        var toast = new Toast(toastLiveExample);
        toast.show();
    },
    repeatOrShuffle() {
      this.loop = !this.repeat;
      this.repeat = !this.repeat;
    },
    refreshDuration() {
      if (this.light) {
        document.getElementById("audioUnit").play();
        this.light = false;
        this.play = true;
      }
      this.totalSecond = Math.floor(document.getElementById("audioUnit").duration);
      this.totalTime = Math.floor(this.totalSecond / 60) + ":" + this.totalSecond % 60;
      this.currentSecond = Math.floor(document.getElementById("audioUnit").currentTime);
      this.currentTime = Math.floor(this.currentSecond / 60) + ":" + this.currentSecond % 60;
    },
    autoRefreshDuration() {
      if (this.play&&this.autoRun) {
        this.currentSecond = Math.floor(document.getElementById("audioUnit").currentTime);
        this.currentTime = Math.floor(this.currentSecond / 60) + ":" + this.currentSecond % 60;
        this.durationValue = Math.floor(500 * this.currentSecond / this.totalSecond);
        this.refreshMusicLyricsWindows();
        if (this.currentSecond==this.totalSecond&&!this.loop) {  // 播放完毕
          this.play = false;
          this.next();
        }
      }
    },
    downDuration() {  // 开始拖动
      this.autoRun = false;
    },
    upDuration() {  // 结束拖动
      var v = document.getElementById("duration").value / 500 * this.totalSecond;
      document.getElementById("audioUnit").currentTime = v;
      this.refreshMusicLyricsWindows();
      this.autoRun = true;
    },
    changeDuration() {
      
    },
    changeVolume() {
      this.volume = document.getElementById("audioVolume").value / 100;
      document.getElementById("audioUnit").volume = this.volume;
    },
    initMusicData(getNewMusic) {
      getMusic(Object.assign({ id:this.musicId,show:true,type:this.type })).then(
        response => {
          this.musicInfo = response.data.data.data;
          document.title =this.musicInfo.name;
          this.musicLyricsList = this.musicInfo.musicLyricInfoList;
          if (getNewMusic) {
            this.playList.push(this.musicInfo.id);
          }
          this.initAudio();
        }
      )
    },
    initAudio() {
      this.$refs.audioRef.load();  // 修改src后需要手动加载
      this.$refs.audioRef.addEventListener('canplaythrough', () => {
        this.refreshDuration();
        this.timer = setInterval(() => {
            this.autoRefreshDuration();
        },100);
      }); 
    },
    refreshMusicLyricsWindows() {
      // 遍历,根据当前的播放时刻,找到歌词中与之相匹配的的歌词
      var i = 0;  // 当前正在播放所对应的歌词
      for (; i < this.musicLyricsList.length;i++){
        var musicLyrics = this.musicLyricsList[i];
        var mls = musicLyrics.minutes * 60 + musicLyrics.second;
        if (this.currentSecond < mls) {
          break;
        }
      }
      if ((i-1) != this.currentMusicLyricsIndex) {  // 当前播放的时刻与C位歌词对应,无需操作
        document.getElementById("test").style.transform = "translateY(-" + (i-1) * 60 + "px)";
        this.currentMusicLyricsIndex=i-1;
      }
    },
    getcolorsLength(color){
        return color.split(",").length;
    },
    prev() {
      if (this.playIndex == 0) {
        this.commonTip(0, "不存在上一首,听听下一首吧_(:з)∠)_");
      }
      else {
        this.light = true;
        this.musicId = this.playList[--this.playIndex];
        this.initMusicData();
      }
    },
    next() {
      var getNewMusic = false;
      if (this.playList.length==(this.playIndex+1)) {
        this.musicId = 0;
        getNewMusic = true;
      }
      else {
        this.musicId = this.playList[this.playIndex+1];
      }
      this.light = true;
      this.playIndex++;
      this.initMusicData(getNewMusic);
    },
    // openVideoModal() {
    //   this.playOrPause(false);
    // },
    // closeVideoModal() {
    //   this.playOrPause(true);
    //   this.$refs.mvVideo.contentWindow.postMessage('{"method":"pause"}', '*');  
    // },
    hasValue(str) {
      if (str!=null&&str!='') {
        return true;
      }
      else {
        return false;
      }
    }
  },
};
</script>
<style>
.test{
  background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
  background: linear-gradient(to right, rgb(153, 255, 90), rgb(231, 255, 110));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent; 
}
.move-up {  
  /* transform: translateY(300px); */
  transition: transform 0.3s ease;
}
</style>