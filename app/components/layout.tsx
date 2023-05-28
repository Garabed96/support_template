import React from "react";
import NavBar from "./header/NavBar";
import Footer from "./Footer/Footer";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <NavBar />
      {children}
      <Footer />
    </section>
  );
}
