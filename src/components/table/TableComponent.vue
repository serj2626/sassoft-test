<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAccountsStore } from "../../stores/accounts";
import { ref } from "vue";
import type { ISelectOption } from "../../types";
import TableRow from "./TableRow.vue";

const accountsStore = useAccountsStore();
const { accounts } = storeToRefs(accountsStore);

const options = ref<ISelectOption[]>([
  { id: 1, label: "Локальная" },
  { id: 2, label: "LDAP" },
]);
</script>
<template>
  <div class="table-component">
    <table v-if="accounts.length">
      <thead>
        <tr>
          <th>Метки</th>
          <th>Тип записи</th>
          <th>Логин</th>
          <th rowspan="2">Пароль</th>
        </tr>
      </thead>
      <tbody>
        <TableRow
          v-for="account in accounts"
          :key="account.id"
          :account="account"
          :options="options"
        />
      </tbody>
    </table>
    <div v-else class="table-component__empty">Список учетных записей пуст</div>
  </div>
</template>
<style lang="scss">
.table-component {
  width: 100%;

  &__empty{
    font-weight: 600;
    font-size: 18px;
  }
}
table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
}

tbody tr:nth-child(even) {
  background-color: $bg-light;
}

tbody tr:hover {
  background-color: rgba($bg-light, $alpha: 1);
}
</style>
