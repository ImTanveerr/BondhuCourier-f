import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types";
import { IParcel } from "@/types/parcel.types";
export const receiverApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getMyParcels: builder.query<IParcel[], void>({
            query: () => ({
                url: "/parcel/get",
                method: "GET",
            }),
            providesTags: ["PARCEL"],
            transformResponse: (response: IResponse<IParcel[]>) => response.data,
        }),
        receiveParcel: builder.mutation<IParcel, string>({
            query: (parcelId:string) => ({
                url: `/receiver/accept/${parcelId}`, // match backend
                method: "POST",
            }),
            invalidatesTags: ["RECEIVER"],
        }),
        returnParcel: builder.mutation<IParcel, string>({
            query: (parcelId:string) => ({
                url: `/receiver/return/${parcelId}`, // match backend
                method: "POST",
            }),
            invalidatesTags: ["PARCEL"],
        }),
    }),
});



export const { useGetMyParcelsQuery, useReceiveParcelMutation,
    useReturnParcelMutation, } = receiverApi;

