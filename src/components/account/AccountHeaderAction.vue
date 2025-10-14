<script setup lang="ts"></script>
<template>
  <div class="account-header-action">
    <span class="account-header-action__title">Учетные записи</span>
    <button class="account-header-action__btn">
      <UIIcon name="plus" size="26" />
    </button>
  </div>
</template>
<style scoped lang="scss">
.account-header-action {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
}
.account-header-action__title {
  font-weight: 600;
  font-size: 18px;
}
.account-header-action__btn {
  border: 1px solid $border-color;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out, scale 0.4s ease-in-out;

  &:hover {
    box-shadow: 0 0 10px $border-color;
  }
  &:active {
    scale: 0.9;
  }
}
</style>
