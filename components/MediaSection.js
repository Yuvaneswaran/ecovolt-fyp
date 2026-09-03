export default function MediaSection() {
  return (
    <section className="relative py-24 px-6 md:px-16 max-w-5xl mx-auto">
      <h2 className="font-heading font-bold text-xl md:text-2xl text-white mb-10 text-center">
        SEE IT IN ACTION
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Images placeholder */}
        {[1, 2].map((i) => (
          <div
            key={i}
            className="neu-inset border border-grey/20 rounded-2xl aspect-square flex items-center justify-center"
          >
            <span className="font-sub tracking-wide text-grey text-sm">
              IMAGE {i}
            </span>
          </div>
        ))}
        {/* Video placeholder */}
        <div className="neu-inset border border-teal/30 rounded-2xl aspect-square flex items-center justify-center">
          <span className="font-sub tracking-wide text-teal text-sm">
            VIDEO
          </span>
        </div>
      </div>
    </section>
  );
}
