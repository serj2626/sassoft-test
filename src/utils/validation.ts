export function checkLength(
  value: string,
  mode: "label" | "login" | "password"
): string | null {
  const validationsData = {
    label: { min: 0, max: 50 },
    login: { min: 3, max: 100 },
    password: { min: 3, max: 100 },
  };

  const validation = validationsData[mode];

  if ((mode === "login" || mode === "password") && !value.trim()) {
    return "Поле не может быть пустым";
  }

  if (value.length < validation.min) {
    return `Поле должно содержать не менее ${validation.min} символов`;
  }

  if (value.length > validation.max) {
    return `Поле должно содержать не более ${validation.max} символов`;
  }

  return null;
}

export function getArrayFromLabels(labels: string): string[] {
  return labels
    .split(";")
    .map((label) => label.trim())
    .filter((label) => label.length > 0);
}

export function validateLabels(labels: string): string | null {
  if (!labels.trim()) {
    return null;
  }

  if (checkLength(labels, "label")) {
    return checkLength(labels, "label");
  }

  // Проверка на пробелы как разделители (строгая версия)
  const hasSpaceAsSeparator = /[^;]\s+[^;]/.test(labels);
  if (hasSpaceAsSeparator) {
    return "Для разделения меток используйте точку с запятой (;), а не пробелы";
  }

  // Проверка на запятые как разделители
  if (labels.includes(",")) {
    return "Для разделения меток используйте точку с запятой (;), а не запятые";
  }

  // Проверка на несколько разделителей подряд
  if (/;;/.test(labels)) {
    return "Нельзя использовать несколько разделителей подряд";
  }

  // Проверка на разделитель в начале или конце
  if (labels.startsWith(";") || labels.endsWith(";")) {
    return "Разделитель не может быть в начале или конце списка меток";
  }

  return null;
}
