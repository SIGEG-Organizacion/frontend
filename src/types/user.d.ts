export type UserRole = "student" | "company" | "adminTFG" | "adminLink";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string; // Optional for students and companies
  validated?: boolean; // Optional, true if the user has validated their email
  resetToken?: string; // Optional, used for password reset
  resetTokenExpiration?: Date; // Optional
}
