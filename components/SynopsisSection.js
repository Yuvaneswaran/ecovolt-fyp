export default function SynopsisSection() {
  const points = [
    {
      title: "Knows When You're There",
      desc: "Occupancy sensors detect when someone enters or leaves a room, so energy isn't wasted on empty spaces.",
    },
    {
      title: "Reads the Light",
      desc: "Brightness sensors track natural light levels, helping decide when lighting is actually needed.",
    },
    {
      title: "Control From Anywhere",
      desc: "Lights, fans, and sockets can be switched on or off remotely, right from the dashboard.",
    },
    {
      title: "Tracks Every Watt",
      desc: "Monthly consumption and estimated cost are calculated automatically per appliance.",
    },
  ];

  return (
    <section className="relative py-24 px-6 md:px-16 max-w-5xl mx-auto">
      <h2 className="font-heading font-bold text-xl md:text-2xl text-white mb-4 text-center">
        WHAT THE SYSTEM DOES
      </h2>
      <p className="font-body text-grey text-center max-w-2xl mx-auto mb-14">
        A small IoT device connected to your appliances, paired with a live
        dashboard that shows exactly where your electricity is going.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {points.map((p) => (
          <div key={p.title} className="neu-raised p-6">
            <h3 className="font-sub tracking-wide text-teal text-lg mb-2">
              {p.title}
            </h3>
            <p className="font-body text-grey text-sm leading-relaxed">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
