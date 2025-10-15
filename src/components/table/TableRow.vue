<script setup lang="ts">
import { ref, computed } from "vue";
import type { ISelectOption, IStateAccount } from "../../types";
import { useAccountsStore } from "../../stores/accounts";
import { getArrayFromLabels } from "../../utils/functions";
import { checkLength, validateLabels } from "../../utils/validation";

interface ITableRowProps {
  account: IStateAccount;
  options: ISelectOption[];
}

const { account, options } = defineProps<ITableRowProps>();
const accountsStore = useAccountsStore();

const errors = ref<Record<string, string | null>>({
  label: null,
  login: null,
  password: null,
});


const isAccountValid = computed(() => {
  const hasLogin = account.login && account.login.trim() !== "";
  const hasRecordType = account.recordType;
  
  if (account.recordType === "Локальная") {
    return hasLogin && hasRecordType && account.password && account.password.trim() !== "";
  }
  

  return hasLogin && hasRecordType;
});

const handleInputBlur = (field: keyof IStateAccount, value: string) => {
  let isValid = true;

  switch (field) {
    case "label":
      errors.value.label = validateLabels(value);
      isValid = !errors.value.label;
      break;
    case "login":
      errors.value.login = checkLength(value, "login");
      isValid = !errors.value.login;
      break;
    case "password":
      errors.value.password = checkLength(value, "password");
      isValid = !errors.value.password;
      break;
  }

  if (isValid) {
    let updateData: Partial<IStateAccount> = { [field]: value };

    if (field === "label") {
      updateData.labelsArray = getArrayFromLabels(value);
    }
    
    accountsStore.updateAccount(account.id, updateData);
    

    accountsStore.saveToLocalStorage();
  }
};

const handleSelectChange = (recordType: "Локальная" | "LDAP") => {

  const updateData = recordType === "LDAP" 
    ? { recordType, password: null } 
    : { recordType };

  accountsStore.updateAccount(account.id, updateData);
  accountsStore.saveToLocalStorage(); 
};

const handleDelete = () => {
  accountsStore.removeAccount(account.id);
  accountsStore.saveToLocalStorage();
};
</script>

<template>
  <tr class="table-row" :class="{ 'table-row--invalid': !isAccountValid }">
    <td>
      <UIInput
        type="text"
        placeholder="Необязательное поле"
        v-model:model-value="account.label"
        class="table-row__input"
        :error="errors.label"
        @blur="handleInputBlur('label', $event)"
      />
    </td>

    <td>
      <UISelect
        :model-value="account.recordType"
        :options="options"
        @update:model-select="handleSelectChange"
      />
    </td>

    <td :colspan="account.recordType !== 'Локальная' ? 2 : 1">
      <UIInput
        type="text"
        placeholder="Введите логин"
        v-model:model-value="account.login"
        class="table-row__input"
        :error="errors.login"
        @blur="handleInputBlur('login', $event)"
      />
    </td>

    <td v-if="account.recordType === 'Локальная'">
      <UIInput
        type="password"
        placeholder="Введите пароль"
        v-model:model-value="account.password"
        class="table-row__input"
        :error="errors.password"
        @blur="handleInputBlur('password', $event)"
      />
    </td>

    <td>
      <UIButton
        icon="del"
        size="26"
        class="table-row__delete-btn"
        @click="handleDelete"
      />
    </td>
  </tr>
</template>

<style scoped lang="scss">
.table-row--invalid {
  opacity: 0.7;
  background-color: rgba(255, 0, 0, 0.05);
}
td {
  padding: 6px;
  vertical-align: baseline;
}
</style>