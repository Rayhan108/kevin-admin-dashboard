import { baseApi } from "../../api/baseApi";

const docApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDoc: builder.query({
      query: () => ({
        url: `/verify/all-doc`,
        method: "GET",
        // params: { page, role,search },
      }),
    }),
    UpdateDocStatus: builder.mutation({
      query: (payload) => ({
        url: `/verify/updateStatus`,
        method: "PATCH",
        // params: { page, role,search },
        body: payload,
      }),
    }),
  }),
});

export const { useGetAllDocQuery, useUpdateDocStatusMutation } = docApi;
