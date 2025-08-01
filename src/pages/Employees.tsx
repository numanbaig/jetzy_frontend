import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import { Users, Plus } from "lucide-react";

export default function Employees(): React.JSX.Element {
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
          <Button
            variant="contained"
            startIcon={<Plus size={20} />}
            sx={{
              background: "linear-gradient(135deg, #00a65a 0%, #2c3e50 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #2c3e50 0%, #00a65a 100%)",
              },
            }}
          >
            Add Employee
          </Button>
        </Box>

        {/* Content */}
        <Card sx={{ borderRadius: 2, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Users size={80} color="#00a65a" style={{ marginBottom: "1rem" }} />
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: "#2c3e50" }}>
                Employees Management
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                This page will contain the CRUD functionality for managing employees.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Features to be implemented:
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2, maxWidth: 600, mx: "auto" }}>
                {[
                  "Create new employees",
                  "View employee list with DataTables",
                  "Edit employee information",
                  "Delete employees",
                  "Link employees to companies",
                  "Employee search and filtering"
                ].map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ 
                      p: 2, 
                      backgroundColor: "#f8f9fa", 
                      borderRadius: 1,
                      border: "1px solid #e9ecef"
                    }}>
                      <Typography variant="body2" color="text.secondary">
                        {feature}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
} 