<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAccountsStore } from "../../stores/accounts";
import { ref } from "vue";
import type { ISelectOption, IStateAccount } from "../../types";

const accountsStore = useAccountsStore();
const { accounts, nextId } = storeToRefs(accountsStore);

const options = ref<ISelectOption[]>([
  { id: 1, label: "Локальная" },
  { id: 2, label: "LDAP" },
]);


function setNewRecordType(id: number, recordType: string) {
  const newData: Partial<IStateAccount> =
    recordType === "LDAP"
      ? { recordType, password: null }
      : { recordType };
  accountsStore.updateAccount(id, newData);
}


function setNewData(){
  
}
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
              v-model:input-value="account.label"
              class="table-component__input"
              @update:model-select="
                accountsStore.updateAccount(account.id, { label: $event })
              "
            />
          </td>
          <td>
            <UISelect
              :model-value="account.recordType"
              :options="options"
              @update:model-select="
                setNewRecordType(account.id, $event as string)
              "
            />
          </td>
          <td :colspan="account.recordType !== 'Локальная' ? `2` : `1`">
            <UIInput
              type="text"
              v-model:input-value="account.login"
              class="table-component__input"
              @update:model-select="
                accountsStore.updateAccount(account.id, { login: $event })
              "
            />
          </td>
          <td v-if="account.recordType === 'Локальная'">
            <UIInput
              type="password"
              v-model:input-value="account.password"
              class="table-component__input"
            />
          </td>
          <td>
            <button
              class="table-component__btn"
              @click="accountsStore.removeAccount(account.id)"
            >
              <UIIcon name="del" size="26" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped lang="scss">
.table-component {
  width: 100%;
  // overflow-x: auto;

  // -moz-user-select: none;
  // -webkit-user-select: none;
  // -ms-user-select: none;
  // user-select: none;

  &__btn {
    transition: all 0.3s ease-in-out;
    &:hover {
      scale: 1.2;
    }
  }
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
  border-bottom: 2px solid #ddd;
  font-weight: bold;
}

td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  vertical-align: baseline;
}

tbody tr:nth-child(even) {
  background-color: $bg-light;
}

tbody tr:hover {
  background-color: rgba($bg-light, $alpha: 1);
}
</style>
