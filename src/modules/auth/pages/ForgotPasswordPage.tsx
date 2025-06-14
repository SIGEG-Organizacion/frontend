import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import authService from "../services/authService";

const ForgotPasswordPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword({ email });
    } catch (err: any) {
      // No importa si hay error, siempre mostrar el popup
    } finally {
      setShowPopup(true);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t("forgotPassword.title")}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            {t("forgotPassword.email")}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {loading ? t("forgotPassword.loading") : t("forgotPassword.submit")}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        <Link to="/login" className="text-gray-600 hover:underline">
          {t("forgotPassword.backToLogin")}
        </Link>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="mb-4">
              {i18n.language.startsWith("es")
                ? "Si el correo existe, se ha enviado una nueva contraseña a tu correo electrónico."
                : "If the email exists, a new password has been sent to your email address."}
            </p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setShowPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
