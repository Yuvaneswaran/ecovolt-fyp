const contacts = [
  {
    label: "WhatsApp",
    value: "+60 11-3196 5836",
    href: "https://wa.me/601131965836",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "ecovolt2026@gmail.com",
    href: "mailto:hello@ecovolt.net.my",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M2 4h20v16H2V4zm2 2v.01L12 13l8-6.99V6H4zm16 2.24l-7.4 6.47a1 1 0 01-1.2 0L4 8.24V18h16V8.24z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    value: "@ecovolt.my",
    href: "https://instagram.com/ecovolt.my",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2.2c3.2 0 3.6 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.25.07 1.63.07 4.81 0 3.19-.01 3.56-.07 4.81-.15 3.23-1.66 4.77-4.92 4.92-1.25.06-1.62.07-4.85.07-3.2 0-3.6 0-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.25-.07-1.62-.07-4.81 0-3.19.01-3.56.07-4.81.15-3.23 1.67-4.77 4.92-4.92C8.4 2.2 8.8 2.2 12 2.2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.4-8.4a1.17 1.17 0 100-2.34 1.17 1.17 0 000 2.34z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    value: "@ecovolt.my",
    href: "https://tiktok.com/@ecovolt.my",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0115.54 3h-3.09v12.4a2.592 2.592 0 01-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 004.29 1.38V7.3s-1.88.09-3.23-1.48z" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  return (
    <section className="relative py-24 px-6 md:px-16 max-w-4xl mx-auto text-center">
      <h2 className="font-heading font-bold text-xl md:text-2xl text-white mb-10">
        CONTACT US
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {contacts.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="neu-raised p-5 flex items-center gap-4 hover:text-teal transition-colors"
          >
            <div className="text-teal">{c.icon}</div>
            <div className="text-left">
              <div className="font-sub tracking-wide text-sm text-grey">
                {c.label}
              </div>
              <div className="font-body text-sm text-white">{c.value}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
