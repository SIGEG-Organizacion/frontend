import React, { useState, useEffect } from "react";
import {
  getInterestsByOpportunity,
  Interest as ServiceInterest,
} from "../services/interestService";
import type { Opportunity } from "../types/opportunity";

interface Interest {
  userName: string;
  userEmail: string;
  userContact?: string;
  graduationDate?: string;
}

interface Props {
  opportunity: Opportunity | null;
  onClose: () => void;
}

const OpportunityInterestsModal: React.FC<Props> = ({
  opportunity,
  onClose,
}) => {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!opportunity) return;
    setLoading(true);
    getInterestsByOpportunity(opportunity.uuid)
      .then((data: ServiceInterest[]) => {
        setInterests(
          data.map((i) => ({
            userName: i.userName,
            userEmail: i.userEmail,
            userContact: (i as any).userContact || (i as any).contact || "",
            graduationDate: (i as any).graduationDate || "",
          }))
        );
      })
      .catch(() => setError("Error al cargar los intereses"))
      .finally(() => setLoading(false));
  }, [opportunity]);

  if (!opportunity) return null;

  return (
    <>
      <div
        className="fixed top-[4rem] inset-x-0 bottom-0 z-40"
        style={{ backdropFilter: "blur(4px)" }}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              Usuarios interesados en: {opportunity.description}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
          {loading && <div>Cargando...</div>}
          {error && <div className="text-red-600">{error}</div>}
          {!loading && !error && (
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Nombre</th>
                  <th className="px-4 py-2 text-left">Correo</th>
                  <th className="px-4 py-2 text-left">Teléfono</th>
                  <th className="px-4 py-2 text-left">Fecha de graduación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {interests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No hay usuarios interesados.
                    </td>
                  </tr>
                ) : (
                  interests.map((user, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{user.userName}</td>
                      <td className="px-4 py-2">{user.userEmail}</td>
                      <td className="px-4 py-2">{user.userContact || "-"}</td>
                      <td className="px-4 py-2">
                        {user.graduationDate || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default OpportunityInterestsModal;
