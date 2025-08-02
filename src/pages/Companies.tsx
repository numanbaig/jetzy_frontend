import React, { useState,  useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
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
} from "@mui/material";
import { 
  Building2, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  RefreshCw,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import AddCompanyModal from "../components/AddCompanyModal";
import { 
  useGetAllCompaniesQuery, 
  useUpdateCompanyMutation, 
  useDeleteCompanyMutation 
} from "../store/appApi";
import type { Company } from "../store/services/companyService";
import "../styles/companies.css";

export default function Companies(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    website: "",
  });
  
  // Table state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Company>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");



  // RTK Query hooks
  const { data: companies, isLoading, error, refetch } = useGetAllCompaniesQuery({});
  const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation();
  const [deleteCompany, { isLoading: isDeleting }] = useDeleteCompanyMutation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditCompany = (company: Company) => {
    setSelectedCompany(company);
    setEditFormData({
      name: company.name,
      email: company.email || "",
      website: company.website || "",
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateCompany = async () => {
    if (!selectedCompany?._id) return;

    try {
      await updateCompany({
        _id: selectedCompany._id,
        ...editFormData,
      }).unwrap();
      setIsEditModalOpen(false);
      setSelectedCompany(null);
      refetch();
    } catch (err) {
      console.error("Failed to update company:", err);
    }
  };

  const handleDeleteCompany = async (companyId: string) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await deleteCompany(companyId).unwrap();
        refetch();
      } catch (err) {
        console.error("Failed to delete company:", err);
      }
    }
  };

  console.log(companies.count,"cpount");
  // Filter and sort companies
  const filteredAndSortedCompanies = useMemo(() => {
    // if (!companies.count || !Array.isArray(companies?.data)) return [];

    let filtered = companies?.data?.filter((company: Company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (company.email && company.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (company.website && company.website.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Sort companies
    filtered.sort((a: Company, b: Company) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (!aValue && !bValue) return 0;
      if (!aValue) return 1;
      if (!bValue) return -1;
      
      const comparison = aValue.toString().localeCompare(bValue.toString());
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [companies, searchTerm, sortField, sortDirection]);

  const paginatedCompanies = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredAndSortedCompanies.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredAndSortedCompanies, page, rowsPerPage]);

  const handleSort = (field: keyof Company) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  console.log(paginatedCompanies,"paginated")

  const getSortIcon = (field: keyof Company) => {
    if (sortField !== field) return <ArrowUpDown size={16} />;
    return sortDirection === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#f4f6f9" }}>
      <Container maxWidth="xl">
        {/* Page Header */}
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#2c3e50", fontWeight: "bold" }}>
              Companies Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your company database and information
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<RefreshCw size={20} />}
              onClick={() => refetch()}
              disabled={isLoading}
              sx={{
                borderColor: "#3c8dbc",
                color: "#3c8dbc",
                "&:hover": {
                  borderColor: "#2c3e50",
                  backgroundColor: "#f8f9fa",
                },
              }}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              startIcon={<Plus size={20} />}
              onClick={handleOpenModal}
              sx={{
                background: "linear-gradient(135deg, #3c8dbc 0%, #2c3e50 100%)",
                "&:hover": {
                  background: "linear-gradient(135deg, #2c3e50 0%, #3c8dbc 100%)",
                },
              }}
            >
              Add Company
            </Button>
          </Box>
        </Box>

        {/* Content */}
        <Card sx={{ borderRadius: 2, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
          <CardContent sx={{ p: 3 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                Failed to load companies. Please try again.
              </Alert>
            )}

            {/* Search Bar */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search companies by name, email, or website..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={20} color="#6b7280" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": {
                      borderColor: "#3c8dbc",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3c8dbc",
                    },
                  },
                }}
              />
            </Box>

            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box sx={{ overflowX: "auto" }}>
                <TableContainer component={Paper} className="companies-table" sx={{ boxShadow: "none", border: "1px solid #e0e0e0" }}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                        <TableCell 
                          className="sortable-header"
                          sx={{ 
                            fontWeight: 600, 
                            cursor: "pointer",
                            "&:hover": { backgroundColor: "#e9ecef" }
                          }}
                          onClick={() => handleSort("name")}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            Company
                            <span className="sort-icon">{getSortIcon("name")}</span>
                          </Box>
                        </TableCell>
                        <TableCell 
                          className="sortable-header"
                          sx={{ 
                            fontWeight: 600, 
                            cursor: "pointer",
                            "&:hover": { backgroundColor: "#e9ecef" }
                          }}
                          onClick={() => handleSort("email")}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            Email
                            <span className="sort-icon">{getSortIcon("email")}</span>
                          </Box>
                        </TableCell>
                        <TableCell 
                          className="sortable-header"
                          sx={{ 
                            fontWeight: 600, 
                            cursor: "pointer",
                            "&:hover": { backgroundColor: "#e9ecef" }
                          }}
                          onClick={() => handleSort("website")}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            Website
                            <span className="sort-icon">{getSortIcon("website")}</span>
                          </Box>
                        </TableCell>
                        <TableCell 
                          className="sortable-header"
                          sx={{ 
                            fontWeight: 600, 
                            cursor: "pointer",
                            "&:hover": { backgroundColor: "#e9ecef" }
                          }}
                          onClick={() => handleSort("createdAt")}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            Created
                            <span className="sort-icon">{getSortIcon("createdAt")}</span>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedCompanies.map((company: Company) => (
                        <TableRow 
                          key={company._id} 
                          sx={{ 
                            "&:hover": { backgroundColor: "#f8f9fa" },
                            "&:last-child td, &:last-child th": { border: 0 }
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <Avatar
                                src={company.logo || "/default-company-logo.png"}
                                alt={company.name}
                                sx={{ width: 40, height: 40 }}
                              >
                                <Building2 size={20} />
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#2c3e50" }}>
                                  {company.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  ID: {company._id}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {company.email || (
                              <Typography variant="body2" color="text.secondary">
                                N/A
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            {company.website ? (
                              <a 
                                href={company.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ color: "#3c8dbc", textDecoration: "none" }}
                              >
                                {company.website}
                              </a>
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                N/A
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {company.createdAt ? new Date(company.createdAt).toLocaleDateString() : "N/A"}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                              <Tooltip title="Edit Company">
                                <IconButton
                                  size="small"
                                  onClick={() => handleEditCompany(company)}
                                  sx={{ 
                                    color: "#3c8dbc",
                                    "&:hover": { backgroundColor: "#e3f2fd" }
                                  }}
                                >
                                  <Edit size={16} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete Company">
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteCompany(company._id!)}
                                  disabled={isDeleting}
                                  sx={{ 
                                    color: "#dc3545",
                                    "&:hover": { backgroundColor: "#ffebee" }
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
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  component="div"
                  count={filteredAndSortedCompanies.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                      color: "#6b7280",
                    },
                  }}
                />
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>

      {/* Add Company Modal */}
      <AddCompanyModal open={isModalOpen} onClose={handleCloseModal} />

      {/* Edit Company Modal */}
      <Dialog
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #3c8dbc 0%, #2c3e50 100%)",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Edit size={24} />
          <Typography variant="h6">Edit Company</Typography>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Company Name"
              value={editFormData.name}
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Email"
              type="email"
              value={editFormData.email}
              onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
              fullWidth
            />
            <TextField
              label="Website"
              value={editFormData.website}
              onChange={(e) => setEditFormData({ ...editFormData, website: e.target.value })}
              fullWidth
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => setIsEditModalOpen(false)}
            variant="outlined"
            sx={{
              borderColor: "#6b7280",
              color: "#6b7280",
              "&:hover": {
                borderColor: "#374151",
                backgroundColor: "#f9fafb",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateCompany}
            variant="contained"
            disabled={isUpdating}
            sx={{
              background: "linear-gradient(135deg, #3c8dbc 0%, #2c3e50 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #2c3e50 0%, #3c8dbc 100%)",
              },
            }}
          >
            {isUpdating ? <CircularProgress size={20} sx={{ color: "white" }} /> : "Update Company"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 