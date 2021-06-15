export class Technician {
  id?: number;
  name?: string;
  lastName?: string;
  phoneNumber?: string;
  availableTerms?: TechnicianTerm[];
}

export class TechnicianTerm {
  id?: number;
  availableDate?: Date;
  isAvailable?: boolean;
}
