import axios, { AxiosHeaders, AxiosError } from "axios";

export type AxiosBaseQueryArgs = {
  url: string;
  method: string;
  data?: any;
  params?: any;
  headers?: AxiosHeaders;
  token?: string;
};

export const AxiosInterceptor = () => {
  const handleRequest =
    ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url, method, data, params, headers }: AxiosBaseQueryArgs) => {
      console.log(`${method} ${baseUrl}${url}`);
      
      const token = localStorage.getItem("authToken");
      console.log("Token used in interceptor:", token);

      try {
        const result = await axios({
          url: `${baseUrl}${url}`,
          method,
          data,
          params,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            ...headers,
          },
        });
        return { data: result.data };
      } catch (axiosError) {
        const err = axiosError as AxiosError;
        return {
          error: {
            status: err?.response?.status,
            data: err?.response?.data || err?.message,
          },
        };
      }
    };

  return {
    handleRequest,
  };
};
