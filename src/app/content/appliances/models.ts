export class Model {
  id?: number;
  name?: string;
  brand?: Brand;
  applianceType?: ApplianceType;
}

export class Brand {
  id?: number;
  name?: string;
}

export class Appliance {
  id?: number;
  serialNumber?: string;
  model?: Model;
  brand?: Brand;
}

export class ApplianceType {
  id?: number;
  name?: string;
}
