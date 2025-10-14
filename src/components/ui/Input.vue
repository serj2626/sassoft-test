<script setup lang="ts">
import { computed, ref } from "vue";

const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);

defineEmits(["update:modelValue"]);

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};

type TInputTypes =
  | "button"
  | "checkbox"
  | "email"
  | "number"
  | "password"
  | "submit"
  | "tel"
  | "text"

interface IInputProps {
  placeholder?: string;
  type?: TInputTypes;
  inputValue?: string;
  required?: boolean;
  mode?: "label" | "login" | "password";
}

const {
  placeholder = "Введите текст",
  type = "text",
  required = false,
  mode = "label",
} = defineProps<IInputProps>();

const error = ref<string | null>(null);

const showPassword = ref(false);

const currentType = computed(() => {
  if (type === "password" && showPassword.value) {
    return "text";
  }
  return type;
});

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
      :value="inputValue"
      class="base-input__input"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span v-if="!inputValue && !error" class="base-input__placeholder">
      {{ placeholder }}</span
    >
    <small v-if="error && !inputValue" class="base-input__error">
      {{ error }}
    </small>
    <UIIcon
      v-if="type === 'password'"
      :name="showPassword ? 'eye_open' : 'eye_close'"
      size="46"
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
  gap: 5px;
  background-color: transparent;
  border: 1px solid $border-color;
  word-break: break-all;
  border-radius: 10px;
  width: 100%;
  word-break: break-word;
  // white-space: pre-wrap;

  &_isfocused {
    .base-input__placeholder {
      opacity: 0;
      scale: 0.1;
    }
  }
  &_error {
    outline: 1px solid $danger;
  }

  &__placeholder {
    position: absolute;
    color: $white;
    padding-left: 15px;
    transition: all 0.5s ease-in-out;
  }
  &__error {
    position: absolute;
    color: $danger;
    padding-left: 15px;
    font-size: 14px;
    font-weight: 600;
  }

  &__input {
    padding: 15px 19px 15px 15px;
    cursor: auto;
    border-radius: 5px;
    color: $txt;
    transition: outline 0.6s ease-in;
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    background-color: $white;
    opacity: 0.7;
    cursor: pointer;
  }
}
</style>
