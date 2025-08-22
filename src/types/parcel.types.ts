export enum ParcelStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  DISPATCHED = "DISPATCHED",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",

  CANCELLED = "CANCELLED",
  RECEIVED = "RECEIVED",
  RETURNED = "RETURNED"
}

export enum ParcelType {
  DOCUMENT = "DOCUMENT",
  BOX = "BOX",
  FRAGILE = "FRAGILE",
  OTHER = "OTHER",
}

export interface ITrackingEvent {
  location: string;
  status: ParcelStatus;
  timestamp: Date;
  note?: string;
}

export interface IParcel {
  _id: string;

  senderId: string;
  receiverId: string;

  pickupAddress: string;
  deliveryAddress: string;
  contactNumber: string;

  weight: number;
  cost: number;
  parcelType: ParcelType;
  description?: string;

  status?: ParcelStatus;

  trackingId?: string;
  trackingEvents?: ITrackingEvent[];

  createdAt?: Date;
  updatedAt?: Date;
}