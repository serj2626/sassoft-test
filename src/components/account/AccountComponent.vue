<script setup lang="ts">
import AlertComponent from '../alert/AlertComponent.vue';
import TableComponent from '../table/TableComponent.vue';
import AccountHeaderAction from './AccountHeaderAction.vue';

</script>
<template>
    <div class="account-component">
        <AccountHeaderAction />
        <AlertComponent />
        <TableComponent class="account-component__table" />
    </div>
</template>
<style scoped lang="scss">
.account-component {
    width: 100%;
    min-height: 100vh;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &__table{
        margin-top: 40px;
    }
}
</style>