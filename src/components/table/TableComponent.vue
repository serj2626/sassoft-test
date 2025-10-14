<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAccountsStore } from "../../stores/accounts";

const accountsStore = useAccountsStore();
const { accounts, nextId } = storeToRefs(accountsStore);
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
            {{ account.label }}
          </td>
          <td>
            {{ account.recordType }}
          </td>
          <td>
            {{ account.login }}
          </td>
          <td>
            {{ account.password }}
          </td>
          <td>
            <button class="table-component__btn">
              <UIIcon name="del" size="20" />
            </button>
          </td>
        </tr>
        <!-- <tr>
          <td>
            <UIInput />
          </td>
          <td>
            <UISelect />
          </td>
          <td>
            <UIInput />
          </td>
          <td>
            <UIInput />
          </td>
          <td>
            <button class="table-component__btn">
              <UIIcon name="del" size="20" />
            </button>
          </td>
        </tr> -->
      </tbody>
    </table>
  </div>
</template>
<style scoped lang="scss">
.table-component {
  width: 100%;
  overflow-x: auto;

  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

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
  vertical-align: top;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #f5f5f5;
}
</style>
