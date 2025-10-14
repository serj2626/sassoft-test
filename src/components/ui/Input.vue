<script setup lang="ts">
import { computed, ref } from "vue";
import { checkLength, validateLabels } from "../../utils/validation";

type TInputTypes = "email" | "number" | "password" | "tel" | "text";

defineEmits(["update:input-value"]);

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
  inputValue,
} = defineProps<IInputProps>();

const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);
const error = ref<string | null>(null);
const showPassword = ref(false);

const currentType = computed(() => {
  if (type === "password" && showPassword.value) {
    return "text";
  }
  return type;
});

const handleFocus = () => {
  error.value = null;
  isFocused.value = true;
};

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  const target = event.target as HTMLInputElement;
  const value = target.value;

  if (mode === "label") {
    const validationError = validateLabels(value);
    error.value = validationError;
  } else {
    const res = checkLength(value, mode);
    error.value = res || null;
  }
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
      :value="inputValue"
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
