import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="bg-slate-950 px-4 pb-28 pt-12 sm:px-8 sm:pb-32 sm:pt-16">
      <section className="mx-auto w-full max-w-3xl">
        <ContactForm />
      </section>
    </main>
  );
}
