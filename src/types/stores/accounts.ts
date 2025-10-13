export interface IStateAccount {
  id: number
  label: string
  recordType: 'Локальная' | 'LDAP'
  login: string
  password: string | null
}
