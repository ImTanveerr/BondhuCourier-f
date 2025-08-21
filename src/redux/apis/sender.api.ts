import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types";
import { IParcel } from "@/types/parcel.types";
export const senderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addParcel: builder.mutation({
            query: (parcelData: any) => ({
                url: "/sender/create",
                method: "POST",
                body: parcelData,
                headers: { "Content-Type": "application/json" },
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
        getMyParcels: builder.query<IParcel[], void>({
            query: () => ({
                url: "/parcel/get",
                method: "GET",
            }),
            providesTags: ["PARCEL"],
            transformResponse: (response: IResponse<IParcel[]>) => response.data,
        }),
    }),
});



export const { useAddParcelMutation, useGetMyParcelsQuery, useCancelParcelMutation } = senderApi;

