import { Helmet } from "@dr.pogodin/react-helmet";
import PageHeader from "../../components/PageHeader";
import PageTitleWrapper from "../../components/PageTitleWrapper";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import LeaveForm from "./LeaveForm";
import LeaveDetails from "./LeaveDetails";
import Footer from "../../components/Footer";

const LeaveIndex = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [form, setForm] = useState(false);

  return (
    <>
      <Helmet>
        <title>Leave Management</title>
      </Helmet>

      <PageTitleWrapper>
        <PageHeader
          title="Leave Management"
          btntitle="Add Leave"
          onActionClick={() => setForm(true)}
        />
      </PageTitleWrapper>

      <Box sx={{ maxWidth: "95%", mx: isMobile ? 1 : 4 }}>
        <Grid container>
          <Grid size={{ xs: 12 }}>
            <LeaveDetails />
          </Grid>
        </Grid>
      </Box>

      <Footer />

      <LeaveForm
        open={form}
        close={() => setForm(false)}
        initialData={null}
      />
    </>
  );
};

export default LeaveIndex;
