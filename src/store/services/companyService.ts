export interface Company {
  _id?: string;
  name: string;
  email?: string;
  logo?: string;
  website?: string;
  user_id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCompanyRequest {
  name: string;
  email?: string;
  logo?: string | File;
  website?: string;
}

export interface UpdateCompanyRequest extends Partial<CreateCompanyRequest> {
  _id: string;
}

export interface CompanyResponse {
  success: boolean;
  message: string;
  data: Company;
}

export interface CompaniesListResponse {
  success: boolean;
  message: string;
  data: Company[];
}

export const getAllCompanies = (build: any) => {
  return build.query({
    query: () => {
      console.log("Fetching all companies");
      return {
        url: `/company/get_all_companies`,
        method: "GET",
      };
    },
    providesTags: ['Company'],
    async onQueryStarted(_payload: any, { queryFulfilled }: any) {
      try {
        const { data } = await queryFulfilled;
        console.log("Get all companies API response:", data);
      } catch (err: any) {
        console.error("Get all companies API error:", err);
      }
    },
  });
};

export const getCompanyById = (build: any) => {
  return build.query({
    query: (id: string) => {
      console.log("Fetching company by ID:", id);
      return {
        url: `/company/get_by_id/${id}`,
        method: "GET",
      };
    },
    providesTags: (_result: any, _error: any, id: string) => [{ type: 'Company', id }],
    async onQueryStarted(_payload: any, { queryFulfilled }: any) {
      try {
        const { data } = await queryFulfilled;
        console.log("Get company by ID API response:", data);
      } catch (err: any) {
        console.error("Get company by ID API error:", err);
      }
    },
  });
};

export const createCompany = (build: any) => {
  return build.mutation({
    query: (payload: CreateCompanyRequest) => {
      // Always use FormData to avoid JSON payload size limits with images
      const formData = new FormData();
      formData.append('name', payload.name);
      formData.append('email', payload.email || '');
      formData.append('website', payload.website || '');
      
      // Handle logo - File or base64 string  
      if (payload.logo) {
        if (payload.logo instanceof File) {
          formData.append('logo', payload.logo);
        } else if (typeof payload.logo === 'string' && payload.logo.startsWith('data:')) {
          // Convert base64 to Blob to avoid JSON payload size limits
          const arr = payload.logo.split(',');
          const mime = arr[0].match(/:(.*?);/)![1];
          const bstr = atob(arr[1]);
          const u8arr = new Uint8Array(bstr.length);
          for (let i = 0; i < bstr.length; i++) {
            u8arr[i] = bstr.charCodeAt(i);
          }
          const blob = new Blob([u8arr], { type: mime });
          formData.append('logo', blob, 'logo.png');
        } else if (typeof payload.logo === 'string') {
          formData.append('logo', payload.logo);
        }
      }

      return {
        url: '/company/create',
        method: 'POST',
        data: formData,
      };
    },
  });
};


export const updateCompany = (build: any) => {
  return build.mutation({
    query: (payload: UpdateCompanyRequest) => {
      console.log("Payload being sent to /companies/update_by_id:", payload);
      const { _id, ...companyData } = payload;
      
      // Always use FormData to avoid JSON payload size limits with images
      const formData = new FormData();
      formData.append('name', companyData.name || '');
      if (companyData.email) formData.append('email', companyData.email);
      if (companyData.website) formData.append('website', companyData.website);
      
      // Handle logo - File or base64 string
      if (companyData.logo) {
        if (companyData.logo instanceof File) {
          formData.append('logo', companyData.logo);
        } else if (typeof companyData.logo === 'string' && companyData.logo.startsWith('data:')) {
          // Convert base64 to Blob to avoid JSON payload size limits
          const arr = companyData.logo.split(',');
          const mime = arr[0].match(/:(.*?);/)![1];
          const bstr = atob(arr[1]);
          const u8arr = new Uint8Array(bstr.length);
          for (let i = 0; i < bstr.length; i++) {
            u8arr[i] = bstr.charCodeAt(i);
          }
          const blob = new Blob([u8arr], { type: mime });
          formData.append('logo', blob, 'logo.png');
        } else if (typeof companyData.logo === 'string') {
          formData.append('logo', companyData.logo);
        }
      }
      
      return {
        url: `/company/update_by_id/${_id}`,
        method: "PUT",
        data: formData,
      };
    },
    invalidatesTags: (_result: any, _error: any, { _id }: UpdateCompanyRequest) => [{ type: 'Company', id: _id }],
    async onQueryStarted(payload: any, { queryFulfilled }: any) {
      console.log("onQueryStarted - update company payload:", payload);
      try {
        const { data } = await queryFulfilled;
        console.log("Update company API response:", data);
      } catch (err: any) {
        console.error("Update company API error:", err);
      }
    },
  });
};

export const deleteCompany = (build: any) => {
  return build.mutation({
    query: (id: string) => {
      console.log("Deleting company with ID:", id);
      return {
        url: `/company/delete/${id}`,
        method: "DELETE",
      };
    },
    invalidatesTags: ['Company'],
    async onQueryStarted(payload: any, { queryFulfilled }: any) {
      console.log("onQueryStarted - delete company payload:", payload);
      try {
        const { data } = await queryFulfilled;
        console.log("Delete company API response:", data);
      } catch (err: any) {
        console.error("Delete company API error:", err);
      }
    },
  });
}; 