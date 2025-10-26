import { useState } from "react";

export default function ArdanaLanding() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full px-4 md:px-8 lg:px-[106px] py-6 md:py-8 lg:py-[33px]">
        <nav className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            <div className="flex items-center justify-end px-2 md:px-[9px] pt-[3px]">
              <span className="text-dark-red font-['DM_Sans'] text-lg md:text-xl font-medium leading-[140%]">
                Venera
              </span>
            </div>

            <div className="hidden md:block w-px h-16 bg-[#500101]"></div>

            <div className="flex flex-wrap items-start gap-4 md:gap-[27px] py-[7px]">
              <a
                href="/"
                className="text-dark-red font-['DM_Sans'] text-xs md:text-sm font-medium leading-[16.002px] tracking-[1.4px] uppercase"
              >
                INICIO
              </a>
              <a
                href="/tablero"
                className="text-dark-red font-['DM_Sans'] text-xs md:text-sm font-medium leading-[16.002px] tracking-[1.4px] uppercase"
              >
                TABLERO INTELIGENTE
              </a>
              <a
                href="/simulador"
                className="text-dark-red font-['DM_Sans'] text-xs md:text-sm font-medium leading-[16.002px] tracking-[1.4px] uppercase"
              >
                SIMULADOR
              </a>
              <a
                href="/ardana"
                className="text-dark-red font-['DM_Sans'] text-xs md:text-sm font-medium leading-[16.002px] tracking-[1.4px] uppercase underline"
              >
                ARDANA
              </a>
              <a
                href="/login"
                className="text-dark-red font-['DM_Sans'] text-xs md:text-sm font-medium leading-[16.002px] tracking-[1.4px] uppercase"
              >
                INICIAR SESIÓN
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            <span className="text-dark-red text-right font-['DM_Sans'] text-base md:text-lg font-bold leading-[32.004px]">
              Un producto de
            </span>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/97c8b4dd8a14fc8302f343d9d0bb53f5ec446f47?width=538"
              alt="Banorte Logo"
              className="h-6 md:h-[33px] w-auto"
            />
          </div>
        </nav>
      </header>

      <main className="flex-1 w-full px-4 md:px-8 lg:px-0">
        <div className="max-w-[1512px] mx-auto">
          <div className="flex flex-col items-center gap-4 md:gap-[18px] mt-8 md:mt-12 lg:mt-[158px] mb-8 md:mb-12 px-4">
            <h1 className="text-dark-red text-center font-['DM_Sans'] text-3xl md:text-5xl lg:text-[66px] font-bold leading-tight md:leading-[79.992px] tracking-[-1px]">
              Me presento, soy Ardana
            </h1>
            <p className="text-dark-red text-center font-['Arial'] text-lg md:text-2xl lg:text-[25px] font-normal leading-[21px]">
              Finanzas más claras. Decisiones más seguras. Empieza a hablar.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-start justify-center gap-8 lg:gap-12 px-4 pb-12 md:pb-20">
            <div className="w-full lg:w-auto flex flex-col items-center gap-8 lg:gap-[35px] bg-white p-6 md:p-8 lg:py-[34px] lg:px-2">
              <div className="w-32 h-32 md:w-48 md:h-48 lg:w-[285px] lg:h-[285px] rounded-full bg-[#292929] flex-shrink-0"></div>
              <p className="text-[#A1A4AC] text-center font-['Arial'] text-2xl md:text-3xl lg:text-[35px] font-normal leading-normal max-w-[467px]">
                ¿En que te puedo ayudar?
              </p>
            </div>

            <div className="w-full lg:w-auto lg:max-w-[775px] h-auto lg:min-h-[665px] rounded-[12.75px] bg-gradient-to-br from-[#BE1D20] to-[#21252C] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)] p-4 md:p-6 lg:p-3">
              <div className="space-y-4 md:space-y-5">
                <div className="flex items-center px-4 md:px-6 lg:px-[28px] py-3 lg:py-[13px] rounded-[10px] border border-[#BE1D20] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                  <span className="text-[#505050] font-manrope text-sm font-bold leading-[140%]">
                    Mariana Diaz
                  </span>
                </div>

                <div className="flex justify-start">
                  <div className="max-w-full md:max-w-[90%] lg:max-w-[415px] p-4 md:p-5 lg:px-[21px] lg:py-[15px] rounded-[10px] border border-[#BE1D20] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                    <p className="text-[#505050] font-manrope text-sm font-bold leading-[140%]">
                      Bienvenida, Mariana. Revisando tu información precargada,
                      noto que tus egresos son altos en comparación con tus
                      ingresos. ¿Podrías contarme un poco más sobre esto?
                      ¿Estás buscando invertir, ahorrar, pagar deudas o
                      planificar alguna meta específica?
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="max-w-full md:max-w-[90%] lg:max-w-[306px] p-4 md:p-5 lg:px-[27px] lg:pt-[11px] lg:pb-5 rounded-[10px] border border-[#BE1D20] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                    <p className="text-[#505050] font-manrope text-sm font-bold leading-[140%]">
                      Quiero empezar a ahorrar para poder comprarme un carro.
                      ¿Qué podría dejar de gastar para lograrlo?
                    </p>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="max-w-full md:max-w-[90%] lg:max-w-[354px] p-4 md:p-5 lg:px-[15px] lg:pt-[15px] lg:pb-2 rounded-[10px] border border-[#BE1D20] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                    <p className="text-[#505050] font-manrope text-sm font-bold leading-[140%]">
                      Analizando tus gasto, veo que podrías reducir alrededor de
                      un 15% en tus salidas por café. Si haces ese pequeño
                      ajuste, podrías empezar a destinar ese dinero a un fondo
                      de ahorro y ver resultados mucho antes de lo que imaginas
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="max-w-full md:max-w-[90%] lg:max-w-[295px] p-4 md:p-3 lg:px-[9px] lg:py-[14px] rounded-[10px] border border-[#BE1D20] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                    <p className="text-[#505050] font-manrope text-sm font-bold leading-[140%]">
                      ¿Y cuánto tiempo tardaría en alcanzar mi meta?
                    </p>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="max-w-full md:max-w-[90%] lg:max-w-[348px] p-4 md:p-3 lg:px-[8px] lg:pt-[5px] lg:pb-1 rounded-[10px] border border-[#BE1D20] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                    <p className="text-[#505050] font-manrope text-sm font-bold leading-[140%]">
                      Con tu ritmo actual y haciendo ese ajuste, podrías reunir
                      el monto necesario en aproximadamente 5 meses. Pequeños
                      cambios, grandes resultados
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 md:px-6 lg:px-[28px] py-2 md:py-3 lg:py-[10px] rounded-[10px] border border-[#BE1D20] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] mt-6 md:mt-8">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Entrada de texto"
                    className="flex-1 text-[#505050]/60 font-manrope text-sm font-bold leading-[140%] bg-transparent border-none outline-none"
                  />
                  <button className="flex-shrink-0 p-2">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/46b9cda9a63c38f66b78ce49e0d90e83d360bcd7?width=96"
                      alt="Send"
                      className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-[#8A0000] px-4 md:px-8 lg:px-[133px] py-8 md:py-12 lg:pt-14 lg:pb-8">
        <div className="max-w-[1246px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 mb-12 md:mb-16 lg:mb-24">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-white/50 flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="36" rx="18" fill="white" fillOpacity="0.5"/>
                  <path d="M18.0223 12.8438C15.1652 12.8438 12.8884 15.1652 12.8884 17.9777C12.8884 20.8348 15.1652 23.1116 18.0223 23.1116C20.8348 23.1116 23.1562 20.8348 23.1562 17.9777C23.1562 15.1652 20.8348 12.8438 18.0223 12.8438ZM18.0223 21.3259C16.192 21.3259 14.6741 19.8527 14.6741 17.9777C14.6741 16.1473 16.1473 14.6741 18.0223 14.6741C19.8527 14.6741 21.3259 16.1473 21.3259 17.9777C21.3259 19.8527 19.8527 21.3259 18.0223 21.3259ZM24.5402 12.6652C24.5402 11.9955 24.0045 11.4598 23.3348 11.4598C22.6652 11.4598 22.1295 11.9955 22.1295 12.6652C22.1295 13.3348 22.6652 13.8705 23.3348 13.8705C24.0045 13.8705 24.5402 13.3348 24.5402 12.6652ZM27.933 13.8705C27.8438 12.2634 27.4866 10.8348 26.3259 9.67411C25.1652 8.51339 23.7366 8.15625 22.1295 8.06696C20.4777 7.97768 15.5223 7.97768 13.8705 8.06696C12.2634 8.15625 10.8795 8.51339 9.67411 9.67411C8.51339 10.8348 8.15625 12.2634 8.06696 13.8705C7.97768 15.5223 7.97768 20.4777 8.06696 22.1295C8.15625 23.7366 8.51339 25.1205 9.67411 26.3259C10.8795 27.4866 12.2634 27.8438 13.8705 27.933C15.5223 28.0223 20.4777 28.0223 22.1295 27.933C23.7366 27.8438 25.1652 27.4866 26.3259 26.3259C27.4866 25.1205 27.8438 23.7366 27.933 22.1295C28.0223 20.4777 28.0223 15.5223 27.933 13.8705Z" fill="white"/>
                </svg>
              </div>

              <div className="w-9 h-9 rounded-full bg-white/50 flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="36" rx="18" fill="white" fillOpacity="0.5"/>
                  <path d="M25.8571 8H10.1429C8.9375 8 8 8.98214 8 10.1429V25.8571C8 27.0625 8.9375 28 10.1429 28H16.2589V21.2143H13.4464V18H16.2589V15.5893C16.2589 12.8214 17.9107 11.2589 20.4107 11.2589C21.6607 11.2589 22.9107 11.4821 22.9107 11.4821V14.2054H21.5268C20.1429 14.2054 19.6964 15.0536 19.6964 15.9464V18H22.7768L22.2857 21.2143H19.6964V28H25.8571C27.0179 28 28 27.0625 28 25.8571V10.1429C28 8.98214 27.0179 8 25.8571 8Z" fill="white"/>
                </svg>
              </div>

              <div className="w-9 h-9 rounded-full bg-white/50 flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="36" rx="18" fill="white" fillOpacity="0.5"/>
                  <path d="M12.4743 28V14.6219H8.3132V28H12.4743ZM10.3714 12.8322C11.7136 12.8322 12.7875 11.7136 12.7875 10.3714C12.7875 9.07383 11.7136 8 10.3714 8C9.07383 8 8 9.07383 8 10.3714C8 11.7136 9.07383 12.8322 10.3714 12.8322ZM28.0447 28V20.6622C28.0447 17.0828 27.2394 14.3087 23.0336 14.3087C21.0201 14.3087 19.6779 15.4273 19.0962 16.4564H19.0515V14.6219H15.0694V28H19.2304V21.3781C19.2304 19.6331 19.5436 17.9776 21.6913 17.9776C23.8389 17.9776 23.8837 19.9463 23.8837 21.5123V28H28.0447Z" fill="white"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-[45px]">
            <div className="flex flex-col gap-6 md:gap-8 lg:gap-[35px]">
              <div className="pb-4 md:pb-6 lg:pb-[31px] border-b border-white">
                <h3 className="text-white font-['DM_Sans'] text-base md:text-lg font-bold leading-[25.992px] tracking-[0.9px] uppercase">
                  Menu
                </h3>
              </div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-[45px]">
                <div className="flex flex-col gap-4 md:gap-[18px]">
                  <a href="/" className="text-white font-['DM_Sans'] text-sm font-bold leading-[16.002px] tracking-[1.4px] uppercase">
                    INICIO
                  </a>
                  <a href="/simulador" className="text-white font-['DM_Sans'] text-sm font-normal leading-[16.002px] tracking-[1.4px] uppercase">
                    SIMULADOR
                  </a>
                </div>

                <div className="flex flex-col gap-4 md:gap-[18px]">
                  <a href="/tablero" className="text-white font-['DM_Sans'] text-sm font-normal leading-[16.002px] tracking-[1.4px] uppercase">
                    TABLERO INTELIGENTE
                  </a>
                  <a href="/ardana" className="text-white font-['DM_Sans'] text-sm font-normal leading-[16.002px] tracking-[1.4px] uppercase">
                    ARDANA
                  </a>
                  <a href="/login" className="text-white font-['DM_Sans'] text-sm font-normal leading-[16.002px] tracking-[1.4px] uppercase">
                    INICIAR SESIÓN
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-8 md:mt-12">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/40cf25a6a61619af4ee35e39dd73f006ab3c14f2?width=46"
              alt="Venera Icon"
              className="w-5 md:w-6 h-auto"
            />
            <span className="text-white font-['DM_Sans'] text-lg md:text-xl font-medium leading-[140%]">
              Venera
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
