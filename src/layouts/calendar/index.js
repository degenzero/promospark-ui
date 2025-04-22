import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

// @mui/material components
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

// PromoSpark React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// PromoSpark React layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Card from "@mui/material/Card";

// Calendar filter UI components
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";

import Search from "@mui/icons-material/Search";

function Calendar() {
  const launchEvents = [
    { title: "Rocket AI", date: "2025-04-28" },
    { title: "Web Wizard", date: "2025-05-03" },
  ];
  const [source, setSource] = useState("all");
  const [vendor, setVendor] = useState("");
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Launch Calendar
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                {/* Filter Panel */}
                <Box display="flex" gap={3} mb={4} alignItems="center">
                  <FormControl sx={{ mt: 3, minWidth: 160 }} variant="standard">
                    <InputLabel>Marketplace</InputLabel>
                    <Select
                      value={source}
                      label="Marketplace"
                      onChange={(e) => setSource(e.target.value)}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="jvzoo">JVZoo</MenuItem>
                      <MenuItem value="warriorplus">WarriorPlus</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    label="Vendor Name"
                    variant="standard"
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    sx={{ minWidth: 130, mt: 2 }}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={premiumOnly}
                        onChange={(e) => setPremiumOnly(e.target.checked)}
                      />
                    }
                    label="Premium Launch"
                    sx={{ mt: 4, mx: 0 }}
                  />
                  <MDBox
                    bgColor="info"
                    color="white"
                    onClick={() => {
                      // Placeholder for search/filter logic
                    }}
                    sx={{
                      mt: 3.5,
                      px: 2.5,
                      py: 1,
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "white",
                      "&:hover": {
                        background: (theme) => theme.palette.info.dark,
                      },
                    }}
                  >
                    <Search sx={{ color: "inherit" }} />
                  </MDBox>
                </Box>

                {/* Temporary Modal Button */}
                <Box mb={3}>
                  <Button variant="contained" color="info" onClick={handleOpen}>
                    Open Modal
                  </Button>
                </Box>

                <Modal open={open} onClose={handleClose}>
                  <MDBox
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 400,
                      bgcolor: "background.paper",
                      borderRadius: 2,
                      boxShadow: 24,
                      p: 4,
                    }}
                  >
                    <MDTypography variant="h6" component="h2">
                      Temporary Modal
                    </MDTypography>
                    <MDTypography sx={{ mt: 2 }}>
                      This modal was triggered from a test button.
                    </MDTypography>
                  </MDBox>
                </Modal>

                {/* Launch Calendar */}
                <MDBox
                  sx={{
                    "& .fc-toolbar-title": {
                      color: (theme) => theme.palette.text.primary,
                      fontWeight: "bold",
                      fontFamily: (theme) => theme.typography.fontFamily,
                      fontSize: "1.625rem",
                      letterSpacing: "0.015em",
                    },
                    "& .fc-button": {
                      backgroundColor: (theme) => theme.palette.info.main,
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      textTransform: "capitalize",
                      fontFamily: (theme) => theme.typography.fontFamily,
                      fontSize: "0.875rem",
                    },
                    "& .fc-button:hover": {
                      backgroundColor: (theme) => theme.palette.info.dark,
                    },
                    // Custom active color for FullCalendar view buttons
                    "& .fc-button.fc-button-active": {
                      backgroundColor: "#3f3f3f",
                      color: "white",
                    },
                    "& .fc-today-button": {
                      backgroundColor: "#66BB6A",
                      color: "white",
                    },
                    "& .fc-today-button:hover": {
                      backgroundColor: "#4e9951",
                    },
                    "& .fc-event": {
                      backgroundColor: (theme) => theme.palette.info.main,
                      color: "white",
                      border: "none",
                      fontSize: "0.85rem",
                      paddingLeft: (theme) => theme.spacing(2),
                      paddingRight: (theme) => theme.spacing(2),
                    },
                    "& .fc-event-title": {
                      color: "white",
                    },
                    "& .fc-toolbar-title, & .fc-col-header-cell-cushion, & .fc-daygrid-day-number":
                      {
                        color: "#344767",
                      },
                    "& .fc-day-today": {
                      backgroundColor: (theme) => theme.palette.info.light,
                    },
                  }}
                >
                  <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                    }}
                    height="60vh"
                    events={launchEvents}
                  />
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Calendar;
