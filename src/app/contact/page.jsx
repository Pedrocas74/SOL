import styles from "@app/contact/Contact.module.css";
import Breadcrumbs from "@components/ui/Breadcrumbs";
import Footer from "@components/layout/Footer/Footer";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <section className={styles.contactSection}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Contact", href: "/contact" },
          ]}
        />
        <h1>Contact</h1>
        <div className={styles.contactInfo}>
          <p className={styles.contactInfoItem}>
            <Phone strokeOpacity={0.7} /> (+351) 915520689
          </p>
          <a
            href="mailto:pmig.magalhaes@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.contactInfoItem} ${styles.email}`}
          >
            <Mail strokeOpacity={0.7} /> pmig.magalhaes@gmail.com
          </a>
          <p className={styles.contactInfoItem}>
            <MapPin strokeOpacity={0.7} /> Prague, Czech Republic
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
