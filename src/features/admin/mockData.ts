import type { ClinicUser } from "./types";

export const mockClinicUsers: ClinicUser[] = [
  {
    id: "STF_001",
    name: "Dr. Sarah Smith",
    role: "staff",
    department: "General Medicine",
    email: "sarah.s@bit.edu.et",
    isAccountActive: true,
  },
  {
    id: "STF_002",
    name: "Dr. Alemayehu Tadesse",
    role: "staff",
    department: "Dental Clinic",
    email: "alem.t@bit.edu.et",
    isAccountActive: true,
  },
  {
    id: "ADM_001",
    name: "Lidet Kebede",
    role: "admin",
    department: "Clinic Management",
    email: "lidet.k@bit.edu.et",
    isAccountActive: true,
  },
  {
    id: "STF_003",
    name: "Mr. Tola Gemeda",
    role: "staff",
    department: "Pharmacy",
    email: "tola.g@bit.edu.et",
    isAccountActive: false,
  },
];
