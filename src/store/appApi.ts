import { createApi } from "@reduxjs/toolkit/query/react";
import { AxiosInterceptor } from "@/utils/helpers/interceptor";
import { userLogin } from "./services/userService";
import { 
    getAllCompanies, 
    getCompanyById, 
    createCompany, 
    updateCompany, 
    deleteCompany 
} from "./services/companyService";
import {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "./services/employeeService";


const BASE_URL = "http://localhost:8000/api/v1";

const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: AxiosInterceptor().handleRequest({ baseUrl: BASE_URL }),
    tagTypes: ['Company','Employee'],
    
    endpoints: (build: any) => ({
        userLogin: userLogin(build),
        getAllCompanies: getAllCompanies(build),
        getCompanyById: getCompanyById(build),
        createCompany: createCompany(build),
        updateCompany: updateCompany(build),
        deleteCompany: deleteCompany(build),
        getAllEmployees: getAllEmployees(build),
        getEmployeeById: getEmployeeById(build),
        createEmployee: createEmployee(build),
        updateEmployee: updateEmployee(build),
        deleteEmployee: deleteEmployee(build),
    }),
});

export default appApi;

export const {
    useUserLoginMutation,
    useGetAllCompaniesQuery,
    useGetCompanyByIdQuery,
    useCreateCompanyMutation,
    useUpdateCompanyMutation,
    useDeleteCompanyMutation,
    useGetAllEmployeesQuery,
    useGetEmployeeByIdQuery,
    useCreateEmployeeMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
} = appApi;