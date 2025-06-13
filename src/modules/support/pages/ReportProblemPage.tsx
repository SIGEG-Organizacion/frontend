import { FC, useState } from "react";
import {
  Typography,
  Container,
  Button,
  Paper,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  AlertTitle,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ProblemReport {
  title: string;
  description: string;
  category: string;
  priority: string;
}

const ReportProblemPage: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<ProblemReport>({
    title: "",
    description: "",
    category: "",
    priority: "medium",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el reporte
    console.log("Enviando reporte:", formData);
    setSubmitted(true);
    setTimeout(() => {
      navigate("/support");
    }, 2000);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (submitted) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Alert severity="success">
          <AlertTitle>{t("support.report.success")}</AlertTitle>
          {t("support.report.successMessage")}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        {t("support.report.title")}
      </Typography>

      <Paper elevation={1} sx={{ p: 3, mt: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              required
              fullWidth
              label={t("support.report.form.title")}
              name="title"
              value={formData.title}
              onChange={handleTextChange}
            />

            <TextField
              required
              fullWidth
              multiline
              rows={4}
              label={t("support.report.form.description")}
              name="description"
              value={formData.description}
              onChange={handleTextChange}
            />

            <FormControl fullWidth required>
              <InputLabel>{t("support.report.form.category")}</InputLabel>
              <Select
                name="category"
                value={formData.category}
                label={t("support.report.form.category")}
                onChange={handleSelectChange}
              >
                <MenuItem value="technical">
                  {t("support.report.categories.technical")}
                </MenuItem>
                <MenuItem value="access">
                  {t("support.report.categories.access")}
                </MenuItem>
                <MenuItem value="data">
                  {t("support.report.categories.data")}
                </MenuItem>
                <MenuItem value="other">
                  {t("support.report.categories.other")}
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>{t("support.report.form.priority")}</InputLabel>
              <Select
                name="priority"
                value={formData.priority}
                label={t("support.report.form.priority")}
                onChange={handleSelectChange}
              >
                <MenuItem value="low">
                  {t("support.report.priorities.low")}
                </MenuItem>
                <MenuItem value="medium">
                  {t("support.report.priorities.medium")}
                </MenuItem>
                <MenuItem value="high">
                  {t("support.report.priorities.high")}
                </MenuItem>
              </Select>
            </FormControl>

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={() => navigate("/support")}>
                {t("support.report.form.cancel")}
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {t("support.report.form.submit")}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default ReportProblemPage;
