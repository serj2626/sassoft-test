export const validateComment = (value: string) => {
  const maxLength = {
    condition: 600,
    message: "Максимальная длина - 600 символов",
  };
  const pattern = {
    condition: /^[\wа-яА-ЯёЁ\d.,?!:;()%№@+="\s-]+$/,
    message:
      'Поле может содержать только русские/латинские буквы и символы "-.,?!-:;()%№@+="',
  };

  switch (true) {
    case String(value).length === 0:
      return "Поле не может быть пустым";
    case String(value).length > maxLength.condition:
      return maxLength.message;

    case !String(value).match(pattern.condition):
      return pattern.message;

    default:
      return "";
  }
};

export const validatePhoneNumber = (value: string | number) => {
  value = String(value).replace(/[^0-9]/g, "");

  const length = {
    condition: 11,
    message: "Некорректно введен номер телефона",
  };

  if (String(value).length === 0) {
    return "Поле не может быть пустым";
  }

  if (String(value).length !== length.condition) {
    return length.message;
  }

  return "";
};

export const validateServiceId = (value: number) => {
  if (isNaN(value)) {
    return "Выберите услугу";
  }

  return "";
};

export type TFormData = {
  [key: string]: {
    value: string | number;
    error: string;
    required: boolean;
  };
};

export const checkForm = (formData: TFormData): boolean => {
  let error = false;

  for (const key in formData) {
    if (formData[key].required) {
      if (key === "phone") {
        formData[key].error = validatePhoneNumber(formData[key].value);
        if (formData[key].error) {
          error = true;
        }
      } else if (key === "service") {
        formData[key].error = validateServiceId(Number(formData[key].value));
        if (formData[key].error) {
          error = true;
        }
      } else if (key === "name") {
        formData[key].error = validateFullName(String(formData[key].value));
        if (formData[key].error) {
          error = true;
        }
      } else if (key === "message") {
        formData[key].error = validateComment(String(formData[key].value));
        if (formData[key].error) {
          error = true;
        }
      }
    }
  }
  return error;
};
