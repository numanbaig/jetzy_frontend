import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  InputAdornment,
  Tooltip,
  IconButton,
} from "@mui/material";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { EmployeeModal } from "./components";
import { Button, Input } from "../../components/ui";
import { 
  useGetAllEmployeesQuery, 
  useDeleteEmployeeMutation,
  useGetAllCompaniesQuery 
} from "../../store/appApi";
import type { Employee } from "../../store/services/employeeService";

export default function Employees(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  // Table state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Employee>("first_name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // RTK Query hooks
  const { data: employees, isLoading, refetch } = useGetAllEmployeesQuery({});
  const { data: companies } = useGetAllCompaniesQuery({});
  const [deleteEmployee] = useDeleteEmployeeMutation();
  
  // Type-safe data access
  const employeesData = (employees as any)?.data || [];

  const handleOpenAddModal = () => {
    setSelectedEmployee(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
    refetch();
  };

  const handleDeleteEmployee = async (employeeId: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(employeeId).unwrap();
        refetch();
      } catch (err) {
        console.error("Failed to delete employee:", err);
      }
    }
  };

  // Filter and sort employees
  const filteredAndSortedEmployees = useMemo(() => {
    if (!employeesData || !Array.isArray(employeesData)) return [];

    let filtered = employeesData.filter((employee: Employee) =>
      employee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (employee.email && employee.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (employee.phone && employee.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (employee.company && employee.company.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Sort employees
    filtered.sort((a: Employee, b: Employee) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (!aValue && !bValue) return 0;
      if (!aValue) return 1;
      if (!bValue) return -1;
      
      const comparison = aValue.toString().localeCompare(bValue.toString());
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [employeesData, searchTerm, sortField, sortDirection]);

  const paginatedEmployees = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredAndSortedEmployees.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredAndSortedEmployees, page, rowsPerPage]);

  const handleSort = (field: keyof Employee) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: keyof Employee) => {
    if (sortField !== field) return <ArrowUpDown size={16} />;
    return sortDirection === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getCompanyName = (companyId: string | { _id: string; name: string; }) => {
    // If companyId is an object (populated), return its name directly
    if (typeof companyId === 'object' && companyId?.name) {
      return companyId.name;
    }
    
    // If companyId is a string, find the company in the list
    if (typeof companyId === 'string') {
      const company = (companies as any)?.data?.find((c: any) => c._id === companyId);
      return company?.name || "Unknown Company";
    }
    
    return "Unknown Company";
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#f4f6f9" }}>
      <Container maxWidth="xl">
        {/* Page Header */}
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#2c3e50", fontWeight: "bold" }}>
              Employees Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your employee database and information
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="primary"
              startIcon={<Plus size={20} />}
              onClick={handleOpenAddModal}
              gradient
            >
              Add Employee
            </Button>
          </Box>
        </Box>

        {/* Search and Stats */}
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Input
            placeholder="Search employees..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} color="#6b7280" />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: "#6b7280" }}>
            <Typography variant="body2">
              Total: {filteredAndSortedEmployees.length} employees
            </Typography>
          </Box>
        </Box>

        {/* Employees Table */}
        <Card sx={{ borderRadius: 2, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
          <CardContent sx={{ p: 0 }}>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box sx={{ overflowX: "auto" }}>
                <TableContainer component={Paper} sx={{ boxShadow: "none", border: "1px solid #e0e0e0" }}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                        <TableCell 
                          sx={{ 
                            fontWeight: 600, 
                            cursor: "pointer",
                            "&:hover": { backgroundColor: "#e9ecef" }
                          }}
                          onClick={() => handleSort("first_name")}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            Name
                            <span>{getSortIcon("first_name")}</span>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Company</TableCell>
                        <TableCell 
                          sx={{ 
                            fontWeight: 600, 
                            cursor: "pointer",
                            "&:hover": { backgroundColor: "#e9ecef" }
                          }}
                          onClick={() => handleSort("email")}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            Email
                            <span>{getSortIcon("email")}</span>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Created Date</TableCell>
                        <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedEmployees.map((employee: Employee) => (
                        <TableRow 
                          key={employee._id} 
                          sx={{ 
                            "&:hover": { backgroundColor: "#f8f9fa" },
                            "& td": { borderBottom: "1px solid #e0e0e0" }
                          }}
                        >
                          <TableCell>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 500, color: "#2c3e50" }}>
                                {employee.first_name} {employee.last_name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {employee.company?.name || getCompanyName(employee.company_id as any)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {employee.email || "No email"}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {employee.phone || "No phone"}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {employee.createdAt 
                                ? new Date(employee.createdAt).toLocaleDateString()
                                : "N/A"
                              }
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                              <Tooltip title="View Employee">
                                <span></span>
                              </Tooltip>
                              <Tooltip title="Edit Employee">
                                <IconButton
                                  size="small"
                                  onClick={() => handleOpenEditModal(employee)}
                                  sx={{ 
                                    color: "#f39c12",
                                    "&:hover": { backgroundColor: "rgba(243, 156, 18, 0.1)" }
                                  }}
                                >
                                  <Edit size={16} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete Employee">
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteEmployee(employee._id!)}
                                  sx={{ 
                                    color: "#e74c3c",
                                    "&:hover": { backgroundColor: "rgba(231, 76, 60, 0.1)" }
                                  }}
                                >
                                  <Trash2 size={16} />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination */}
                <TablePagination
                  component="div"
                  count={filteredAndSortedEmployees.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  sx={{
                    borderTop: "1px solid #e0e0e0",
                    backgroundColor: "#f8f9fa",
                  }}
                />
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>

      {/* Employee Modal */}
      <EmployeeModal 
        open={isModalOpen} 
        onClose={handleCloseModal}
        employee={selectedEmployee}
        mode={modalMode}
      />
    </Box>
  );
}