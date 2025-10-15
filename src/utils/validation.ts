export function checkLength(
  value: string,
  mode: "label" | "login" | "password"
): string | null {
  const validationsData = {
    label: 50,
    login: 100,
    password: 100,
  };

  const res = value.length <= validationsData[mode];
  if (res) return null;
  return `Поле должно содержать не более ${validationsData[mode]} символов`;
}



export function getArrayFromLabels(labels: string): string[] {
  return labels.split(";").map((label) => label.trim()).filter(label => label.length > 0);
}



export function validateLabels(labels: string): string | null {
  if (!labels.trim()) {
    return null;
  }


  if (checkLength(labels, "label")) {
    return checkLength(labels, "label");
  }


  const labelsArray = getArrayFromLabels(labels);
  

  for (const label of labelsArray) {
    if (!label) {
      return "Метки не могут быть пустыми";
    }
    
    if (!/^[a-zA-Zа-яА-Я0-9\s\-_]+$/.test(label)) {
      return "Метки могут содержать только буквы, цифры, пробелы, дефисы и подчеркивания";
    }
  }

  return null;
}
