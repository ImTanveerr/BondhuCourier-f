// src/redux/features/parcel/trackApi.ts
import { baseApi } from "@/redux/baseApi";
import { ITrackingEvent } from "@/types/parcel.types";
import { IResponse } from "@/types";

export const trackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    trackParcel: builder.query<ITrackingEvent[], string>({
      query: (trackingId) => ({
        url: `/user/track-parcel/${trackingId}`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<ITrackingEvent[]>) => response.data || [],
    }),
  }),
});

export const { useTrackParcelQuery } = trackApi;
