export function checkLength(value: string, min: number = 1, max: number) {
  const res = value.length >= min && value.length <= max;
  if (res) return true;
  return `Поле должно содержать не более ${max} символов`;
}
