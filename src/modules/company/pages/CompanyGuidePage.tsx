import { Container, Typography, Paper, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

const CompanyGuidePage = () => {
  const { t } = useTranslation();
  const createSteps = t("companyGuide.createOpportunity.steps", {
    returnObjects: true,
  }) as string[];
  const viewSteps = t("companyGuide.viewInterests.steps", {
    returnObjects: true,
  }) as string[];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h2"
        component="h1"
        align="center"
        color="primary"
        gutterBottom
        sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
      >
        {t("companyGuide.title")}
      </Typography>
      <Stack spacing={4}>
        <Paper elevation={0} sx={{ p: 3, bgcolor: "background.default" }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {t("companyGuide.createOpportunity.title")}
          </Typography>
          <ul style={{ paddingLeft: 24 }}>
            {createSteps.map((step, idx) => (
              <li key={idx} style={{ marginBottom: 8 }}>
                {step}
              </li>
            ))}
          </ul>
        </Paper>
        <Paper elevation={0} sx={{ p: 3, bgcolor: "background.default" }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {t("companyGuide.viewInterests.title")}
          </Typography>
          <ul style={{ paddingLeft: 24 }}>
            {viewSteps.map((step, idx) => (
              <li key={idx} style={{ marginBottom: 8 }}>
                {step}
              </li>
            ))}
          </ul>
        </Paper>
      </Stack>
    </Container>
  );
};

export default CompanyGuidePage;
