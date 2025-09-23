import { baseApi } from "../../api/baseApi";

const othersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCate: builder.query({
      query: (page) => ({
        url: `/category/all-category`,
        method: "GET",
        params: { page },
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
      query: ({ payload, id }) => ({
        url: `/category/edit-category/${id}`,
        method: "PATCH",

        body: payload,
      }),
    }),
    updateBlogStatus: builder.mutation({
        query: (payload) => ({
        url: `/article/update-status`,
        method: "PATCH",
        // params: { page, role,search },
        body: payload,
      }),
    }),
    deleteCat: builder.mutation({
      query: (id) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
      }),
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/article/delete-article/${id}`,
        method: "DELETE",
      }),
    }),
    createBlogs: builder.mutation({
      query: (payload) => ({
        url: `/article/create-article`,
        method: "POST",
        body:payload,
      }),
    }),
    allBlogs: builder.query({
      query: (page) => ({
        url: `/article/allArticle`,
        method: "GET",
        params:{page}
    
      }),
    }),
  }),
});

export const {
  useGetAllCateQuery,
  useCreateCatMutation,
  useDeleteCatMutation,
  useEditCatMutation,
  useCreateBlogsMutation,
  useAllBlogsQuery,
  useUpdateBlogStatusMutation,
  useDeleteBlogMutation
} = othersApi;
