import Navbar from "@components/Navbar";
import FooterSimple from "@components/FooterSimple";
import Breadcrumbs from "@components/Breadcrumbs";
import { notFound } from "next/navigation";

export default function NotFound() {


  return (
    <section style={{
      border: "1px solid red"
    }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you requested does not exist.</p>
    </section>
  );
}