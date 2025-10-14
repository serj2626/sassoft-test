export function setNewSelectData(recordType: string) {
  const newData =
    recordType === "LDAP" ? { recordType, password: null } : { recordType };
  return newData;
}

export function getArrayFromLabels(labels: string) {
  return labels.split(";").map((label) => label.trim());
}
