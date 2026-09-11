import { useState, FormEvent } from 'react';
import { Mail, Info, Send } from 'lucide-react';

export function ContactPage() {
  const [formAttempted, setFormAttempted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormAttempted(true);
  };

  return (
    <main className="flex-1 max-w-2xl w-full mx-auto px-5 py-8 sm:py-12 space-y-8">
      {/* 1. Header */}
      <section aria-labelledby="contact-heading" className="space-y-2">
        <h1
          id="contact-heading"
          className="text-3xl sm:text-4xl font-display font-extrabold text-[#1A1918] tracking-tight"
        >
          Contact
        </h1>
        <p className="text-base sm:text-lg text-[#4E4942] leading-relaxed font-sans">
          Have a question, found a problem, or have an idea for a calculator? We&apos;d love to hear from you.
        </p>
      </section>

      {/* 2. Contact Form Container */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E6DDD1] shadow-[0_4px_20px_-2px_rgba(180,150,125,0.12)] space-y-6">
        {formAttempted ? (
          <div className="py-4 space-y-4">
            <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#DFD5C6] flex items-start gap-3">
              <Info className="w-5 h-5 text-[#163A5F] shrink-0 mt-0.5" />
              <div className="space-y-1 text-sm font-sans text-[#4E4942]">
                <p className="font-semibold text-[#1A1918]">
                  The contact form is not connected to a mail service yet.
                </p>
                <p>
                  Please email us directly at{' '}
                  <a
                    href="mailto:hello@projecttally.com"
                    className="font-semibold text-[#163A5F] underline hover:text-[#112F4D]"
                  >
                    hello@projecttally.com
                  </a>{' '}
                  and we will be glad to assist you.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setFormAttempted(false)}
              className="text-xs font-semibold text-[#163A5F] hover:underline cursor-pointer"
            >
              ← Edit message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-xs sm:text-sm font-medium text-[#1A1918] mb-1.5 font-sans"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-4 py-2.5 text-sm font-sans text-[#1A1918] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-hidden transition-all placeholder:text-[#9A9185]"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block text-xs sm:text-sm font-medium text-[#1A1918] mb-1.5 font-sans"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-4 py-2.5 text-sm font-sans text-[#1A1918] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-hidden transition-all placeholder:text-[#9A9185]"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs sm:text-sm font-medium text-[#1A1918] mb-1.5 font-sans"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help?"
                className="w-full bg-[#FDFBF7] border border-[#DFD5C6] focus:bg-[#FFFFFF] focus:border-[#163A5F] focus:ring-2 focus:ring-[#163A5F]/15 rounded-xl px-4 py-2.5 text-sm font-sans text-[#1A1918] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] outline-hidden transition-all resize-none placeholder:text-[#9A9185]"
              />
            </div>

            <button
              type="submit"
              className="w-full min-h-[46px] py-3 px-6 rounded-xl bg-[#163A5F] text-white font-sans text-sm font-bold shadow-[0_2px_8px_rgba(22,58,95,0.2)] hover:bg-[#112F4D] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send message</span>
            </button>
          </form>
        )}
      </section>

      {/* 3. Direct Email Contact */}
      <section className="p-4 rounded-xl bg-[#FFFDF9] border border-[#EAE0D5] flex items-center justify-between gap-3 text-xs sm:text-sm text-[#4E4942]">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#163A5F]" />
          <span>Email directly</span>
        </div>
        <a
          href="mailto:hello@projecttally.com"
          className="font-semibold text-[#163A5F] hover:underline"
        >
          hello@projecttally.com
        </a>
      </section>
    </main>
  );
}
