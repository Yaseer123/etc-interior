import "@/node_modules/react-modal-video/css/modal-video.css";
import "swiper/css";
import "../public/assets/css/style.css";
// import "swiper/css/navigation"
import DynamicTitle from "@/components/elements/DynamicTitle";
import SessionProvider from "@/components/providers/SessionProvider";
import { dM_Sans } from "@/lib/font";
import "swiper/css/free-mode";
import "swiper/css/pagination";

export const metadata = {
  title: "Interior Design & Architecture",
  description: "Professional interior design and architecture services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dM_Sans.variable}`}>
      <body>
        <SessionProvider>
          <DynamicTitle />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
