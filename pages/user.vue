<template>
  <div class="container">
    <div class="user-box">
      <h1 class="user-box__title">Добро пожаловать в личный кабинет</h1>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
};
</script>

<style></style>
