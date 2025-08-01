import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import {
  Business,
  People,
  TrendingUp,
  Assessment,
} from "@mui/icons-material";

export default function DashboardOverview(): React.JSX.Element {
  const stats = [
    {
      title: "Total Companies",
      value: "24",
      icon: <Business sx={{ fontSize: 40, color: "#3c8dbc" }} />,
      color: "#3c8dbc",
    },
    {
      title: "Total Employees",
      value: "156",
      icon: <People sx={{ fontSize: 40, color: "#00a65a" }} />,
      color: "#00a65a",
    },
    {
      title: "Active Projects",
      value: "12",
      icon: <TrendingUp sx={{ fontSize: 40, color: "#f39c12" }} />,
      color: "#f39c12",
    },
    {
      title: "Reports",
      value: "8",
      icon: <Assessment sx={{ fontSize: 40, color: "#dd4b39" }} />,
      color: "#dd4b39",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#f4f6f9" }}>
      <Container maxWidth="xl">
        {/* Page Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#2c3e50", fontWeight: "bold" }}>
            Dashboard Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome to SalesSync CRM - Your Mini-CRM Management System
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  "&:hover": {
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                      <Typography variant="h4" component="div" sx={{ fontWeight: "bold", color: stat.color }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {stat.title}
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
            </Grid>
          ))}
        </Grid>

        {/* Main Content Area */}
        <Grid container spacing={3}>
          {/* Recent Activity */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" component="h2" gutterBottom sx={{ color: "#2c3e50", fontWeight: "bold" }}>
                  Recent Activity
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {[
                    { action: "New company added", company: "TechCorp Inc.", time: "2 hours ago" },
                    { action: "Employee updated", company: "Marketing Solutions", time: "4 hours ago" },
                    { action: "New employee added", company: "Digital Innovations", time: "6 hours ago" },
                    { action: "Company profile updated", company: "Global Systems", time: "1 day ago" },
                  ].map((activity, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 2,
                        borderBottom: index < 3 ? "1px solid #eee" : "none",
                      }}
                    >
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                          {activity.action}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {activity.company}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" component="h2" gutterBottom sx={{ color: "#2c3e50", fontWeight: "bold" }}>
                  Quick Actions
                </Typography>
                <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                  {[
                    { label: "Add New Company", color: "#3c8dbc" },
                    { label: "Add New Employee", color: "#00a65a" },
                    { label: "Generate Report", color: "#f39c12" },
                    { label: "View Settings", color: "#dd4b39" },
                  ].map((action, index) => (
                    <Paper
                      key={index}
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        backgroundColor: `${action.color}10`,
                        border: `1px solid ${action.color}30`,
                        "&:hover": {
                          backgroundColor: `${action.color}20`,
                          transform: "translateX(4px)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: action.color,
                          fontWeight: "medium",
                          textAlign: "center",
                        }}
                      >
                        {action.label}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 