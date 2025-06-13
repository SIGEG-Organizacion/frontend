import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../modules/auth/hooks/useAuth";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold flex items-center">
            <p>SI</p>
            <p className="text-blue-500">GEV</p>
          </Link>

          <div className="flex space-x-4">
            <Link to="/" className="hover:underline">
              {t("navbar.home")}
            </Link>

            <Link to="/support" className="hover:underline">
              {t("navbar.support")}
            </Link>

            {user ? (
              <>
                {/* Opciones según rol */}
                {(user.role === "adminTFG" || user.role === "adminLink") && (
                  <>
                    <Link to="/admin/users" className="hover:underline">
                      {t("navbar.users")}
                    </Link>
                    <Link to="/dashboard" className="hover:underline">
                      {t("navbar.dashboard")}
                    </Link>
                    {/* <Link to="/admin/calendar" className="hover:underline">
                      {t("navbar.calendar")}
                    </Link> */}
                    <Link to="/profile" className="hover:underline">
                      {t("navbar.profile")}
                    </Link>
                  </>
                )}
                {user.role === "company" && (
                  <>
                    <Link to="/dashboard" className="hover:underline">
                      {t("navbar.dashboard")}
                    </Link>

                    <Link to="/profile" className="hover:underline">
                      {t("navbar.profile")}
                    </Link>
                  </>
                )}
                {user.role === "student" && (
                  <>
                    <Link to="/opportunities" className="hover:underline">
                      {t("navbar.publications")}
                    </Link>

                    <Link to="/interests" className="hover:underline">
                      {t("navbar.myInterests")}
                    </Link>

                    <Link to="/profile" className="hover:underline">
                      {t("navbar.profile")}
                    </Link>
                  </>
                )}
                <button onClick={handleLogout} className="hover:underline">
                  {t("navbar.logout")}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline">
                  {t("navbar.login")}
                </Link>
                <Link to="/register" className="hover:underline">
                  {t("navbar.register")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
