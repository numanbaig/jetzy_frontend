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
  logo?: string;
  website?: string;
}

export interface UpdateCompanyRequest extends Partial<CreateCompanyRequest> {
  _id: string;
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
    async onQueryStarted(payload: any, { queryFulfilled }: any) {
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
    providesTags: (result: any, error: any, id: string) => [{ type: 'Company', id }],
    async onQueryStarted(payload: any, { queryFulfilled }: any) {
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
      const formData = new FormData();
      
      // Append all fields including name
      formData.append('name', payload.name);
      formData.append('email', payload.email || '');
      formData.append('website', payload.website || '');
      
      // Handle logo - ensure the field name matches what multer expects ('logo')
      if (payload.logo) {
        if (payload.logo instanceof File) {
          formData.append('logo', payload.logo);
        } else if (typeof payload.logo === 'string' && payload.logo.startsWith('data:')) {
          const blob = dataURLtoBlob(payload.logo);
          formData.append('logo', blob, 'logo.png');
        }
      }

      return {
        url: '/company/create',
        method: 'POST',
        body: formData,
      };
    },
  });
};

function dataURLtoBlob(dataURL: string) {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
export const updateCompany = (build: any) => {
  return build.mutation({
    query: async (payload: UpdateCompanyRequest) => {
      console.log("Payload being sent to /companies/update_by_id:", payload);
      
      const { _id, ...companyData } = payload;
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', companyData.name || '');
      if (companyData.email) formData.append('email', companyData.email);
      if (companyData.website) formData.append('website', companyData.website);
      if (companyData.logo) {
        // Convert base64 to blob if it's a base64 string
        if (companyData.logo.startsWith('data:')) {
          const response = await fetch(companyData.logo);
          const blob = await response.blob();
          formData.append('logo', blob, 'logo.png');
        } else {
          formData.append('logo', companyData.logo);
        }
      }
      
      return {
        url: `/company/update_by_id/${_id}`,
        method: "PUT",
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
    },
    invalidatesTags: (result: any, error: any, { _id }: UpdateCompanyRequest) => [{ type: 'Company', id: _id }],
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