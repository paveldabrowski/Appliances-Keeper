export class Model {
  id?: number;
  name?: string;
  brand?: Brand;
}

export class Brand {
  id?: number;
  name?: string;
  modelList?: Model[];
}

export class Appliance {
  id?: number;
  serialNumber?: string;
  model?: Model;
  brand?: Brand;
  applianceType?: ApplianceType;
}

export class ApplianceType {
  id?: number;
  name?: string;
}
