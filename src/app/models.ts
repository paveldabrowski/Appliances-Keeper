export interface Client {
  id?: number;
  name: string;
  lastName?: string;
  nip: string;
  regon: string;
  type: ClientType;
  street: string;
  building: string;
  apartment: string;
  zipCode: string;
  city: string;
  phoneNumber: string;
  email: string;
  description?: string;
};

export enum ClientType {
  individual,
  business
}
