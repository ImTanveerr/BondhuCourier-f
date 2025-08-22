// src/redux/features/admin/adminApi.ts
import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types";
import { IParcel } from "@/types/parcel.types";
import { IUser } from "@/types/user.types";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --- GET USERS ---
    getAllUsers: builder.query<IResponse<IUser[]>, void>({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    // --- GET PARCELS ---
    getAllParcels: builder.query<IParcel[], { searchTerm?: string; status?: string; type?: string; sort?: string } | void>({
      query: (filters) => {
        const params = new URLSearchParams();

        if (filters?.searchTerm) params.append("searchTerm", filters.searchTerm);
        if (filters?.status) params.append("status", filters.status);
        if (filters?.type) params.append("type", filters.type);
        if (filters?.sort) params.append("sort", filters.sort);

        return {
          url: `/admin/parcels?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["PARCEL"],
      transformResponse: (response: IResponse<IParcel[]>) => response.data,
    }),


    // --- UPDATE USER ---
    updateUser: builder.mutation<IUser, { id: string; body: Partial<IUser> }>({
      query: ({ id, body }) => ({
        url: `/admin/update-user/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["USER"],
      transformResponse: (res: IResponse<IUser> | any): IUser => res?.data ?? res,
    }),

    // --- BLOCK USER ---
    blockUser: builder.mutation<IUser, string>({
      query: (id) => ({
        url: `/admin/block-user/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),

    // --- UNBLOCK USER ---
    unblockUser: builder.mutation<IUser, string>({
      query: (id) => ({
        url: `/admin/unblock-user/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),

    // --- DELETE USER ---
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),

    // --- UPDATE PARCEL ---
    updateParcel: builder.mutation<IParcel, { id: string; body: Partial<IParcel> }>({
      query: ({ id, body }) => ({
        url: `/admin/parcel/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // --- APPROVE PARCEL ---
    approveParcel: builder.mutation<IParcel, string>({
      query: (id) => ({
        url: `/admin/approve-parcel/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // --- CANCEL PARCEL ---
    cancelParcel: builder.mutation<IParcel, string>({
      query: (id) => ({
        url: `/admin/cancel-parcel/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // --- DELETE PARCEL ---
    deleteParcel: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/delete-parcel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PARCEL"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllParcelsQuery,
  useUpdateUserMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useDeleteUserMutation,
  useUpdateParcelMutation,
  useApproveParcelMutation,
  useCancelParcelMutation,
  useDeleteParcelMutation,
} = adminApi;
