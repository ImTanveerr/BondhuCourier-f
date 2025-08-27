import { baseApi } from "../baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation<
      { success: boolean; message: string; data: any }, // response type
      { name: string; email: string; subject: string; message: string } // request body
    >({
      query: (body) => ({
        url: "/contact",
        method: "POST",
        data: body,
      }),
    }),

    getAllContacts: builder.query<
      { success: boolean; data: any[] }, // response type
      void
    >({
      query: () => ({
        url: "/contact",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateContactMutation, useGetAllContactsQuery } = contactApi;
