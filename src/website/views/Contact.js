import React, { useEffect } from "react";

import ContactCard from "../components/Contact/ContactCard";
import ContactForm from "../components/Contact/ContactForm";
import GoogleMap from "../components/Contact/GoogleMap";

const Contact = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <React.Fragment>
      <ContactCard />
      <GoogleMap />
      <ContactForm />
    </React.Fragment>
  );
};

export default Contact;
