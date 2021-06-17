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
  solutionDescription?: string;
  clientVisited?: boolean;
  commissionStatus?: boolean;
  client?: Client;


  constructor(partial?: Required<Commission>) {
    if (partial) {
      this.id = partial.id;
      this.appliance = partial.appliance;
      this.creationDate = partial.creationDate;
      this.problemDescription = partial.problemDescription;
      this.adviceGiven = partial.adviceGiven;
      this.technician = partial.technician;
      this.repairDate = partial.repairDate;
      this.technicianReport = partial.technicianReport;
      this.solutionDescription = partial.solutionDescription;
      this.clientVisited = partial.clientVisited;
      this.commissionStatus = partial.commissionStatus;
      this.client = partial.client;
    }
  }
}
