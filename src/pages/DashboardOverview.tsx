import React, { useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  Container,
  CircularProgress,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Business,
  People,
  TrendingUp,
  Assessment,
  Add,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { 
  useGetAllCompaniesQuery, 
  useGetAllEmployeesQuery 
} from "../store/appApi";
import type { Company } from "../store/services/companyService";
import type { Employee } from "../store/services/employeeService";

export default function DashboardOverview(): React.JSX.Element {
  const navigate = useNavigate();
  
  // API calls
  const { data: companies, isLoading: isLoadingCompanies } = useGetAllCompaniesQuery({});
  const { data: employees, isLoading: isLoadingEmployees } = useGetAllEmployeesQuery({});

  // Calculate stats from API data
  const stats = useMemo(() => {
    const companiesData = (companies as any)?.data || [];
    const employeesData = (employees as any)?.data || [];
    
    // Count companies with emails
    const companiesWithEmails = companiesData.filter((company: Company) => company.email).length;
    
    // Count employees with emails
    const employeesWithEmails = employeesData.filter((employee: Employee) => employee.email).length;

    return [
    {
      title: "Total Companies",
        value: isLoadingCompanies ? "..." : companiesData.length.toString(),
      icon: <Business sx={{ fontSize: 40, color: "#3c8dbc" }} />,
      color: "#3c8dbc",
        subtitle: `${companiesWithEmails} with emails`,
    },
    {
      title: "Total Employees",
        value: isLoadingEmployees ? "..." : employeesData.length.toString(),
      icon: <People sx={{ fontSize: 40, color: "#00a65a" }} />,
      color: "#00a65a",
        subtitle: `${employeesWithEmails} with emails`,
      },
      {
        title: "Avg Employees/Company",
        value: companiesData.length > 0 ? Math.round(employeesData.length / companiesData.length).toString() : "0",
        icon: <TrendingUp sx={{ fontSize: 40, color: "#f39c12" }} />,
        color: "#f39c12",
        subtitle: "Growth metric",
      },
      {
        title: "Companies with Websites",
        value: companiesData.filter((company: Company) => company.website).length.toString(),
        icon: <Assessment sx={{ fontSize: 40, color: "#9b59b6" }} />,
        color: "#9b59b6",
        subtitle: `${companiesData.length > 0 ? Math.round((companiesData.filter((company: Company) => company.website).length / companiesData.length) * 100) : 0}% of total`,
      },
    ];
  }, [companies, employees, isLoadingCompanies, isLoadingEmployees]);

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#f4f6f9" }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#2c3e50", fontWeight: "bold" }}>
            Dashboard Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome to Jetzy CRM - Your Mini-CRM Management System
          </Typography>
          {(isLoadingCompanies || isLoadingEmployees) && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <CircularProgress size={16} />
              <Typography variant="body2" color="text.secondary">
                Loading dashboard data...
          </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 3, mb: 4 }}>
          {stats.map((stat, index) => (
            <Card
              key={index}
              sx={{
                borderRadius: 2,
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                "&:hover": {
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" component="div" sx={{ fontWeight: "bold", color: stat.color }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                      {stat.subtitle}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: `${stat.color}15`,
                      borderRadius: "50%",
                      p: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
          <Box>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" component="h2" gutterBottom sx={{ color: "#2c3e50", fontWeight: "bold" }}>
                  Recent Companies
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {isLoadingCompanies ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                      <CircularProgress size={24} />
                    </Box>
                  ) : (
                    ((companies as any)?.data || [])
                      .slice(-5)
                      .reverse()
                      .map((company: Company, index: number) => (
                        <Box
                          key={company._id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            py: 2,
                            borderBottom: index < 4 ? "1px solid #eee" : "none",
                          }}
                        >
                          <Avatar
                            src={company.logo}
                            sx={{ 
                              width: 40, 
                              height: 40, 
                              mr: 2,
                              backgroundColor: "#3c8dbc",
                              fontSize: "0.875rem"
                            }}
                          >
                            {company.name.charAt(0).toUpperCase()}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                              {company.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {company.email || "No email provided"}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: "right" }}>
                            <Typography variant="body2" color="text.secondary">
                              {company.createdAt 
                                ? new Date(company.createdAt).toLocaleDateString()
                                : "N/A"
                              }
                            </Typography>
                            {company.website && (
                              <Chip 
                                label="Website" 
                                size="small" 
                                sx={{ 
                                  mt: 0.5, 
                                  backgroundColor: "#3c8dbc15", 
                                  color: "#3c8dbc",
                                  fontSize: "0.7rem",
                                  height: "20px"
                                }} 
                              />
                            )}
                          </Box>
                        </Box>
                      ))
                  )}
                  {!isLoadingCompanies && ((companies as any)?.data || []).length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
                      No companies found. Add your first company to get started!
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" component="h2" gutterBottom sx={{ color: "#2c3e50", fontWeight: "bold" }}>
                  Recent Employees
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {isLoadingEmployees ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                      <CircularProgress size={24} />
                    </Box>
                  ) : (
                    ((employees as any)?.data || [])
                      .slice(-5)
                      .reverse()
                      .map((employee: Employee, index: number) => {
                        // Get company name helper function
                        const getCompanyName = (companyId: string | { _id: string; name: string; }) => {
                          if (typeof companyId === 'object' && companyId?.name) {
                            return companyId.name;
                          }
                          if (typeof companyId === 'string') {
                            const company = ((companies as any)?.data || []).find((c: Company) => c._id === companyId);
                            return company?.name || "Unknown Company";
                          }
                          return "Unknown Company";
                        };

                        return (
                          <Box
                            key={employee._id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              py: 2,
                              borderBottom: index < 4 ? "1px solid #eee" : "none",
                            }}
                          >
                            <Avatar
                              sx={{ 
                                width: 40, 
                                height: 40, 
                                mr: 2,
                                backgroundColor: "#00a65a",
                                fontSize: "0.875rem"
                              }}
                            >
                              {employee.first_name.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                                {employee.first_name} {employee.last_name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {employee.company?.name || getCompanyName(employee.company_id as any)}
                              </Typography>
                            </Box>
                            <Box sx={{ textAlign: "right" }}>
                              <Typography variant="body2" color="text.secondary">
                                {employee.createdAt 
                                  ? new Date(employee.createdAt).toLocaleDateString()
                                  : "N/A"
                                }
                              </Typography>
                              {employee.email && (
                                <Chip 
                                  label="Email" 
                                  size="small" 
                                  sx={{ 
                                    mt: 0.5, 
                                    backgroundColor: "#00a65a15", 
                                    color: "#00a65a",
                                    fontSize: "0.7rem",
                                    height: "20px"
                                  }} 
                                />
                              )}
                            </Box>
                          </Box>
                        );
                      })
                  )}
                  {!isLoadingEmployees && ((employees as any)?.data || []).length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
                      No employees found. Add your first employee to get started!
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

    
      </Container>
    </Box>
  );
} 