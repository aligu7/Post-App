<template>
  <div class="backButton" @click="$router.go(-1)">
    <img class="leftArrow" src="../assets/images/left-arrow.png" alt="" />
  </div>
</template>

<style>
.leftArrow,
.upArrow {
  width: 20px;
}
.backButton,
.scrollTopButton {
  margin-top: 4px;
  background-color: #0de6cb;
  width: 45px;
  height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.18s ease;
}

.backButton {
  margin-right: 10px;
}

.leftArrow::selection,
.upArrow::selection {
  background: none;
}

.backButton:hover,
.scrollTopButton:hover {
  transform: scale(1.15);
}

@media screen and (max-width: 1000px) {
  .leftArrow {
    width: 15px;
  }

  .upArrow {
    width: 17px;
  }

  .backButton,
  .scrollTopButton {
    width: 37px;
    height: 35px;
  }
}
</style>
