import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types";
import { IParcel, ParcelType } from "@/types/parcel.types";

export interface ICreateParcel {
    senderId: string;
    receiverId: string;
    pickupAddress: string;
    deliveryAddress: string;
    contactNumber: string;
    weight: number;
    parcelType: ParcelType;
    description?: string;
}
export const senderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addParcel: builder.mutation<IParcel, ICreateParcel>({
            query: (parcelData) => ({
                url: "/sender/create",
                method: "POST",
                data: parcelData,
                //headers: { "Content-Type": "application/json" },
            }),
            invalidatesTags: ["SENDER"],
        }),
        cancelParcel: builder.mutation({
            query: (parcelId: string) => ({
                url: `/sender/Cancel/${parcelId}`,
                method: "POST",
            }),
            invalidatesTags: ["PARCEL"], // So that parcels list auto-refreshes after cancel
        }),
        
        acceptReturn: builder.mutation({
            query: (parcelId: string) => ({
                url: `/sender/Accept/${parcelId}`,
                method: "POST",
            }),
            invalidatesTags: ["PARCEL"], // So that parcels list auto-refreshes after cancel
        }),

        getMyParcels: builder.query<IParcel[],  { page: number; limit?: number }>({
            query: (params) => ({
                url: "/parcel/get",
                method: "GET",
                params,
            }),
            providesTags: ["PARCEL"],
            transformResponse: (response: IResponse<IParcel[]>) => response.data,
        }),
    }),
});



export const { useAddParcelMutation, useGetMyParcelsQuery, useCancelParcelMutation,useAcceptReturnMutation } = senderApi;

