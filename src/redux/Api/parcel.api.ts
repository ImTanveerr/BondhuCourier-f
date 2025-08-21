// // redux/features/Parcel/parcel.api.ts
// import { baseApi } from "@/redux/baseApi";
// import { IResponse } from "@/types";
// import { IParcel } from "@/types/parcel.types";
// export const parcelApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getMyParcels: builder.query<IParcel[], void>({
//       query: () => ({
//         url: "/parcel/get",
//         method: "GET",
//       }),
//       providesTags: ["PARCEL"],
//       transformResponse: (response: IResponse<IParcel[]>) => response.data,
//     }),
//   }),
// });

// export const { useGetMyParcelsQuery } = parcelApi;
