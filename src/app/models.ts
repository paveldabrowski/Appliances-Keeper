import { Parser } from "@angular/compiler";

export class Client {

  id?: number | null;
  name: string | null | undefined = null;
  lastName: string | null | undefined = null;
  nip?: string | null;
  regon?: string | null;
  type: ClientType = ClientType.INDIVIDUAL;
  street?: string | null;
  building?: string | null;
  apartment?: string | null;
  zipCode?: string | null;
  city?: string | null;
  phoneNumber: string | null | undefined = null;
  email?: string | null;
  description?: string | null;


  constructor(partial?: Required<Client>) {
    if (partial) {
      this.id = partial.id;
      this.name = partial.name;
      this.lastName = partial.lastName;
      this.nip = partial.nip;
      this.regon = partial.regon;
      this.type = ClientType[partial.type];
      this.street = partial.street;
      this.building = partial.building;
      this.apartment = partial.apartment;
      this.zipCode = partial.zipCode;
      this.city = partial.city;
      this.phoneNumber = partial.phoneNumber;
      this.email = partial.email;
      this.description = partial.description;
    }
  }

  formatToTitleCase(): Client {
    const keys = Object.keys(this);
    keys.forEach(value => {
      switch (value) {
        case "name": {
          if (this.name) {
            this.name = this.name.toLowerCase().split(" ").map((word) => word.charAt(0)
              .toUpperCase() + word.substring(1)).join(" ");
          }
          break;
        }
        case "lastName": {
          if (this.lastName) {
            this.lastName = this.lastName.toLowerCase().split(" ").map((word) => word.charAt(0)
              .toUpperCase() + word.substring(1)).join(" ");
          }
          break;
        }
        case "street": {
          if (this.street) {
            this.street = this.street.toLowerCase().split(" ").map((word) => word.charAt(0)
              .toUpperCase() + word.substring(1)).join(" ");
          }
          break;
        }
        case "city": {
          if (this.city) {
            this.city = this.city.toLowerCase().split(" ").map((word) => word.charAt(0)
              .toUpperCase() + word.substring(1)).join(" ");
          }
          break;
        }
      }
    });
    return this;
  }
}

export enum ClientType {
  INDIVIDUAL= "INDIVIDUAL",
  BUSINESS = "BUSINESS"
}
