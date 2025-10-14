<script setup lang="ts">
import { computed, ref } from "vue";

const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};

type TInputTypes =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

interface IInputProps {
  placeholder?: string;
  type?: TInputTypes;
}

const inputValue = defineModel<string>("inputValue");
const error = defineModel<string>("error");

const props = defineProps<IInputProps>();

const showPassword = ref(false);

const currentType = computed(() => {
  if (props.type === "password" && showPassword.value) {
    return "text";
  }
  return props.type;
});
</script>
<template>
  <label
    class="base-input"
    :class="{
      'base-input_isfocused': isFocused,
      'base-input_error': error && !inputValue,
    }"
  >
    <input
      ref="inputRef"
      v-model="inputValue"
      :type="currentType"
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
      :name="showPassword ? 'eye_close' : 'eye_open'"
      size="20"
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
  border-radius: 10px;
  transition: outline 0.6s ease-in;

  &_isfocused {
    outline: 1px solid $accent;
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
    color: $white;
    transition: outline 0.6s ease-in;

    // &:focus {
    //   .base-input {
    //     outline: 1px solid $accent;
    //   }
    // }
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
