import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url:"/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    sendOtp: builder.mutation({
      query: (args) => ({
        url: '/auth/forgotPass',
        method: "POST",
        body: args,
        
      }),
      invalidatesTags: ["user"],
    }),
    resendOtp: builder.mutation({
      query: (args) => ({
        url: '/auth/resend-reset-code',
        method: "POST",
        body: args,
        
      }),
      invalidatesTags: ["user"],
    }),
    verifyOtp: builder.mutation({
      query: (args) => ({
        url: '/auth/verifyOtp',
        method: "POST",
        body: args,
        
      }),
      invalidatesTags: ["user"],
    }),

    resetPass: builder.mutation({
      query: (args) => ({
        url: '/auth/resetPass',
        method: "POST",
        body: args,
        
      }),
      invalidatesTags: ["user"],
    }),
    changePassword: builder.mutation({
      query: (args) => ({
        url: '/auth/changePassword',
        method: "POST",
        body: args,
        
      }),
      invalidatesTags: ["user"],
    }),



  }),
});

export const { useLoginMutation,useSendOtpMutation,useVerifyOtpMutation,useResendOtpMutation,useChangePasswordMutation,useResetPassMutation} = authApi;
