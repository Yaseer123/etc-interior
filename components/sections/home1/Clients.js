"use client";

import { useEffect, useState } from "react";

export default function Clients() {
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading clients...</div>
        </div>
      </section>
    );
  }

  if (clients.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Trusted Clients
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've had the privilege of working with amazing clients who trust us
            with their projects.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-16 w-auto object-contain mb-3"
                />
              ) : (
                <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-gray-500 text-lg font-semibold">
                    {client.name.charAt(0)}
                  </span>
                </div>
              )}
              <h3 className="text-sm font-medium text-gray-900 text-center">
                {client.name}
              </h3>
              {client.company && (
                <p className="text-xs text-gray-500 text-center mt-1">
                  {client.company}
                </p>
              )}
              {client.rating && (
                <div className="flex items-center mt-2">
                  {[...Array(client.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3 h-3 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Featured Clients Section */}
        {clients.filter((client) => client.featured).length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Featured Clients
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clients
                .filter((client) => client.featured)
                .map((client) => (
                  <div
                    key={client.id}
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center mb-4">
                      {client.logo ? (
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="h-12 w-auto object-contain mr-4"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                          <span className="text-gray-500 font-semibold">
                            {client.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {client.name}
                        </h4>
                        {client.company && (
                          <p className="text-sm text-gray-600">
                            {client.company}
                          </p>
                        )}
                      </div>
                    </div>
                    {client.description && (
                      <p className="text-gray-600 text-sm mb-4">
                        {client.description}
                      </p>
                    )}
                    {client.testimonial && (
                      <blockquote className="text-gray-700 italic text-sm border-l-4 border-indigo-500 pl-4">
                        "{client.testimonial}"
                      </blockquote>
                    )}
                    {client.rating && (
                      <div className="flex items-center mt-4">
                        {[...Array(client.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {client.rating}/5
                        </span>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


