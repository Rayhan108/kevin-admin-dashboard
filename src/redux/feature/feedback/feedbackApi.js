import { baseApi } from "../../api/baseApi";

const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFeedback: builder.query({
      query: () => ({
        url: `/user/allFeedback`,
        method: "GET",
        // params: { page, role,search },
      }),
    }),
    replyFeedback: builder.mutation({
      query: ({payload,id}) => ({
        url: `/user/feedbackReply/${id}`,
        method: "PATCH",
        // params: { page, role,search },
        body: payload,
      }),
    }),
  }),
});

export const { useGetAllFeedbackQuery, useReplyFeedbackMutation } = feedbackApi;
