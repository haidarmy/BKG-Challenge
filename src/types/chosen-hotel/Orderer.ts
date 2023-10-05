export type User = {
  prefix: string;
  name: string;
  email: string;
  phone: string;
};

export interface GuestData {
  id: string;
  prefix: 'Tn.' | 'Ny.';
  name: string;
  isChosen: boolean;
}
