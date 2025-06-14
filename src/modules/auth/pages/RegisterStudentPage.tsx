import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PasswordInput from "../components/PasswordInput";
import ValidationMessage from "../components/ValidationMessage";
import authService from "../services/authService";
import type { RegisterStudentData } from "../types/auth";

const RegisterStudentPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterStudentData>({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    studentId: "",
    major: "",
    admissionYear: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Validación de contraseña
  const isPasswordValid = (password: string) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await authService.registerStudent(form);
      setSuccess(t("registerStudent.success"));
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message ?? err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t("registerStudent.title")}
      </h1>

      {error && <ValidationMessage type="error">{error}</ValidationMessage>}
      {success && (
        <ValidationMessage type="success">{success}</ValidationMessage>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            {t("registerStudent.name")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label htmlFor="studentId" className="block mb-1 font-medium">
            {t("registerStudent.studentId")}
          </label>
          <input
            id="studentId"
            name="studentId"
            type="text"
            value={form.studentId}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label htmlFor="phone_number" className="block mb-1 font-medium">
            {t("registerStudent.phoneNumber")}
          </label>
          <input
            id="phone_number"
            name="phone_number"
            type="tel"
            value={form.phone_number}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            {t("registerStudent.email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label htmlFor="major" className="block mb-1 font-medium">
            {t("registerStudent.major")}
          </label>
          <select
            id="major"
            name="major"
            value={form.major}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          >
            <option value="">{t("registerStudent.selectMajorCode")}</option>
            <option value="ARH">ARH</option>
            <option value="AEN">AEN</option>
            <option value="MRN">MRN</option>
            <option value="DP">DP</option>
            <option value="GPM">GPM</option>
            <option value="DCS">DCS</option>
            <option value="CND">CND</option>
            <option value="IMT">IMT</option>
            <option value="ATI">ATI</option>
            <option value="DAI">DAI</option>
            <option value="DDE">DDE</option>
            <option value="ET">ET</option>
            <option value="EM">EM</option>
            <option value="EMA">EMA</option>
            <option value="AU">AU</option>
            <option value="AE">AE</option>
            <option value="AIT">AIT</option>
            <option value="AA">AA</option>
            <option value="AN">AN</option>
            <option value="BI">BI</option>
            <option value="ME">ME</option>
            <option value="CI">CI</option>
            <option value="ECE">ECE</option>
            <option value="CS">CS</option>
            <option value="SCC">SCC</option>
            <option value="CD">CD</option>
            <option value="FI">FI</option>
            <option value="EIC">EIC</option>
            <option value="MI">MI</option>
            <option value="CA">CA</option>
            <option value="CES">CES</option>
            <option value="CO">CO</option>
            <option value="E">E</option>
            <option value="EMT">EMT</option>
            <option value="PI">PI</option>
            <option value="SHO">SHO</option>
            <option value="MA">MA</option>
            <option value="QU">QU</option>
            <option value="DI">DI</option>
            <option value="IA">IA</option>
            <option value="AG">AG</option>
            <option value="FO">FO</option>
            <option value="FH">FH</option>
            <option value="GTR">GTR</option>
            <option value="GTS">GTS</option>
            <option value="GST">GST</option>
            <option value="AAL">AAL</option>
            <option value="AMB">AMB</option>
            <option value="IB">IB</option>
            <option value="IDC">IDC</option>
            <option value="IM">IM</option>
            <option value="DIL">DIL</option>
            <option value="AEL">AEL</option>
            <option value="EML">EML</option>
            <option value="LEM">LEM</option>
            <option value="IAL">IAL</option>
            <option value="AGL">AGL</option>
            <option value="COL">COL</option>
            <option value="EL">EL</option>
            <option value="MIL">MIL</option>
            <option value="MEL">MEL</option>
            <option value="PIL">PIL</option>
            <option value="SOL">SOL</option>
            <option value="FOL">FOL</option>
            <option value="IBL">IBL</option>
            <option value="AEM">AEM</option>
            <option value="MCS">MCS</option>
            <option value="DE">DE</option>
            <option value="MIM">MIM</option>
            <option value="MQT">MQT</option>
            <option value="MCT">MCT</option>
            <option value="FOM">FOM</option>
            <option value="MC">MC</option>
            <option value="DEL">DEL</option>
            <option value="MDM">MDM</option>
            <option value="ETM">ETM</option>
            <option value="ELM">ELM</option>
            <option value="MIV">MIV</option>
            <option value="MIE">MIE</option>
            <option value="SOM">SOM</option>
            <option value="PIM">PIM</option>
            <option value="MCA">MCA</option>
            <option value="PCA">PCA</option>
            <option value="PCS">PCS</option>
            <option value="SP">SP</option>
            <option value="IF">IF</option>
            <option value="CDC">CDC</option>
            <option value="CDD">CDD</option>
            <option value="DVE">DVE</option>
          </select>
        </div>

        <div>
          <label htmlFor="admissionYear" className="block mb-1 font-medium">
            {t("registerStudent.admissionYear")}
          </label>
          <input
            id="admissionYear"
            name="admissionYear"
            type="text"
            value={form.admissionYear}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            {t("registerStudent.password")}
          </label>
          <PasswordInput
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <div className="text-xs text-gray-500 mt-1">
            {t("registerStudent.passwordRequirements")}
          </div>
          {form.password && !isPasswordValid(form.password) && (
            <div className="text-xs text-red-600 mt-1">
              {t("registerStudent.passwordInvalid")}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {loading ? t("registerStudent.loading") : t("registerStudent.submit")}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        {t("registerStudent.alreadyHave")}{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          {t("registerStudent.login")}
        </Link>
      </div>

      <div className="mt-2 text-center">
        <Link to="/login" className="text-sm text-gray-500 hover:underline">
          {t("register.backToLogin")}
        </Link>
      </div>
    </div>
  );
};

export default RegisterStudentPage;
