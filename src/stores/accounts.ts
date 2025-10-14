import { computed, ref, watchEffect } from "vue";

import type { IStateAccount } from "../types";
import { defineStore } from "pinia";

export const useAccountsStore = defineStore("accounts", () => {
  const accounts = ref<IStateAccount[]>([
    {
      id: 1,
      label: "ХХХ",
      recordType: "Локальная",
      login: "Значение",
      password: "●●●●●",
    },
    {
      id: 2,
      label: "ХХХ; УУУУУУУУУУ; ШШШЕ; МММММММММ",
      recordType: "Локальная",
      login: "Значение",
      password: "●●●●●",
    },
    {
      id: 3,
      label: "ХХХ",
      recordType: "Локальная",
      login: "Значение",
      password: "●●●●●",
    },
    {
      id: 4,
      label: "Значение",
      recordType: "LDAP",
      login: "Значение",
      password: "●●●●●",
    },
    {
      id: 5,
      label: "Значение",
      recordType: "LDAP",
      login: "Значение",
      password: "●●●●●",
    },
  ]);
  
  const nextId = computed(() => {
    return Math.max(...accounts.value.map((a) => a.id)) + 1;
  });

  const stored = localStorage.getItem("accounts");
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as IStateAccount[];
      accounts.value = parsed;

      nextId.value = parsed.length
        ? Math.max(...parsed.map((a) => a.id)) + 1
        : 1;
    } catch (e) {
      console.error("Ошибка при парсинге accounts из localStorage", e);
    }
  }

  watchEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts.value));
  });

  const addAccount = (account: Omit<IStateAccount, "id">) => {
    accounts.value.push({
      id: nextId.value++,
      ...account,
    });
  };

  const updateAccount = (id: number, updated: Partial<IStateAccount>) => {
    const index = accounts.value.findIndex((acc) => acc.id === id);
    if (index !== -1) {
      const account = accounts.value[index] as IStateAccount;
      accounts.value[index] = { ...account, ...updated };
    }
  };
  const removeAccount = (id: number) => {
    accounts.value = accounts.value.filter((acc) => acc.id !== id);
  };

  const reset = () => {
    accounts.value = [];
    nextId.value = 1;
    localStorage.removeItem("accounts");
  };

  return {
    accounts,
    addAccount,
    updateAccount,
    removeAccount,
    reset,
    nextId,
  };
});
