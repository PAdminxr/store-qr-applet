<template>
  <canvas type="2d" v-if="isUseNewCanvas" class="ec-canvas" :canvas-id="canvasId" @init="init" @touchstart="touchStart"
    @touchmove="touchMove" @touchend="touchEnd">
  </canvas>
  <canvas v-else class="ec-canvas" :canvas-id="canvasId" @init="init" @touchstart="touchStart" @touchmove="touchMove"
    @touchend="touchEnd">
  </canvas>
</template>

<script>
import WxCanvas from "./wx-canvas";
import * as echarts from "./echarts";

let ctx;

function wrapTouch(event) {
  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i];
    touch.offsetX = touch.x;
    touch.offsetY = touch.y;
  }
  return event;
}

export default {
  props: {
    canvasId: {
      type: String,
      default: "ec-canvas"
    },
    ec: {
      type: Object,
      default: () => ({})
    },
    forceUseOldCanvas: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      $curChart: null,
      toHandleList: [],
      isUseNewCanvas: true
    };
  },
  watch: {
    "ec.option": {
      deep: true,
      handler(val) {
        if (val && this.$curChart) {
          this.$curChart.setOption(val);
        }
      }
    }
  },
  onReady() {
    if (!this.ec || !this.ec.option) {
      console.warn("请传入 ec.option 配置");
      return;
    }
    if (!this.ec.lazyLoad) {
      this.init();
    }
  },
  methods: {
    compareVersion(v1, v2) {
      v1 = v1.split(".");
      v2 = v2.split(".");
      const len = Math.max(v1.length, v2.length);

      while (v1.length < len) v1.push("0");
      while (v2.length < len) v2.push("0");

      for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i]);
        const num2 = parseInt(v2[i]);

        if (num1 > num2) return 1;
        else if (num1 < num2) return -1;
      }
      return 0;
    },

    init(callback) {
      const version = wx.getSystemInfoSync().SDKVersion;
      const canUseNewCanvas = this.compareVersion(version, "2.9.0") >= 0;
      this.isUseNewCanvas = canUseNewCanvas && !this.forceUseOldCanvas;

      if (this.isUseNewCanvas) {
        this.initByNewWay(callback);
      } else {
        const isValid = this.compareVersion(version, "1.9.91") >= 0;
        if (!isValid) {
          console.error("基础库版本过低，请升级至 >=1.9.91");
        } else {
          this.initByOldWay(callback);
        }
      }
    },

    initByOldWay(callback) {
      ctx = wx.createCanvasContext(this.canvasId, this);
      const canvas = new WxCanvas(ctx, this.canvasId, false);
      echarts.setCanvasCreator(() => canvas);

      const query = wx.createSelectorQuery().in(this);
      query.select(".ec-canvas").boundingClientRect(res => {
        if (!res) {
          console.error("无法获取 canvas 尺寸");
          return;
        }
        const canvasDpr = 1;

        if (typeof callback === "function") {
          this.$curChart = callback(canvas, res.width, res.height, canvasDpr);
        } else {
          this.initChart(canvas, res.width, res.height, canvasDpr);
        }
      }).exec();
    },

    initByNewWay(callback) {
      const query = wx.createSelectorQuery().in(this);
      query.select(".ec-canvas").fields({ node: true, size: true }).exec(res => {
        const canvasNode = res[0].node;
        const canvasDpr = wx.getSystemInfoSync().pixelRatio;
        const canvasWidth = res[0].width;
        const canvasHeight = res[0].height;

        const ctx = canvasNode.getContext("2d");
        const canvas = new WxCanvas(ctx, this.canvasId, true, canvasNode);
        echarts.setCanvasCreator(() => canvas);

        if (typeof callback === "function") {
          this.$curChart = callback(canvas, canvasWidth, canvasHeight, canvasDpr);
        } else {
          this.initChart(canvas, canvasWidth, canvasHeight, canvasDpr);
        }
      });
    },

    initChart(canvas, width, height, dpr) {
      canvas.setChartSize(width, height);
      this.$curChart = echarts.init(canvas, null, { width, height, devicePixelRatio: dpr });
      canvas.setChart(this.$curChart);
      this.$curChart.setOption(this.ec.option);
    },

    touchStart(e) {
      if (this.ec.stopTouchEvent) return;
      this.$emit("touchstart", e);
      if (this.$curChart && e.touches.length > 0) {
        const touch = e.touches[0];
        const handler = this.$curChart.getZr().handler;
        if (handler) {
          handler.dispatch("mousedown", { zrX: touch.x, zrY: touch.y });
          handler.dispatch("mousemove", { zrX: touch.x, zrY: touch.y });
          handler.processGesture(wrapTouch(e), "start");
        }
      }
    },

    touchMove(e) {
      if (this.ec.stopTouchEvent) return;
      this.$emit("touchmove", e);
      if (this.$curChart && e.touches.length > 0) {
        const touch = e.touches[0];
        const handler = this.$curChart.getZr().handler;
        if (handler) {
          handler.dispatch("mousemove", { zrX: touch.x, zrY: touch.y });
          handler.processGesture(wrapTouch(e), "change");
        }
      }
    },

    touchEnd(e) {
      if (this.ec.stopTouchEvent) return;
      this.$emit("touchend", e);
      if (this.$curChart) {
        const touch = e.changedTouches ? e.changedTouches[0] : {};
        const handler = this.$curChart.getZr().handler;
        if (handler) {
          handler.dispatch("mouseup", { zrX: touch.x, zrY: touch.y });
          handler.dispatch("click", { zrX: touch.x, zrY: touch.y });
          handler.processGesture(wrapTouch(e), "end");
        }
      }
    }
  }
};
</script>

<style lang="scss">
.ec-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
<style lang="scss">
.ec-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
