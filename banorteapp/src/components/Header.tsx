export default function Header() {
  return (
    <header className="w-full px-4 sm:px-6 lg:px-[106px] py-4 lg:py-[33px]">
      <nav className="w-full max-w-[1512px] mx-auto flex items-center justify-between gap-4 min-w-0">
        <div className="flex items-center gap-4 lg:gap-8 min-w-0 flex-1">
          <div className="flex items-center flex-shrink-0">
            <span className="font-display text-xl lg:text-2xl font-medium text-venera-red">Venera</span>
          </div>
          <div className="hidden md:block w-px h-[50px] lg:h-[66px] bg-venera-dark-red" />
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-7 overflow-x-auto whitespace-nowrap no-scrollbar min-w-0">
            <a href="/" className="font-display text-sm font-medium text-venera-red uppercase tracking-[1.4px] underline decoration-venera-red">INICIO</a>
            <a href="#" className="font-display text-sm font-medium text-venera-red uppercase tracking-[1.4px]">TABLERO INTELIGENTE</a>
            <a href="#" className="font-display text-sm font-medium text-venera-red uppercase tracking-[1.4px]">SIMULADOR</a>
            <a href="#" className="font-display text-sm font-medium text-venera-red uppercase tracking-[1.4px]">INICIAR SESIÓN</a>
          </div>
        </div>
        <div className="flex items-center gap-3 lg:gap-6 flex-shrink-0">
          <span className="font-display text-sm lg:text-lg font-bold text-venera-red whitespace-nowrap">Un producto de</span>
          <img src="https://api.builder.io/api/v1/image/assets/TEMP/97c8b4dd8a14fc8302f343d9d0bb53f5ec446f47?width=538" alt="Banorte" className="h-6 lg:h-[33px] w-auto" />
        </div>
      </nav>
    </header>
  );
}