<script setup lang="ts">
import { useAccountsStore } from "../../stores/accounts";

const modal = useAccountsStore();
</script>
<template>
  <div class="account-header-action">
    <span class="account-header-action__title"> Учетные записи </span>
    <UIButton
      class="account-header-action__btn"
      icon="plus"
      size="26"
      @click="modal.addEmptyRow"
    />
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
  border: 1px solid $border-color !important;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
</style>
