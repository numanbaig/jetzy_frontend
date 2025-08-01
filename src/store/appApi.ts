import { createApi } from "@reduxjs/toolkit/query/react";
import { AxiosInterceptor } from "@/utils/helpers/interceptor";
import { userLogin } from "./services/userService";


const BASE_URL = "http://localhost:8000/api/v1";

const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: AxiosInterceptor().handleRequest({ baseUrl: BASE_URL }),
    
    endpoints: (build: any) => ({
        userLogin: userLogin(build),
    }),
});

export default appApi;

export const {
    useUserLoginMutation,
} = appApi;