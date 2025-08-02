export interface Employee {
  _id?: string;
  first_name: string;
  last_name: string;
  company_id: string | { _id: string; name: string; }; // Can be string ID or populated object
  email?: string;
  phone?: string;
  user_id: string;
  createdAt?: string;
  updatedAt?: string;
  // For populated company data in responses (alternative location)
  company?: {
    _id: string;
    name: string;
  };
}

export interface CreateEmployeeRequest {
  first_name: string;
  last_name: string;
  company_id: string;
  email?: string;
  phone?: string;
}

export interface UpdateEmployeeRequest extends Partial<CreateEmployeeRequest> {
  _id: string;
}

export interface EmployeeResponse {
  success: boolean;
  message: string;
  data: Employee;
}

export interface EmployeesListResponse {
  success: boolean;
  message: string;
  data: Employee[];
}

export const getAllEmployees = (build: any) => {
  return build.query({
    query: () => {
      console.log("Fetching all employees");
      return {
        url: `/employee/get_all_employees`,
        method: "GET",
      };
    },
    providesTags: ['Employee'],
    async onQueryStarted(_payload: any, { queryFulfilled }: any) {
      try {
        const { data } = await queryFulfilled;
        console.log("Get all employees API response:", data);
      } catch (err: any) {
        console.error("Get all employees API error:", err);
      }
    },
  });
};

export const getEmployeeById = (build: any) => {
  return build.query({
    query: (id: string) => {
      console.log("Fetching employee by ID:", id);
      return {
        url: `/employee/get_by_id/${id}`,
        method: "GET",
      };
    },
    providesTags: (_result: any, _error: any, id: string) => [{ type: 'Employee', id }],
    async onQueryStarted(_payload: any, { queryFulfilled }: any) {
      try {
        const { data } = await queryFulfilled;
        console.log("Get employee by ID API response:", data);
      } catch (err: any) {
        console.error("Get employee by ID API error:", err);
      }
    },
  });
};

export const createEmployee = (build: any) => {
  return build.mutation({
    query: (payload: CreateEmployeeRequest) => {
      console.log("Creating employee with payload:", payload);
      return {
        url: '/employee/create',
        method: 'POST',
        data: payload,
      };
    },
    invalidatesTags: ['Employee'],
    async onQueryStarted(_payload: any, { queryFulfilled }: any) {
      try {
        const { data } = await queryFulfilled;
        console.log("Create employee API response:", data);
      } catch (err: any) {
        console.error("Create employee API error:", err);
      }
    },
  });
};

export const updateEmployee = (build: any) => {
  return build.mutation({
    query: (payload: UpdateEmployeeRequest) => {
      console.log("Payload being sent to /employee/update_by_id:", payload);
      const { _id, ...employeeData } = payload;
      return {
        url: `/employee/update_by_id/${_id}`,
        method: "PUT",
        data: employeeData,
      };
    },
    invalidatesTags: (_result: any, _error: any, { _id }: UpdateEmployeeRequest) => [
      { type: 'Employee', id: _id },
      'Employee'
    ],
    async onQueryStarted(_payload: any, { queryFulfilled }: any) {
      console.log("onQueryStarted - update employee payload:", _payload);
      try {
        const { data } = await queryFulfilled;
        console.log("Update employee API response:", data);
      } catch (err: any) {
        console.error("Update employee API error:", err);
      }
    },
  });
};

export const deleteEmployee = (build: any) => {
  return build.mutation({
    query: (id: string) => {
      console.log("Deleting employee with ID:", id);
      return {
        url: `/employee/delete/${id}`,
        method: "DELETE",
      };
    },
    invalidatesTags: ['Employee'],
    async onQueryStarted(_payload: any, { queryFulfilled }: any) {
      try {
        const { data } = await queryFulfilled;
        console.log("Delete employee API response:", data);
      } catch (err: any) {
        console.error("Delete employee API error:", err);
      }
    },
  });
};