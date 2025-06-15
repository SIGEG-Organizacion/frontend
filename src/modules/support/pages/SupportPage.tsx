import { FC } from "react";
import { Typography, Container, Paper, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

const SupportPage: FC = () => {
  const { t } = useTranslation();

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
        {t("support.title")}
      </Typography>

      <Stack spacing={4}>
        {/* Sección de Contacto */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: "background.default" }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {t("support.contact.title")}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            itcrsigev@gmail.com
          </Typography>
        </Paper>
      </Stack>
    </Container>
  );
};

export default SupportPage;
