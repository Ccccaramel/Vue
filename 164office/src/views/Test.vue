<template>  
    <div>  
      <canvas id="myCanvas" ref="myCanvas"></canvas>  
      <button @click="drawImage">Draw Image</button>  
      <button @click="saveImage">Save Image</button>  
    </div>  
  </template>  
    
<script>  
export default {
    name: "test",
    data() {  
      return {  
        imgData: null  
      };  
    },  
    methods: {  
      drawImage() {  
        const canvas = this.$refs.myCanvas;  
        const ctx = canvas.getContext('2d');  
        const img = new Image();  
        img.onload = () => {  
          canvas.width = img.width;  
          canvas.height = img.height;  
          ctx.drawImage(img, 0, 0, img.width, img.height);  
        };  
        img.src = 'https://164office.cn/api/resources/hyld/photo/2023102311461719120.jpg'; // 替换为你的图片URL  
      },  
      saveImage() {  
        const canvas = this.$refs.myCanvas;  
        this.imgData = canvas.toDataURL();  
        localStorage.setItem('imgData', this.imgData);  
      }  
    },  
    mounted() {  
      const imgData = localStorage.getItem('imgData');  
      if (imgData) {  
        const canvas = this.$refs.myCanvas;  
        const ctx = canvas.getContext('2d');  
        const dataUrl = new DataURL(imgData);  
        const img = new Image();  
        img.onload = () => {  
          canvas.width = img.width;  
          canvas.height = img.height;  
          ctx.drawImage(img, 0, 0, img.width, img.height);  
        };  
        img.src = dataUrl;  
      }  
    }  
  };  
  </script>