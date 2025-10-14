<script setup lang="ts"></script>
<template>
  <div class="alert-component">
    <UIIcon name="info" size="26" />
    <p class="alert-component_info">
      Для указания нескольких меток для одной пары логин/пароль используйте
      разделитель ;
    </p>
  </div>
</template>
<style scoped lang="scss">
.alert-component {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
    padding: 10px;
    background-color: $border-color;
    border-radius: 8px;
   
}
.alert-component_info {
}
</style>
