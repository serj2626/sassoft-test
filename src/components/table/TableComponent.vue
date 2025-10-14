<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAccountsStore } from "../../stores/accounts";
import { ref } from "vue";
import type { ISelectOption } from "../../types";

const accountsStore = useAccountsStore();
const { accounts } = storeToRefs(accountsStore);

const options = ref<ISelectOption[]>([
  { id: 1, label: "Локальная" },
  { id: 2, label: "LDAP" },
]);
</script>
<template>
  <div class="table-component">
    <table>
      <thead>
        <tr>
          <th>Метки</th>
          <th>Тип записи</th>
          <th>Логин</th>
          <th>Пароль</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="account in accounts" :key="account.id">
          <td>
            <UIInput
              type="text"
              mode="label"
              plaсeholder="Необязательное поле"
              :input-value="account.label"
              class="table-component__input"
              @update:input-value="
                accountsStore.updateAccount(account.id, { label: $event })
              "
            />
          </td>
          <td>
            <UISelect
              :model-value="account.recordType"
              :options="options"
              @update:model-select="
                accountsStore.updateAccount(account.id, $event)
              "
            />
          </td>
          <td :colspan="account.recordType !== 'Локальная' ? `2` : `1`">
            <UIInput
              type="text"
              mode="login"
              plaсeholder="Введите логин"
              :input-value="account.login"
              class="table-component__input"
              @update:input-value="
                accountsStore.updateAccount(account.id, { login: $event })
              "
            />
          </td>
          <td v-if="account.recordType === 'Локальная'">
            <UIInput
              type="password"
              mode="password"
              plaсeholder="Введите пароль"
              :input-value="account.password"
              class="table-component__input"
              @update:input-value="
                accountsStore.updateAccount(account.id, { password: $event })
              "
            />
          </td>
          <td>
            <UIButton
              icon="del"
              size="26"
              @click="accountsStore.removeAccount(account.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped lang="scss">
.table-component {
  width: 100%;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
}

th {
  background-color: #f2f2f2;
  padding: 12px;
  text-align: left;

  font-weight: bold;
}

td {
  padding: 10px;
  vertical-align: baseline;
}

tbody tr:nth-child(even) {
  background-color: $bg-light;
}

tbody tr:hover {
  background-color: rgba($bg-light, $alpha: 1);
}
</style>
