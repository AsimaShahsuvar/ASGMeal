<template>
    <div ref="lottieAnimation" class="lottie-container"></div>
  </template>
  
  <script>
  import lottie from 'lottie-web';
  import animationData from '@/assets/animations/animation.json'; // Faylının yolunu düzgün təyin et
  
  export default {
    mounted() {
      // Lottie animasiyasını işə sal
      lottie.loadAnimation({
        container: this.$refs.lottieAnimation, // Animasiya göstəriləcək element
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData, // JSON faylı
      });
    },
  };
  </script>
  
  <style>
  .lottie-container {
    width: 300px;
    height: 300px;
  }
  </style>
  