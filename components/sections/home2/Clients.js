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
      <section className="clients-section">
        <div className="auto-container">
          <div className="text-center">Loading clients...</div>
        </div>
      </section>
    );
  }

  if (clients.length === 0) {
    return null;
  }

  return (
    <section className="clients-section">
      <div className="auto-container">
        <div className="sec-title text-center">
          <h2>Our Trusted Clients</h2>
          <p>
            We've had the privilege of working with amazing clients who trust us
            with their projects.
          </p>
        </div>

        <div className="clients-carousel owl-carousel owl-theme">
          {clients.map((client) => (
            <div key={client.id} className="client-block">
              <div className="inner-box">
                {client.logo ? (
                  <img src={client.logo} alt={client.name} />
                ) : (
                  <div className="client-placeholder">
                    <span>{client.name.charAt(0)}</span>
                  </div>
                )}
                <h4>{client.name}</h4>
                {client.company && <p>{client.company}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Clients */}
        {clients.filter((client) => client.featured).length > 0 && (
          <div className="featured-clients">
            <div className="sec-title text-center">
              <h3>Featured Clients</h3>
            </div>
            <div className="row">
              {clients
                .filter((client) => client.featured)
                .map((client) => (
                  <div key={client.id} className="col-lg-4 col-md-6">
                    <div className="featured-client-block">
                      <div className="inner-box">
                        <div className="client-info">
                          {client.logo ? (
                            <img src={client.logo} alt={client.name} />
                          ) : (
                            <div className="client-placeholder">
                              <span>{client.name.charAt(0)}</span>
                            </div>
                          )}
                          <div className="client-details">
                            <h4>{client.name}</h4>
                            {client.company && <p>{client.company}</p>}
                          </div>
                        </div>
                        {client.description && (
                          <p className="description">{client.description}</p>
                        )}
                        {client.testimonial && (
                          <blockquote>"{client.testimonial}"</blockquote>
                        )}
                        {client.rating && (
                          <div className="rating">
                            {[...Array(client.rating)].map((_, i) => (
                              <i key={i} className="fas fa-star"></i>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
