import { Commission } from "../commissions/Commission";

export class Technician {
  id?: number;
  name?: string;
  lastName?: string;
  phoneNumber?: string;
  workingDays?: WorkingDay[];
}

export interface TechnicianTerm {
  id: number,
  hour: Hour,
  date: Date,
  technicianWorkingDay: WorkingDay
  commission?: Commission
}

export interface WorkingDay {
  id: number;
  date: Date;
  technician: Technician;
  technicianTerms: TechnicianTerm[];
}

export enum Hour {
  EIGHT= "8:00",
  TEN= "10:00",
  TWELVE= "12:00",
  FOURTEEN= "14:00",
  SIXTEEN= "16:00",
  EIGHTEEN= "18:00"
}
