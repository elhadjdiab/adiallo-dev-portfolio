"use client";

import ContactForm from "@/components/ContactForm";
import Container from "@/components/ui/Container";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] pb-24 pt-32">
      <Container size="md">
        <ContactForm />
      </Container>
    </main>
  );
}
