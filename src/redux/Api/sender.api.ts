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



export const { useAddParcelMutation ,useGetMyParcelsQuery} = senderApi;

