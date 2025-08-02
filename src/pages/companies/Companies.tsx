import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
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
  Eye, 
  Search,
  RefreshCw,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { CompanyModal } from "./components";
import { Button, Input } from "../../components/ui";
import { 
  useGetAllCompaniesQuery, 
  useDeleteCompanyMutation 
} from "../../store/appApi";
import type { Company } from "../../store/services/companyService";

import { theme } from "../../styles/theme";

export default function Companies(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  
  // Table state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Company>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // RTK Query hooks
  const { data: companies, isLoading, error, refetch } = useGetAllCompaniesQuery({});
  const [deleteCompany, { isLoading: isDeleting }] = useDeleteCompanyMutation();

  const handleOpenAddModal = () => {
    setSelectedCompany(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (company: Company) => {
    setSelectedCompany(company);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
    refetch();
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

  // Filter and sort companies
  const filteredAndSortedCompanies = useMemo(() => {
    if (!companies?.data || !Array.isArray(companies?.data)) return [];

    let filtered = companies?.data?.filter((company: Company) =>
      company?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (company?.email && company?.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (company?.website && company?.website.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Sort companies
    filtered?.sort((a: Company, b: Company) => {
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
    return filteredAndSortedCompanies?.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredAndSortedCompanies, page, rowsPerPage]);

  const handleSort = (field: keyof Company) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

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
              variant="primary"
              startIcon={<Plus size={20} />}
              onClick={handleOpenAddModal}
              gradient
            >
              Add Company
            </Button>
          </Box>
        </Box>

        {/* Search and Stats */}
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Input
            placeholder="Search companies..."
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
              Total: {filteredAndSortedCompanies.length} companies
            </Typography>
          </Box>
        </Box>

        {/* Companies Table */}
        <Card sx={{ borderRadius: 2, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
          <CardContent sx={{ p: 0 }}>
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
                        <TableCell sx={{ fontWeight: 600 }}>Created Date</TableCell>
                        <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedCompanies.map((company) => (
                        <TableRow 
                          key={company._id} 
                          sx={{ 
                            "&:hover": { backgroundColor: "#f8f9fa" },
                            "& td": { borderBottom: "1px solid #e0e0e0" }
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <Avatar
                                src={company.logo}
                                sx={{ 
                                  width: 40, 
                                  height: 40, 
                                  backgroundColor: "#3c8dbc",
                                  fontSize: "0.875rem"
                                }}
                              >
                                {company.name.charAt(0).toUpperCase()}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 500, color: "#2c3e50" }}>
                                  {company.name}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {company.email || "No email"}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {company.website || "No website"}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {company.createdAt 
                                ? new Date(company.createdAt).toLocaleDateString()
                                : "N/A"
                              }
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                              <Tooltip title="View Company">
                              </Tooltip>
                              <Tooltip title="Edit Company">
                                <IconButton
                                  size="small"
                                  onClick={() => handleOpenEditModal(company)}
                                  sx={{ 
                                    color: "#f39c12",
                                    "&:hover": { backgroundColor: "rgba(243, 156, 18, 0.1)" }
                                  }}
                                >
                                  <Edit size={16} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete Company">
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteCompany(company._id!)}
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
                  count={filteredAndSortedCompanies.length}
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

      {/* Company Modal */}
      <CompanyModal 
        open={isModalOpen} 
        onClose={handleCloseModal}
        company={selectedCompany}
        mode={modalMode}
      />
    </Box>
  );
}