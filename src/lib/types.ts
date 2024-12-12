export type OrderStatus =
  | "NOT_STARTED"
  | "STARTED"
  | "IN_EDITING"
  | "IN_REVIEW"
  | "COMPLETED"
  | "CANCELLED";

export interface Order {
  id: string;
  customerName: string;
  shootDate: string;
  location: string;
  status: OrderStatus;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Define UserRole as a const object to use as a type
export const UserRole = {
  ADMIN: "ADMIN",
  PROVIDER: "PROVIDER",
  CUSTOMER: "CUSTOMER",
} as const;

// Create a type from the values of UserRole
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface CreateUserInput {
  id: string;
  email: string | null;
  name: string | null;
  avatar: string | null;
  role: UserRole;
}

export interface Order {
  id: string;
  photographerId: string;
  editorId?: string;
  workspaceId: string;
  orderDate: string;
  scheduledDate: string;
  location: string;
  status: OrderStatus;
  requirements?: string;
  photoCount?: number;
  videoCount?: number;
  deliveryDate?: string;
}
