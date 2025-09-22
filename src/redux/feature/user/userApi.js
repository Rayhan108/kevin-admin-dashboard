import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: ({ page, role, search }) => ({
        url: `/user/allUser`,
        method: "GET",
        params: { page, role, search },
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/deleteUser/${id}`,
        method: "Delete",
      }),
    }),
  }),
});

export const { useGetAllUserQuery, useDeleteUserMutation } = userApi;
