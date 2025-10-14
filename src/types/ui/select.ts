export interface ISelectOption {
  id: number;
  label: string;
}

export interface ISelectProps {
  modelValue?: string | number;
  placeholder?: string;
  options: ISelectOption[];
}