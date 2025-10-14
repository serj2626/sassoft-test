<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

interface ISelectOption {
  id: number;
  label: string;
}

const options = ref<ISelectOption[]>([
  { id: 1, label: "Локальная" },
  { id: 2, label: "LDAP" },
]);

interface Props {
  modelValue?: string | number;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Выберите опцию",
});

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
}>();

const isOpen = ref(false);
const selectRef = ref<HTMLElement>();

// Выбранное значение


// Проверка выбранной опции
const isSelected = (value: string | number) => value === props.modelValue;

// Переключение dropdown
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Выбор опции
const selectOption = (option: ISelectOption) => {

  emit("update:modelValue", option.label);
  isOpen.value = false;
};

// Закрытие при клике мимо
const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

// Обработчик клавиатуры
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    isOpen.value = false;
  }
};

// Добавляем обработчики
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleKeydown);
});

// Убираем обработчики
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleKeydown);
});
</script>
<template>
  <div class="select" ref="selectRef">
    <div
      class="select__trigger"
      :class="{ 'select__trigger--open': isOpen }"
      @click="toggleDropdown"
    >
      <span class="select__value">
       sad
      </span>
      <UIIcon
        name="arrow_down"
        size="18"
        :class="['select__arrow', { 'select__arrow--open': isOpen }]"
      />
    </div>

    <div v-show="isOpen" class="select__dropdown">
      <div
        v-for="option in options"
        :key="option.id"
        class="select__option"
        :class="{
          'select__option--selected': isSelected(option.label),
        }"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.select {
  position: relative;
  width: 100%;
  max-width: 300px;
}

.select__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border: 1px solid $border-color;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}

.select__trigger:hover {
  border-color: #c0c4cc;
}

.select__trigger--open {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.select__value {
  color: #606266;
}

.select__arrow {
  transition: transform 0.3s ease;
  color: #c0c4cc;
}

.select__arrow--open {
  transform: rotate(180deg);
}

.select__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 4px;
}

.select__option {
  padding: 10px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.select__option:hover {
  background-color: #f5f7fa;
}

.select__option--selected {
  background-color: #ecf5ff;
  color: #409eff;
}

.select__option--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.select__option--disabled:hover {
  background-color: transparent;
}
</style>
