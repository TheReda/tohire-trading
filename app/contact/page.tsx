"use client";
import ContactForm from "../../components/ContactForm";

export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Contact us</h1>
      <p className="mt-2 text-gray-600">Send us a message and we’ll get back to you shortly.</p>
      <ContactForm />
    </main>
  );
}
