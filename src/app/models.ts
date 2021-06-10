export class Client {

  id?: number;
  name: string | null = null;
  lastName: string | null = null;
  nip?: string;
  regon?: string;
  type: ClientType = ClientType.individual;
  street?: string;
  building?: string;
  apartment?: string;
  zipCode?: string;
  city?: string;
  phoneNumber: string | null = null;
  email?: string;
  description?: string;
}

export enum ClientType {
  individual,
  business
}

