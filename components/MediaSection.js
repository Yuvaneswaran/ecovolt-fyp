export default function MediaSection() {
  return (
    <section className="relative py-20 px-6 md:px-16 max-w-6xl mx-auto">
      
      <h2 className="font-heading font-bold text-xl md:text-2xl text-white mb-10 text-center">
        SEE IT IN ACTION
      </h2>

      {/* TOP TWO IMAGES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Image 1 */}
        <div className="neu-inset border border-grey/20 rounded-2xl h-[280px] overflow-hidden">
          <img
            src="/media/image1.jpg"
            alt="EcoVolt system in action"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image 2 */}
        <div className="neu-inset border border-grey/20 rounded-2xl h-[280px] overflow-hidden">
          <img
            src="/media/image2.jpg"
            alt="EcoVolt hardware setup"
            className="w-full h-full object-cover"
          />
        </div>

      </div>

      {/* BOTTOM LANDSCAPE VIDEO */}
      <div className="mt-8 max-w-3xl mx-auto">
        <div className="neu-inset border border-teal/30 rounded-2xl aspect-video overflow-hidden">
          <video
            src="/media/video.mp4"
            controls
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </section>
  );
}