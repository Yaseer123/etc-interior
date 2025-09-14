import Layout from "@/components/layout/Layout";
import Clients from "@/components/sections/home1/Clients";

export const metadata = {
  title: "Our Clients - ETC Interior",
  description:
    "Meet our trusted clients who have chosen ETC Interior for their design and construction projects.",
};

export default function ClientsPage() {
  return (
    <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Our Clients">
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-red-900 mb-4">
              Our Trusted Clients
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've had the privilege of working with amazing clients who trust
              us with their projects. Each client relationship is built on
              trust, quality, and exceptional results.
            </p>
          </div>

          <div className="clients-content-section">
            <Clients showHeader={false} />
          </div>

          <div className="why-choose-section mt-16 text-center">
            <h2 className="text-3xl font-bold text-red-900 mb-8">
              Why Clients Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Quality Assurance
                </h3>
                <p className="text-gray-600">
                  We maintain the highest standards of quality in every project
                  we undertake.
                </p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Timely Delivery
                </h3>
                <p className="text-gray-600">
                  We complete projects on time and within budget, every time.
                </p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Customer Satisfaction
                </h3>
                <p className="text-gray-600">
                  Our clients' satisfaction is our top priority and driving
                  force.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
