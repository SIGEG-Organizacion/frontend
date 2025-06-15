import { Container, Typography, Paper, Stack } from "@mui/material";
import { useAuth } from "../../auth/hooks/useAuth";
import { useTranslation } from "react-i18next";

const UserGuidePage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  let guideContent = null;

  if (user?.role === "student") {
    const steps = t("userGuide.student.steps", {
      returnObjects: true,
    }) as string[];
    guideContent = (
      <>
        <Paper elevation={0} sx={{ p: 3, bgcolor: "background.default" }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {t("userGuide.student.title")}
          </Typography>
          <ul style={{ paddingLeft: 24 }}>
            {steps.map((step, idx) => (
              <li key={idx} style={{ marginBottom: 8 }}>
                {step}
              </li>
            ))}
          </ul>
        </Paper>
      </>
    );
  } else if (user?.role === "graduate") {
    const steps = t("userGuide.graduate.steps", {
      returnObjects: true,
    }) as string[];
    guideContent = (
      <>
        <Paper elevation={0} sx={{ p: 3, bgcolor: "background.default" }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {t("userGuide.graduate.title")}
          </Typography>
          <ul style={{ paddingLeft: 24 }}>
            {steps.map((step, idx) => (
              <li key={idx} style={{ marginBottom: 8 }}>
                {step}
              </li>
            ))}
          </ul>
        </Paper>
      </>
    );
  }

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
        {t("navbar.userGuide")}
      </Typography>
      <Stack spacing={4}>{guideContent}</Stack>
    </Container>
  );
};

export default UserGuidePage;
