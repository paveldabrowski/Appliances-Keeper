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
  individual,
  business
}
