<template>
  <div class="ele-sign-root">
    签名：
    <canvas
      ref="canvasF"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      @mousedown="mouseDown"
      @mousemove="mouseMove"
      @mouseup="mouseUp"
    ></canvas>
    <div class="tools">
      <div class="color-container">
        颜色选择
        <el-color-picker v-model="color" @change="changeColor"></el-color-picker>
      </div>
      <div class="line-width-container">
        线宽选择
        <el-slider v-model="linewidth" :min="1" :max="10" @change="changeLineWidth"></el-slider>
      </div>
      <el-button type="primary" @click="overwrite">清除</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EleSign",
  props: {},
  data() {
    return {
      points: [],
      canvasTxt: null,
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      endY: 0,
      endX: 0,
      w: null,
      h: null,
      isDown: false,
      color: "#000",
      linewidth: 3,
      isDraw: false //签名标记
    };
  },
  components: {},
  watch: {},
  computed: {},
  created() {},
  mounted() {
    let canvas = this.$refs.canvasF;
    canvas.height = 250;
    canvas.width = 600;
    this.canvasTxt = canvas.getContext("2d");
    this.canvasTxt.strokeStyle = this.color;
    this.canvasTxt.lineWidth = this.linewidth;
  },
  beforeDestroy() {},
  methods: {
    mouseDown(ev) {
      ev = ev || event;
      ev.preventDefault();

      let obj = {
        x: ev.offsetX,
        y: ev.offsetY
      };
      this.startX = obj.x;
      this.startY = obj.y;
      this.canvasTxt.beginPath(); //开始作画
      this.points.push(obj); //记录点
      this.isDown = true;
    },
    //电脑设备事件
    mouseMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (this.isDown) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.moveTo(this.startX, this.startY); //移动画笔
        this.canvasTxt.lineTo(obj.x, obj.y); //创建线条
        this.canvasTxt.stroke(); //画线
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj); //记录点
      }
    },
    //电脑设备事件
    mouseUp(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (1) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        this.canvasTxt.closePath(); //收笔
        this.points.push(obj); //记录点
        this.points.push({ x: -1, y: -1 });
        this.isDown = false;
      }
    },
    //移动设备事件
    touchStart(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        this.isDraw = true; //签名标记
        let obj = {
          x: ev.targetTouches[0].clientX,
          y:
            ev.targetTouches[0].clientY -
            (document.body.offsetHeight * 0.5 +
              this.$refs.canvasF.offsetHeight * 0.1)
        }; //y的计算值中：document.body.offsetHeight*0.5代表的是除了整个画板signatureBox剩余的高，this.$refs.canvasF.offsetHeight*0.1是画板中标题的高
        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath(); //开始作画
        this.points.push(obj); //记录点
      }
    },
    //移动设备事件
    touchMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX,
          y:
            ev.targetTouches[0].clientY -
            (document.body.offsetHeight * 0.5 +
              this.$refs.canvasF.offsetHeight * 0.1)
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.moveTo(this.startX, this.startY); //移动画笔
        this.canvasTxt.lineTo(obj.x, obj.y); //创建线条
        this.canvasTxt.stroke(); //画线
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj); //记录点
      }
    },
    //移动设备事件
    touchEnd(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX,
          y:
            ev.targetTouches[0].clientY -
            (document.body.offsetHeight * 0.5 +
              this.$refs.canvasF.offsetHeight * 0.1)
        };
        this.canvasTxt.closePath(); //收笔
        this.points.push(obj); //记录点
        this.points.push({ x: -1, y: -1 }); //记录点
      }
    },
    //重写
    overwrite() {
      this.canvasTxt.clearRect(
        0,
        0,
        this.$refs.canvasF.width,
        this.$refs.canvasF.height
      );
      this.points = [];
      this.isDraw = false; //签名标记
    },
    changeColor(color) {
      this.canvasTxt.strokeStyle = color;
    },
    changeLineWidth(num) {
      this.canvasTxt.lineWidth = num;
    }
  }
};
</script>

<style lang='scss' scoped>
.ele-sign-root {
  display: flex;
  border: 1px solid;
  canvas {
    background: #ccc;
  }
  .tools {
    margin-left: 10px;
    width: 300px;
  }
}
</style>