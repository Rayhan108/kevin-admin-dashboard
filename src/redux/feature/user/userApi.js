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
       updateProfile: builder.mutation({
      query: ({id,payload}) => ({
        url: `/user/edit-profile/${id}`,
        method: "PATCH",
        body:payload
      }),
    }),
    specUser: builder.query({
      query: (id) => ({
        url: `/user/retrive/${id}`,
        method: "GET",
       
      }),
    }),
  }),
});

export const { useGetAllUserQuery, useDeleteUserMutation,useUpdateProfileMutation,useSpecUserQuery } = userApi;
