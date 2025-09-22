import { baseApi } from "../../api/baseApi";

const othersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCate: builder.query({
      query: (page) => ({
        url: `/category/all-category`,
        method: "GET",
        params: { page},
      }),
    }),
    createCat: builder.mutation({
      query: (payload) => ({
        url: `/category/add-category`,
        method: "POST",
        // params: { page, role,search },
        body: payload,
      }),
    }),
    editCat: builder.mutation({
      query: ({payload,id}) => ({
        url: `/category/edit-category/${id}`,
        method: "PATCH",

        body: payload,
      }),
    }),
    deleteCat: builder.mutation({
      query: (id) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",

      }),
    }),
  }),
});

export const { useGetAllCateQuery, useCreateCatMutation,useDeleteCatMutation,useEditCatMutation} = othersApi;
