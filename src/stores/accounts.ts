import { computed, ref } from "vue";

import type { IStateAccount } from "../types";
import { defineStore } from "pinia";

export const useAccountsStore = defineStore("accounts", () => {
  const accounts = ref<IStateAccount[]>([
    {
      id: 1,
      label: "ХХХ",
      recordType: "Локальная",
      login: "Значение",
      password: "123456",
      labelsArray: [{ text: "ХХХ" }],
    },
    {
      id: 2,
      label: "ХХХ; УУУУУУУУУУ; ШШШЕ; МММММММММ",
      recordType: "Локальная",
      login: "Значение",
      password: "123456",
      labelsArray: [
        { text: "ХХХ" },
        { text: "УУУУУУУУУУ" },
        { text: "ШШШЕ" },
        { text: "МММММММММ" },
      ],
    },
    {
      id: 3,
      label: "ХХХ",
      recordType: "Локальная",
      login: "Значение",
      password: "123456",
      labelsArray: [{ text: "ХХХ" }],
    },
    {
      id: 4,
      label: "Значение",
      recordType: "LDAP",
      login: "Значение",
      password: "123456",
      labelsArray: [{ text: "ХХХ" }],
    },
  ]);

  const nextId = computed(() => {
    return accounts.value.length + 1;
  });

  const stored = localStorage.getItem("accounts");
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as IStateAccount[];
      accounts.value = parsed;
    } catch (e) {
      console.error("Ошибка при парсинге accounts из localStorage", e);
    }
  }

  const addAccount = (account: Omit<IStateAccount, "id">) => {
    accounts.value.push({
      id: nextId.value,
      ...account,
    });
    
  };

  const addEmptyRow = () => {
    accounts.value.push({
      id: nextId.value,
      label: "",
      recordType: "Локальная",
      login: "",
      password: "",
    });
  };

  const updateAccount = (id: number, updated: Partial<IStateAccount>) => {
    const index = accounts.value.findIndex((acc) => acc.id === id);
    if (index !== -1) {
      const account = accounts.value[index] as IStateAccount;
      accounts.value[index] = { ...account, ...updated };
    }
    saveToLocalStorage();
  };

  const removeAccount = (id: number) => {
    accounts.value = accounts.value.filter((acc) => acc.id !== id);

    saveToLocalStorage();
  };

const saveToLocalStorage = () => {

  const validAccounts = accounts.value.filter(account => {
    const hasLogin = account.login && account.login.trim() !== "";
    const hasRecordType = account.recordType;
    
    if (account.recordType === "Локальная") {
      return hasLogin && hasRecordType && account.password && account.password.trim() !== "";
    }
    
 
    return hasLogin && hasRecordType;
  });
  
  localStorage.setItem("accounts", JSON.stringify(validAccounts));
};

  const reset = () => {
    accounts.value = [];
    localStorage.removeItem("accounts");
  };

  return {
    accounts,
    nextId,
    addAccount,
    addEmptyRow,
    updateAccount,
    removeAccount,
    reset,
    saveToLocalStorage,
  };
});
