import type { MedicalRecord } from "./types";

export const mockRecords: MedicalRecord[] = [
  {
    id: "rec_001",
    date: "Dec 12, 2025",
    doctorName: "Dr. Sarah Smith",
    doctorRole: "General Physician",
    department: "General Medicine",
    diagnosis: "Acute Bronchitis",
    visitType: "Consultation",
    status: "Completed",
    prescription: ["Azithromycin 500mg", "Cough Syrup", "Paracetamol"],
    notes:
      "Patient advised to rest for 3 days. Chest X-ray clear. Drink plenty of fluids.",
  },
  {
    id: "rec_002",
    date: "Nov 28, 2025",
    doctorName: "Dr. James Wilson",
    doctorRole: "Dermatologist",
    department: "Dermatology",
    diagnosis: "Allergic Dermatitis",
    visitType: "Checkup",
    status: "Follow-up",
    prescription: ["Cetirizine 10mg", "Hydrocortisone Cream"],
    notes: "Mild rash on left arm. Follow up in 2 weeks if symptoms persist.",
  },
  {
    id: "rec_003",
    date: "Oct 15, 2025",
    doctorName: "Dr. Emily Chen",
    doctorRole: "Nutritionist",
    department: "Wellness Center",
    diagnosis: "Vitamin D Deficiency",
    visitType: "Consultation",
    status: "Completed",
    prescription: ["Vitamin D3 60k IU", "Calcium Supplements"],
    notes:
      "Dietary changes recommended. Increase intake of dairy and leafy greens.",
  },
  {
    id: "rec_004",
    date: "Sept 10, 2025",
    doctorName: "Lab Technician",
    doctorRole: "Pathology",
    department: "Laboratory",
    diagnosis: "Routine Blood Work",
    visitType: "Checkup",
    status: "Pending Results",
    prescription: [],
    notes:
      "Samples collected for CBC and Lipid Profile. Results expected in 24 hours.",
  },
];
