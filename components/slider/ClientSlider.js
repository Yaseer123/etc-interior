"use client";

import { useEffect, useState } from "react";

export default function ClientSlider() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch("/api/clients");
      if (response.ok) {
        const data = await response.json();
        setClients(data);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading clients...</div>
        </div>
      </div>
    );
  }

  if (clients.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Trusted by Leading Companies
          </h2>
          <p className="text-gray-600">
            We're proud to work with these amazing clients
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-12 w-auto object-contain mb-2"
                />
              ) : (
                <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-gray-500 text-sm font-semibold">
                    {client.name.charAt(0)}
                  </span>
                </div>
              )}
              <h3 className="text-xs font-medium text-gray-900 text-center">
                {client.name}
              </h3>
              {client.company && (
                <p className="text-xs text-gray-500 text-center">
                  {client.company}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


