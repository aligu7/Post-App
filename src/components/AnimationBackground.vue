<template>
  <div class="area-box" ref="area" :style="{ backgroundColor: bgColor }">
    <ul class="circles" ref="circles"></ul>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { randomNum, randomArrItem } from '@/composables/utilityFunctions';
export default {
  props: ['amount', 'bgColor'],
  setup(props) {
    const circles = ref(null);
    const area = ref(null);
    const circleColors = [
      '0DE6CB',
      '99FFF2',
      '2FFFE5',
      '8EFCEE',
      '96F2E7',
      '51EFDB',
      '5EFFEB',
    ];

    onMounted(() => {
      // Change this components parents style to position = relative
      area.value.parentElement.style.position = 'relative';

      // Adding Circles
      for (let i = 0; i < parseInt(props.amount); i++) {
        circles.value.innerHTML += "<li class='circle'></li>";
      }

      // speedX = 0.05 - 0.2
      // speedY = 0.005 - 0.03
      for (let i = 0; i < circles.value.children.length; i++) {
        let circle = circles.value.children[i];

        let minSize = 30,
          maxSize;
        if (window.innerWidth > 1000) {
          maxSize = 100;
        } else {
          maxSize = 60;
        }
        let fps = 5;
        let size = randomNum(minSize, maxSize);
        let speedY = randomArrItem([
          randomNum(0.025, 0.05),
          randomNum(-0.05, -0.025),
        ]);
        let speedX = randomArrItem([
          randomNum(0.005, 0.015),
          randomNum(-0.015, -0.005),
        ]);
        circle.style.top = `${randomNum(0, 100)}%`;
        circle.style.left = `${randomNum(0, 100)}%`;
        circle.style.width = size + 'px';
        circle.style.height = size + 'px';
        circle.style.backgroundColor = '#' + randomArrItem(circleColors);

        setInterval(() => {
          // X speed
          let circleTop = parseFloat(
            circle.style.top.slice(0, circle.style.top.length - 1)
          );
          circle.style.top = circleTop + speedY + '%';

          if (speedY > 0 && circleTop > 110) {
            circle.style.top = '-10%';
          } else {
            if (circleTop < -10) {
              circle.style.top = '110%';
            }
          }

          // Y speed
          let circleLeft = parseFloat(
            circle.style.left.slice(0, circle.style.left.length - 1)
          );
          circle.style.left = circleLeft + speedX + '%';

          if (speedX > 0 && circleLeft > 110) {
            circle.style.left = '-10%';
          } else {
            if (circleLeft < -10) {
              circle.style.left = '110%';
            }
          }
        }, fps);
      }
    });

    return { circles, area };
  },
};
</script>

<style>
.area-box {
  z-index: -1;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

.circles {
  list-style: none;
}

.circle {
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
</style>
