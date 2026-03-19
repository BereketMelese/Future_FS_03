"use client";

import { useState } from "react";
import Button from "@/src/components/ui/Button";
import InputField from "@/src/components/ui/InputField";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to send.");
      }

      setStatus("Message sent successfully.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div className="section-shell grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <h1 className="text-4xl sm:text-5xl">Contact Us</h1>
        <p className="mt-4 text-muted">
          Questions, reservations, collaborations, or private tasting events.
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-[rgba(245,233,220,0.12)]">
          <iframe
            title="Coffee house map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d993.0482184980007!2d38.66481025533502!3d8.93517466365527!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b81cbb2f2047b%3A0x106cccdf3d02bf6f!2z4Yuo4YuL4YqV4YyL4YiqIOGKoOGKreGIsuGLjuGKlSDhiJvhiIXhiaDhiK0g4YiF4YqV4Yy7IFlld2FuZ2FyaQ!5e1!3m2!1sen!2set!4v1773924811972!5m2!1sen!2set"
            className="h-70 w-full"
            loading="lazy"
          />
        </div>
      </div>

      <form onSubmit={submit} className="glass-panel space-y-4 rounded-2xl p-6">
        <InputField
          id="contact-name"
          label="Name"
          value={form.name}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, name: event.target.value }))
          }
          required
        />
        <InputField
          id="contact-email"
          type="email"
          label="Email"
          value={form.email}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, email: event.target.value }))
          }
          required
        />
        <label htmlFor="contact-message" className="block space-y-2">
          <span className="text-sm text-[rgba(245,233,220,0.82)]">Message</span>
          <textarea
            id="contact-message"
            rows={5}
            value={form.message}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, message: event.target.value }))
            }
            className="w-full rounded-xl border border-[rgba(245,233,220,0.16)] bg-[rgba(245,233,220,0.05)] px-4 py-3 text-sm text-(--secondary) outline-none transition focus:border-(--accent)"
            required
          />
        </label>
        <Button type="submit">Send Message</Button>
        {status ? <p className="text-sm text-(--accent)">{status}</p> : null}
      </form>
    </div>
  );
}
