import { Helmet } from "@dr.pogodin/react-helmet";
import PageHeader from "../../components/PageHeader";
import PageTitleWrapper from "../../components/PageTitleWrapper";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import DictionaryForm from "./DictionaryForm";
import DictionaryDetails from "./DictionaryDetails";
import Footer from "../../components/Footer";

const DictionaryIndex = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [form, setForm] = useState(false);

  const openForm = () => setForm(true);
  const closeForm = () => setForm(false);

  return (
    <>
      <Helmet>
        <title>Dictionary Management</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title="Dictionary Management"
          btntitle="Add Dictionary Entry"
          icon=""
          onActionClick={openForm}
        />
      </PageTitleWrapper>

      <Box sx={{ maxWidth: "95%", mx: isMobile ? 1 : 4 }}>
        <Grid container justifyContent="center" spacing={0}>
          <Grid size={{xs:12,md:12}}>
            <DictionaryDetails />
          </Grid>
        </Grid>
      </Box>

      <Footer />
      <DictionaryForm form={form} closeForm={closeForm} initialData={null} />
    </>
  );
};

export default DictionaryIndex;
