import { Optional } from "sequelize";

// ✅ Define `UserAttributes` (Full user model)
export interface UserAttributes {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  website?: string;
  coverage?: string;
  linkedin?: string;
  useruimage?: string;
  vendor?: string;
  userrole: "admin" | "vendor" | "client";
  smtpemail?: string;
  smtppassword?: string;
  smtpincomingserver?: string;
  smtpoutgoingserver?: string;
  smtpport?: string;
  branchname?: string;
  branchslug?: string;
  branchcountry?: string;
  branchaddress?: string;
  brancheader?: string;
  branchnavbar?: string;
  branchnavtext?: string;
  branchnavhover?: string;
  branchlogo?: string;
  branchlogoheight?: string;
  branchlogowidth?: string;
  block?: boolean;
  referred_to?: string;
  last_login?: Date;
  token?: string;
  created_at?: Date;
  updated_at?: Date;
}

// ✅ Define `UserCreationAttributes` (For user registration, excluding auto-generated fields)
export type UserCreationAttributes = Optional<
  UserAttributes,
  "id" | "token" | "created_at" | "updated_at"
>;
