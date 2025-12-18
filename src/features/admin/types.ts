// Re-using the User type but for Admin-specific views
export interface ClinicUser {
  id: string;
  name: string;
  role: "student" | "staff" | "admin";
  department: string;
  email: string;
  isAccountActive: boolean;
}
