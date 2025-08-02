import { loginSuccess } from "@/store/slices/auth_slice";

export const userLogin = (build: any) => {
  return build.mutation({
    query: (payload: { email: string; password: string; role: "admin" }) => {
      console.log("Payload being sent to /user/login:", payload);
      return {
        url: `/user/login`,
        method: "POST",
        data: payload,
      };
    },
    async onQueryStarted(payload: any, { queryFulfilled, dispatch }: any) {
      console.log("onQueryStarted - payload:", payload);
      try {
        const { data } = await queryFulfilled;
        console.log("Login API response:", data);
        const { user, token } = data?.data ?? {};

        if (user && token) {
          localStorage.setItem("authToken", token);
          dispatch(loginSuccess({ email: user.email, name: "Admin" }));
        }
      } catch (err: any) {
        console.error("Login API error:", err);
      }
    },
  });
};
