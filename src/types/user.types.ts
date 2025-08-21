
export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    SENDER = "SENDER",
    RECEIVER = "RECEIVER",
}


export interface IAuthProvider {
    provider: "google" | "credentials";  // "Google", "Credential"
    providerId: string;
}

export enum UserStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED",
    BANNED = "BANNED"
}

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    phone?: string;
    picture?: string;
    address?: string;
    isDeleted?: string;
    Status?: UserStatus;
    isVerified?: boolean;
    role: Role;
    auths: IAuthProvider[];
    createdAt?: Date

}