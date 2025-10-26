export default function Footer() {
  return (
    <footer className="w-full bg-venera-red px-6 md:px-[133px] py-8 md:pt-14 md:pb-8">
      <div className="w-full max-w-[1246px] mx-auto">
        <div className="flex items-center gap-3 mb-8 md:mb-[132px]">
          {["insta","fb","in"].map((k) => (
            <span key={k} className="w-9 h-9 rounded-full bg-white/50 inline-flex items-center justify-center" />
          ))}
        </div>
        <div className="mb-12">
          <div className="border-b border-white pb-4 mb-8 md:mb-9">
            <h3 className="font-display text-lg font-bold text-white uppercase tracking-[0.9px]">Menu</h3>
          </div>
          <div className="grid grid-cols-2 gap-8 md:gap-12 max-w-[280px]">
            <div className="flex flex-col gap-[18px]">
              <a href="#" className="font-display text-sm font-bold text-white uppercase tracking-[1.4px]">Home</a>
              <a href="#" className="font-display text-sm text-white uppercase tracking-[1.4px]">About</a>
              <a href="#" className="font-display text-sm text-white uppercase tracking-[1.4px]">Pricing</a>
            </div>
            <div className="flex flex-col gap-[18px]">
              <a href="#" className="font-display text-sm text-white uppercase tracking-[1.4px]">Tokens</a>
              <a href="#" className="font-display text-sm text-white uppercase tracking-[1.4px]">Blog</a>
              <a href="#" className="font-display text-sm text-white uppercase tracking-[1.4px]">Contact Us</a>
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-white/30 mb-8" />
        <p className="font-display text-base text-white text-center md:text-left">All rights reserved</p>
        <div className="mt-12 md:absolute md:left-[158px] md:bottom-[64px]">
          <span className="font-display text-xl font-medium text-white">Venera</span>
        </div>
      </div>
    </footer>
  );
}