<template>
  <span class="iconfont" :class="'icon-' + type" :style="{
    color: color,
    fontSize: size,
    lineHeight: lineHeight,
    fontWeight: fontWeight
  }" @click="$emit('click')"></span>
</template>

<script>
export default {
  name: 'myIcon',
  props: {
    type: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#333333'
    },
    size: {
      type: [String],
      default: '38rpx'
    },
    lineHeight: {
      type: [Number, String],
      default: 1
    },
    fontWeight: {
      type: [String],
      default: 'initial'
    }
  },
  mounted() {

  }

}
</script>

<style>
@font-face {
  font-family: 'iconfont';
  /* Project id 4931329 */
  src: url('//at.alicdn.com/t/c/font_4931329_q8188fdk87.woff2?t=1748321258153') format('woff2'),
    url('//at.alicdn.com/t/c/font_4931329_q8188fdk87.woff?t=1748321258153') format('woff'),
    url('//at.alicdn.com/t/c/font_4931329_q8188fdk87.ttf?t=1748321258153') format('truetype');
}

.iconfont {
  font-family: 'iconfont' !important;
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
}


.icon-more:before {
  content: "\e613";
}

.icon-location:before {
  content: "\e606";
}

.icon-refresh:before {
  content: "\e617";
}

.icon-eye:before {
  content: "\e611";
}

.icon-common:before {
  content: "\e61b";
}

.icon-xiala:before {
  content: "\e61e";
}

.icon-log:before {
  content: "\e616";
}
</style>
