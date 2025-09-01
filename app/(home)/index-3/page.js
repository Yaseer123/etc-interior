import Layout from "@/components/layout/Layout";
import About from "@/components/sections/home3/About";
import Awards from "@/components/sections/home3/Awards";
import Banner from "@/components/sections/home3/Banner";
import Blog from "@/components/sections/home3/Blog";
import Brand from "@/components/sections/home3/Brand";
import Clients from "@/components/sections/home3/Clients";
import Features from "@/components/sections/home3/Features";
import Features1 from "@/components/sections/home3/Features1";
import Projects from "@/components/sections/home3/Projects";
import Services from "@/components/sections/home3/Services";
import Team from "@/components/sections/home3/Team";
import Testimonial from "@/components/sections/home3/Testimonial";
import Video from "@/components/sections/home3/Video";
export default function Home() {
  return (
    <>
      <Layout headerStyle={3} footerStyle={1}>
        <Banner />
        <Features />
        <About />
        <Projects />
        <Awards />
        <Brand />
        <Clients />
        <Services />
        <Features1 />
        <Video />
        <Testimonial />
        <Team />
        <Blog />
      </Layout>
    </>
  );
}
