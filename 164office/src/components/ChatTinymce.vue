<template>
  <div class="tinymce-box">
    <editor
      v-model="textContent"
      :init="init"
      :disabled="disabled"
      @click="onClick">
    </editor>
  </div>
</template>

<script>
// 文档 http://tinymce.ax-z.cn/
// 引入组件
import tinymce from 'tinymce/tinymce' // tinymce默认hidden，不引入不显示
import Editor from '@tinymce/tinymce-vue'

// 引入富文本编辑器主题的js和css
// import 'tinymce/skins/content/default/content.css'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default' // 解决了icons.js 报错Unexpected token '<'
import 'tinymce/models/dom'

// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image'// 插入上传图片插件
import "tinymce/plugins/importcss"; //图片工具
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import "tinymce/plugins/charmap"; // 特殊字符
import 'tinymce/plugins/wordcount'// 字数统计插件
import "tinymce/plugins/codesample"; // 插入代码
import "tinymce/plugins/code"; // 查看源码
import "tinymce/plugins/fullscreen"; //全屏
import 'tinymce/plugins/link'
import 'tinymce/plugins/preview' // 预览
import "tinymce/plugins/template"; //插入模板
import 'tinymce/plugins/save' // 保存
import "tinymce/plugins/searchreplace"; //查询替换
import "tinymce/plugins/pagebreak"; //分页
import "tinymce/plugins/insertdatetime"; //时间插入
// import 'tinymce/plugins/help'

import { saveChatFile } from "../api/chatFile";
import { onMounted, shallowReactive } from 'vue'
import {Modal,Toast} from 'bootstrap';
export default {
  components: {
    Editor
  },
  name: 'ChatTinymce',
  props: {
    // 默认的富文本内容
    value: {
      type: String,
      default: ''
    },
    // 基本路径，默认为空根目录，如果你的项目发布后的地址为目录形式，
    // 即abc.com/tinymce，baseUrl需要配置成tinymce，不然发布后资源会找不到
    baseUrl: {
      type: String,
      default: window.location.origin ? window.location.origin : ''
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'link lists image code table wordcount media preview fullscreen help'
    },
    toolbar: {
      type: [String, Array],
      default: 'bold italic underline strikethrough | fontsizeselect | formatselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent blockquote | undo redo | link unlink code lists table image media | removeformat | fullscreen preview'
    }
  },
  data () {
    return {
      recipient: 0,
      commonResponse: {
          success: true,
          msg: '',
      },
      init: {
        language_url: `${this.baseUrl}/tinymce/langs/zh_CN.js`,
        language: 'zh_CN',
        skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`,
        convert_urls: false,
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar, // （自定义工具栏）

        statusbar: true, // 底部的状态栏
        menubar: 'file edit insert view format table tools help', // （1级菜单）最上方的菜单
        branding: false, // （隐藏右下角技术支持）水印“Powered by TinyMCE”
        images_upload_handler: (chatInfo, success) => new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          const form = new FormData();
          form.append('recipient', this.recipient);
          form.append('chatFile', chatInfo.blob());
          saveChatFile(form).then(
            response => {
              if(response.data.code==0){
                this.showToast(response);
                resolve("");
              } else {
                resolve(response.data.data.url);
              }
            }
          )
        })
      },
      textContent: this.value
    }
  },
  watch: {
    value (newValue) {
      this.textContent = newValue
    },
    textContent (newValue) {
      // 触发父组件自定义事件并传递数据
      this.$emit('contentHasChanged');
    },
  },
  // 实例创建完成
  created() {
  },
  // 组件挂载完毕
  mounted() {
    // 初始化 tinymce
    tinymce.init({})
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onClick (e) {
      // 自定义事件给父组件传递数据
      this.$emit('onClick', e, tinymce)
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear () {
      this.textContent = ''
    },
    show() {
      // console.log("show:"+this.textContent);
    },
    showToast(response) { // 通用信息展示
        if(response.data.code==0){
            this.commonResponse.success= false;
        }else{
            this.commonResponse.success = true;
        }
        this.commonResponse.msg= response.data.msg;
        this.$emit('commonResponse', this.commonResponse);
        var toastLiveExample = document.getElementById('commonToast');
        var toast = new Toast(toastLiveExample);
        toast.show();
    },
  },
}

// 页面关闭事件,由此删除无效资源,节省空间
// window.addEventListener('beforeunload', function (event) {
//   saveBlogFile();
// })
</script>

<style scoped>
.tinymce-box{
  margin: 20px;
}
</style>