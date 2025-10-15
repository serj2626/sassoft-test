<script setup lang="ts">
import { computed, ref } from "vue";

type TInputTypes = "email" | "number" | "password" | "tel" | "text";

const emit = defineEmits<{
  blur: [value: string];
}>();

interface IInputProps {
  placeholder?: string;
  type?: TInputTypes;
  required?: boolean;
  error?: string | null;
}

const {
  placeholder = "Введите текст",
  type = "text",
  error,
} = defineProps<IInputProps>();

const inputValue = defineModel<string>("modelValue");

const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);

const showPassword = ref(false);

const currentType = computed(() => {
  if (type === "password" && showPassword.value) {
    return "text";
  }
  return type;
});

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emit("blur", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <label
    class="base-input"
    :class="{
      'base-input_isfocused': isFocused,
      'base-input_error': error,
    }"
  >
    <input
      ref="inputRef"
      :type="currentType"
      v-model="inputValue"
      class="base-input__input"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <span v-if="!inputValue && !error" class="base-input__placeholder">
      {{ placeholder }}
    </span>

    <small v-if="error" class="base-input__error">
      {{ error }}
    </small>

    <UIIcon
      v-if="type === 'password'"
      :name="showPassword ? 'eye_open' : 'eye_close'"
      size="40"
      class="base-input__icon"
      @click="showPassword = !showPassword"
    />
  </label>
</template>

<style lang="scss" scoped>
.base-input {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
  border: 1px solid $border-color;
  border-radius: 10px;
  width: 100%;
  min-height: 50px;
  transition: all 0.3s ease-in-out;

  &_isfocused {
    border-color: $text-secondary;

    .base-input__placeholder {
      opacity: 0;
      transform: scale(0.8);
    }
  }

  &_error {
    outline: 1px solid $danger;
    border-color: $danger;
    background-color: rgba($danger, 0.05);
  }

  &__placeholder {
    position: absolute;
    color: $txt;
    padding-left: 15px;
    transition: all 0.3s ease-in-out;
    pointer-events: none;
  }

  &__error {
    position: absolute;
    bottom: -20px;
    left: 0;
    color: $danger;
    font-size: 12px;
    font-weight: 500;
  }

  &__input {
    padding: 15px 45px 15px 15px;
    border: none;
    background: transparent;
    border-radius: 5px;
    color: $txt;
    outline: none;
    width: 100%;
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    cursor: pointer;
    color: #c0c4cc;

    &:hover {
      color: #409eff;
    }
  }
}
</style>
