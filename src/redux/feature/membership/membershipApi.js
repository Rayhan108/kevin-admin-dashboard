import { baseApi } from "../../api/baseApi";

const membershipApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    addFees: builder.mutation({
      query: (payload) => ({
        url: `/membership/addFee`,
        method: "POST",
        // params: { page, role,search },
        body: payload,
      }),
    }),
        getAllFees: builder.query({
      query: () => ({
        url: `/membership/getFees`,
        method: "GET",
        // params: { page, role,search },
      }),
    }),
  }),
});

export const {useAddFeesMutation,useGetAllFeesQuery } = membershipApi;
