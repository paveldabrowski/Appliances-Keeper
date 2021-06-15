import { Appliance } from "../appliances/models";
import { Technician, TechnicianTerm } from "../technicians/models";

export class Commission {

  id?: number;
  appliance?: Appliance;
  creationDate?: Date;
  problemDescription?: string;
  adviceGiven?: boolean;
  technician?: Technician;
  repairDate?: TechnicianTerm;
  technicianReport?: string;
  clientVisited?: boolean;
  commissionStatus?: boolean;
}
