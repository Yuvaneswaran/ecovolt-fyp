export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="relative z-10">
        <h1
          className="font-heading font-bold text-3xl md:text-5xl text-white mb-4"
          style={{ textShadow: "0 0 18px rgba(19,56,99,0.9), 0 0 40px rgba(19,56,99,0.5)" }}
        >
          CUT THE WASTE,<br />KEEP THE WATTS.
        </h1>
        <p className="font-sub tracking-widest text-grey text-lg md:text-2xl mb-10">
          SMART ENERGY SAVING, MADE SIMPLE
        </p>
        <a
          href="/login"
          className="neu-glow inline-block font-sub tracking-wider text-base px-8 py-3 rounded-xl text-white hover:text-teal transition-colors"
        >
          LOGIN TO DASHBOARD
        </a>
      </div>
    </section>
  );
}
