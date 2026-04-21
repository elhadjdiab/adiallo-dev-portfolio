"use client";

import ContactForm from "@/components/ContactForm";
import Container from "@/components/ui/Container";

export const metadata = {
  title: "Contact - Abdoulaye Diallo",
  description: "Contactez-moi pour discuter de votre projet web ou mobile. Disponible pour des missions freelance et collaborations.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] pb-24 pt-32">
      <Container size="md">
        <ContactForm />
      </Container>
    </main>
  );
}
