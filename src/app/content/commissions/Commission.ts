import { Appliance } from "../appliances/models";
import { Technician, TechnicianTerm } from "../technicians/models";
import { Client } from "../clients/Client";

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
  client?: Client;
}
