import { ref, watch } from "vue";

import type { IStateAccount } from "../types";
import { defineStore } from "pinia";

export const useAccountsStore = defineStore("accounts", () => {
  const accounts = ref<IStateAccount[]>([]);
  const nextId = ref(1);

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

  watch(
    accounts,
    (val) => {
      localStorage.setItem("accounts", JSON.stringify(val));
    },
    { deep: true }
  );

  const addAccount = (account: Omit<IStateAccount, "id">) => {
    accounts.value.push({
      id: nextId.value++,
      ...account,
    });
  };

  const updateAccount = (id: number, updated: Partial<IStateAccount>) => {
    const index = accounts.value.findIndex((acc) => acc.id === id);
    if (index !== -1) {
      accounts.value[index] = { ...accounts.value[index], ...updated };
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
  };
});
