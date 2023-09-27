<template>
  <section class="notFound">
    <img src="@/assets/images/404.svg" alt="" />
    <h2>Page Not Found</h2>
    <button style="margin-top: 10px" @click="$router.back()" class="btn">
      Go back
    </button>
    <div class="questionMarks" ref="questionMarksRef"></div>
  </section>
</template>

<script>
import { onMounted, ref } from 'vue';
import { randomNum } from '@/composables/utilityFunctions';
export default {
  setup() {
    const questionMarks = 20;
    const questionMarksRef = ref(null);

    onMounted(() => {
      for (let i = 0; i < questionMarks; i++) {
        // create a question mark
        let questionMark = document.createElement('p');
        questionMark.classList.add('questionMark');
        questionMark.innerHTML = '?';
        questionMark.style.top = randomNum(0, 100) + '%';
        questionMark.style.left = randomNum(0, 100) + '%';
        questionMark.style.fontSize = randomNum(40, 55) + 'px';
        questionMark.style.animation = `moveAnim ease-in-out ${randomNum(
          0.4,
          1
        )}s infinite alternate`;
        questionMarksRef.value.appendChild(questionMark);
      }
    });

    return { questionMarksRef };
  },
};
</script>

<style>
body {
  overflow: hidden;
}

.notFound img {
  width: 200px;
  margin-left: 10px;
  margin-bottom: -10px;
}

section.notFound {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
}

.questionMark {
  color: #0de6cb;
  pointer-events: none;
  position: absolute;
  z-index: -1;
}

@keyframes moveAnim {
  0% {
    transform: translateY(-10%);
  }
  100% {
    transform: translateY(10%);
  }
}
</style>
