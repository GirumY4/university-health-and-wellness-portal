export type RecordStatus = "Completed" | "Follow-up" | "Pending Results";

export interface MedicalRecord {
  id: string;
  date: string;
  doctorName: string;
  doctorRole: string;
  department: string;
  diagnosis: string;
  visitType: "Emergency" | "Checkup" | "Consultation";
  status: RecordStatus;
  prescription: string[];
  notes: string;
}
