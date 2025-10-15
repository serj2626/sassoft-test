export function getStringFromArray(labels: string[]) {
  return labels.join(";");
}

export const getArrayFromLabels = (labels: string): { text: string }[] => {
  return labels.split(";")
    .map(label => label.trim())
    .filter(label => label.length > 0)
    .map(label => ({ text: label }));
};