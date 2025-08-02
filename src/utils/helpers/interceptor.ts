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
        // Handle FormData - don't set Content-Type for FormData (let browser set it)
        const isFormData = data instanceof FormData;
        console.log("Is FormData:", isFormData);
        
        if (isFormData) {
          console.log("FormData contents:");
          for (const [key, value] of data.entries()) {
            console.log(`  ${key}:`, value instanceof File ? `File(${value.name})` : value);
          }
        }

        const requestHeaders = {
          Authorization: token ? `Bearer ${token}` : "",
          ...headers,
        };

        // If it's FormData, don't set Content-Type (browser will set multipart/form-data with boundary)
        if (isFormData && requestHeaders['Content-Type']) {
          delete requestHeaders['Content-Type'];
        }

        console.log("Final headers:", requestHeaders);

        const result = await axios({
          url: `${baseUrl}${url}`,
          method,
          data,
          params,
          headers: requestHeaders,
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
