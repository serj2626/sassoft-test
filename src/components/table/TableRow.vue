<script setup lang="ts">
import { ref } from "vue";
import type { ISelectOption, IStateAccount } from "../../types";
import { useAccountsStore } from "../../stores/accounts";
import { setNewSelectData } from "../../utils/functions";
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
    accountsStore.updateAccount(account.id, { [field]: value });
    accountsStore.saveToLocalStorage();
  }
};
</script>

<template>
  <tr class="table-row">
    <td>
      <UIInput
        type="text"
        :required="false"
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
        @update:model-select="accountsStore.updateAccount(account.id, $event)"
      />
    </td>

    <td :colspan="account.recordType !== 'Локальная' ? 2 : 1">
      <UIInput
        type="text"
        :required="true"
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
        :required="true"
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
        @click="accountsStore.removeAccount(account.id)"
      />
    </td>
  </tr>
</template>

<style scoped lang="scss">
td {
  padding: 10px;
  vertical-align: baseline;
}
</style>
