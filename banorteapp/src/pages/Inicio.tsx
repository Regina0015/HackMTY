import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function ArdanaLanding() {
 return (
   <div className="min-h-screen bg-white overflow-hidden">
     <HeaderLocal />
     <HeroSection />
     <FeaturesSection />
     <BusinessSection />
     <ChatSection />
     <FooterLocal />
   </div>
 );
}

function HeaderLocal() {
 return (
   <header className="w-full px-6 md:px-28 py-8 md:py-10">
     <nav className="flex items-center justify-between max-w-[1500px] mx-auto gap-8">
       <div className="flex items-center gap-8">
         <div className="flex items-center py-1">
           <span className="text-[#8A0000] text-xl font-sans font-medium">Venera</span>
         </div>
         <div className="hidden md:block w-px h-16 bg-[#500101]" />
         <div className="hidden lg:flex items-center gap-7 py-2">
           <a
             href="#"
             className="text-[#8A0000] text-sm font-sans font-medium tracking-[1.4px] uppercase underline decoration-[#8A0000] underline-offset-4"
           >
             iNICIO
           </a>
           <a href="#" className="text-[#8A0000] text-sm font-sans font-medium tracking-[1.4px] uppercase">
             TABLERO INTELIGENTE
           </a>
           <a href="#" className="text-[#8A0000] text-sm font-sans font-medium tracking-[1.4px] uppercase">
             SIMULADOR
           </a>
           <a href="#" className="text-[#8A0000] text-sm font-sans font-medium tracking-[1.4px] uppercase">
             INICIAR SESIÓN
           </a>
         </div>
       </div>
       <div className="hidden xl:flex items-center gap-4">
         <span className="text-[#8A0000] text-lg font-sans font-bold leading-8">Un producto de</span>
         <img
           src="https://api.builder.io/api/v1/image/assets/TEMP/97c8b4dd8a14fc8302f343d9d0bb53f5ec446f47?width=538"
           alt="Banorte Logo"
           className="h-[33px] w-auto"
         />
       </div>
     </nav>
   </header>
 );
}

function HeroSection() {
 return (
   <section className="relative w-full min-h-[900px] bg-white overflow-hidden px-6 md:px-32 py-24 md:py-32">
     <div className="absolute left-1/3 top-1/2 w-[681px] h-[353px] bg-[#8A0000]/30 blur-[150px] rounded-full -translate-y-1/2" />
     <div className="absolute right-0 top-32 w-[874px] h-[873px] opacity-40">
       <div className="w-full h-full bg-[#892C2C] blur-[96px] rounded-full" />
     </div>
     <div className="absolute -left-32 -top-24 w-[1222px] h-[1222px] opacity-40">
       <div className="w-full h-full bg-[#8A0000] blur-[96px] rounded-full" />
     </div>

     <div className="relative z-10 max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
       <div>
         <h1 className="text-[#8A0000] font-sans text-4xl md:text-[66px] font-bold leading-tight md:leading-[80px] tracking-[-1px] mb-6">
           Ardana:
           <br />
           La manera inteligente de ver tu dinero claramente.
         </h1>
         <p className="text-[#250101] font-sans text-lg leading-8 mb-10 max-w-[616px]">
           Entiende tus finanzas, predice tus oportunidades, y haz movimientos astutos: sin problemas, con inteligencia, a la perfección.
         </p>
         <button className="bg-[#5B0202] text-white font-sans font-bold text-base tracking-[1.6px] uppercase px-8 py-6 rounded-[80px] hover:bg-[#8A0000] transition-colors">
           Comienza a planear
         </button>
       </div>

       <div className="relative flex items-center justify-center">
         <div className="relative w-full max-w-[600px]">
           <svg viewBox="0 0 971 585" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
             <path d="M86.1813 24.7064C86.1813 11.0614 97.2428 0 110.888 0H860.772C874.417 0 885.479 11.0615 885.479 24.7065V545.364H86.1813V24.7064Z" fill="#23213B" />
             <path d="M116.769 579.813C116.502 580.478 115.651 581.887 114.373 582.207C114.24 583.138 113.654 584.999 112.377 584.999H57.6781C56.4005 584.999 55.8149 583.138 55.6818 582.207C54.4042 581.887 53.5524 580.478 53.2863 579.813H116.769Z" fill="#23213B" />
             <path d="M918.042 579.813C917.775 580.478 916.924 581.887 915.646 582.207C915.513 583.138 914.927 584.999 913.65 584.999H858.951C857.674 584.999 857.088 583.138 856.955 582.207C855.677 581.887 854.826 580.478 854.559 579.813H918.042Z" fill="#23213B" />
             <path d="M971.004 548.699V544.972H0.00402832V548.699C0.00402832 559.59 0.00402832 565.035 2.09283 569.195C3.9302 572.854 6.86197 575.829 10.468 577.693C14.5675 579.813 19.9341 579.813 30.6672 579.813H940.341C951.074 579.813 956.441 579.813 960.54 577.693C964.146 575.829 967.078 572.854 968.915 569.195C971.004 565.035 971.004 559.59 971.004 548.699Z" fill="#1C1B2D" />
             <path d="M401.294 544.972H570.181C570.181 552.243 564.286 558.138 557.015 558.138H414.46C407.189 558.138 401.294 552.243 401.294 544.972Z" fill="#353447" />
             <path d="M110.195 13.8096C104.006 13.8096 98.9885 18.8072 98.9885 24.9722V514.532H873.031V24.9722C873.031 18.8072 868.014 13.8096 861.824 13.8096H526.287C525.197 13.8096 524.313 14.6925 524.313 15.7817V23.6703C524.313 25.4857 522.84 26.9573 521.024 26.9573H450.633C448.453 26.9573 446.686 25.1913 446.686 23.013V15.7817C446.686 14.6925 445.802 13.8096 444.712 13.8096H110.195Z" fill="#353447" />
           </svg>
         </div>
       </div>
     </div>
   </section>
 );
}

function FeaturesSection() {
 const ref = useRef(null);
 const isInView = useInView(ref, { once: true, amount: 0.2 });
 const controls = useAnimation();

 useEffect(() => {
   if (isInView) controls.start("visible");
 }, [isInView, controls]);

 const titleVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 2, staggerChildren: 0.03 } } };
 const letterVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
 const cardVariants = {
   hidden: { opacity: 0, scale: 0.8, y: 50 },
   visible: (i: number) => ({ opacity: 1, scale: 1, y: 0, transition: { delay: i * 0.2, duration: 0.6, type: "spring", stiffness: 100 } }),
 };
 const phoneVariants = {
   hidden: { opacity: 0, scale: 0.9, y: 100 },
   visible: { opacity: 1, scale: 1, y: 0, transition: { delay: 0.3, duration: 0.8, type: "spring", stiffness: 80 } },
 };

 const title = "Descubra todo el potencial de Ardana";

 return (
   <section ref={ref} className="relative w-full bg-white px-6 md:px-32 py-24">
     <div className="max-w-[1500px] mx-auto">
       <motion.h2
         className="text-[#8A0000] text-center font-sans text-3xl md:text-[42px] font-bold leading-tight md:leading-[55px] mb-6"
         variants={titleVariants}
         initial="hidden"
         animate={controls}
       >
         {title.split("").map((c, i) => (
           <motion.span key={i} variants={letterVariants}>
             {c}
           </motion.span>
         ))}
       </motion.h2>

       <p className="text-[#250101] text-center font-sans text-lg leading-8 mb-16 max-w-[496px] mx-auto">
         Tu asistente financiero con IA que analiza, proyecta y te ayuda a decidir mejor.
       </p>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
         <div className="space-y-6">
           <FeatureCard
             icon={<img src="https://api.builder.io/api/v1/image/assets/TEMP/9493c7224dbe2f3557b5910054f3d511ae5a594a?width=184" alt="Biometric Access" className="w-[92px] h-[90px]" />}
             title="ACCESO BIOMÉTRICO"
             description="Inicia sesión con tus ojos: seguridad que se siente natural. La autenticación mantiene tus datos siempre protegidos."
             custom={0}
             variants={cardVariants}
             controls={controls}
           />
           <FeatureCard
             icon={<img src="https://api.builder.io/api/v1/image/assets/TEMP/e60398a0f0635474975d63e63de9afda7991f7b4?width=174" alt="Secure Wallet" className="w-[87px] h-[94px]" />}
             title="CARTERA 100% SEGURA"
             description="Guarda, envía y recibe dinero con total confianza. Tu información y transacciones están protegidas"
             custom={2}
             variants={cardVariants}
             controls={controls}
           />
         </div>

         <motion.div
           className="row-span-2 bg-[#8A0000] rounded-[40px] p-6 md:p-10 flex flex-col justify-between relative"
           custom={1}
           variants={phoneVariants}
           initial="hidden"
           animate={controls}
         >
           <div className="space-y-6">
             <h3 className="text-white font-sans text-xl font-bold tracking-[1px] uppercase leading-[26px]">SIMULADOR WHAT-IF?</h3>
             <p className="text-white font-sans text-base leading-[26px]">
               Planea, proyecta e invierte con confianza. Pon a prueba tus decisiones antes de tomarlas: ajusta variables, visualiza escenarios y observa tu futuro
               financiero en tiempo real.
             </p>
           </div>

           <div className="bg-white rounded-2xl p-6 space-y-6 mt-6">
             <div className="space-y-6">
               <div className="flex items-start justify-between">
                 <div>
                   <p className="text-[#6D6D6D] font-poppins text-[15px] mb-2">Balance Total</p>
                   <p className="text-black font-poppins text-4xl">$19,385.34</p>
                 </div>
                 <div className="w-[50px] h-[50px] rounded-full bg-black border border-[#9B9B9B]/60 flex items-center justify-center">
                   <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M9.5223 0H2.8344C2.5637 0 2.3567 0.2065 2.3567 0.4765C2.3567 0.7465 2.5637 0.9529 2.8344 0.9529H8.4076L0.1433 9.1959C-0.0478 9.3865 -0.0478 9.6882 0.1433 9.863C0.3344 10.0377 0.6369 10.0535 0.8121 9.863L9.0446 1.6676V7.1471C9.0446 7.4171 9.2516 7.6235 9.5223 7.6235C9.793 7.6235 10 7.4171 10 7.1471V0.4765C10 0.2065 9.793 0 9.5223 0Z" fill="white" />
                   </svg>
                 </div>
               </div>

               <div className="flex gap-2">
                 <ActionButton color="#FFF8C5">
                   <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                     <path d="M15.5 12.7549C15.7749 12.7549 15.9998 12.9795 16 13.2539V14.0029C16 15.1012 15.1 16 14 16H2C0.9 16 0 15.1012 0 14.0029V13.2539C0.000209356 12.9795 0.225128 12.7549 0.5 12.7549C0.774872 12.7549 0.999791 12.9795 1 13.2539V14.0283C1.00013 14.5774 1.45008 15.0264 2 15.0264H14C14.5499 15.0264 14.9999 14.5774 15 14.0283V13.2539C15.0002 12.9795 15.2251 12.7549 15.5 12.7549ZM8 0C8.12493 0 8.24964 0.0501823 8.34961 0.125L11.875 3.66895C12.075 3.86863 12.075 4.16848 11.875 4.36816C11.675 4.56785 11.3748 4.56785 11.1748 4.36816L8.5 1.69727V11.5068C8.5 11.7814 8.275 12.0059 8 12.0059C7.725 12.0059 7.5 11.7814 7.5 11.5068V1.69727L4.8252 4.36816C4.6252 4.56785 4.29961 4.56785 4.09961 4.36816C3.89982 4.16849 3.89971 3.86857 4.09961 3.66895L7.65039 0.149414C7.75033 0.0498173 7.87515 0 8 0Z" fill="black" />
                   </svg>
                 </ActionButton>
                 <ActionButton color="#C7E9F9">
                   <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                     <path d="M15.5 12.75C15.775 12.75 16 12.975 16 13.25V14C16 15.1 15.1 16 14 16H2C0.9 16 0 15.1 0 14V13.25C0 12.975 0.225 12.75 0.5 12.75C0.775 12.75 1 12.975 1 13.25V14.0254C1.00021 14.5752 1.45013 15.0254 2 15.0254H14C14.5499 15.0254 14.9998 14.5752 15 14.0254V13.25C15 12.975 15.225 12.75 15.5 12.75ZM8 0C8.275 0 8.5 0.225 8.5 0.5V10.8252L11.1748 8.1748C11.3748 7.97484 11.675 7.9749 11.875 8.1748C12.075 8.3498 12.075 8.675 11.875 8.875L8.34961 12.4004C8.24967 12.5001 8.12484 12.5498 8 12.5498C7.87516 12.5498 7.75033 12.5001 7.65039 12.4004L4.125 8.84961C3.92526 8.64967 3.92526 8.35033 4.125 8.15039C4.3 7.95039 4.6252 7.95039 4.8252 8.15039L7.5 10.8252V0.5C7.5 0.225 7.725 0 8 0Z" fill="black" />
                   </svg>
                 </ActionButton>
                 <ActionButton color="#CFF3AF">
                   <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
                     <path d="M12.5771 7.17188C12.7887 6.9428 13.154 6.94271 13.3848 7.17188L15.8271 9.59766C15.9425 9.71223 16 9.84627 16 9.99902C15.9999 10.1516 15.9422 10.285 15.8271 10.3994L13.3848 12.8447C13.154 13.0548 12.7884 13.0544 12.5576 12.8252C12.3271 12.6151 12.327 12.2526 12.5576 12.0234L14.0576 10.5332H0.577148C0.25035 10.5332 0.000190337 10.2855 0 9.96094C0 9.63623 0.250225 9.3877 0.577148 9.3877H14L12.5771 7.97461C12.3464 7.7645 12.3464 7.40108 12.5771 7.17188ZM2.61523 0.171875C2.84596 -0.0572875 3.2113 -0.0572022 3.42285 0.171875C3.65362 0.40108 3.65362 0.764505 3.42285 0.974609L2 2.3877H15.4229C15.7498 2.3877 16 2.63623 16 2.96094C15.9998 3.28546 15.7497 3.5332 15.4229 3.5332H1.94238L3.44238 5.02344C3.67302 5.25256 3.67288 5.61507 3.44238 5.8252C3.21161 6.0544 2.846 6.05483 2.61523 5.84473L0.172852 3.39941C0.057761 3.28495 6.43565e-05 3.15157 0 2.99902C0 2.84627 0.0575418 2.71223 0.172852 2.59766L2.61523 0.171875Z" fill="black" />
                   </svg>
                 </ActionButton>
                 <ActionButton color="#FFD9D9">
                   <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                     <path d="M7 0C8.375 0 9.5 1.125 9.5 2.5V4H12V12.5C12 14.425 10.425 16 8.5 16H3.5C1.575 16 0 14.425 0 12.5V4H2.5V2.5C2.5 1.125 3.625 0 5 0H7ZM1 5V12.5C1 13.875 2.125 15 3.5 15H8.5C9.875 15 11 13.875 11 12.5V5H1ZM5 1C4.175 1 3.5 1.675 3.5 2.5V4H8.5V2.5C8.5 1.675 7.825 1 7 1H5Z" fill="black" />
                   </svg>
                 </ActionButton>
               </div>

               <div className="space-y-3">
                 <p className="text-[#6D6D6D] font-poppins text-[15px]">Gastos de Septiembre</p>
                 <div className="relative h-6 bg-[#E4E4E4] rounded-xl overflow-hidden">
                   <div className="absolute h-full w-[68%] bg-black rounded-xl" />
                   <div className="absolute right-[31%] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black border border-[#8A8A8F]/50 flex items-center justify-center">
                     <svg width="3" height="12" viewBox="0 0 3 12" fill="none">
                       <path d="M1.5 9C2.32843 9 3 9.67157 3 10.5C3 11.3284 2.32843 12 1.5 12C0.671573 12 0 11.3284 0 10.5C0 9.67157 0.671573 9 1.5 9ZM1.5 4.5C2.32843 4.5 3 5.17157 3 6C3 6.82843 2.32843 7.5 1.5 7.5C0.671573 7.5 0 6.82843 0 6C0 5.17157 0.671573 4.5 1.5 4.5ZM1.5 0C2.32843 0 3 0.671573 3 1.5C3 2.32843 2.32843  1.5 3C0.671573 3 0 2.32843 0 1.5C0 0.671573 0.671573 0 1.5 0Z" fill="white" />
                     </svg>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <p className="text-black font-poppins text-xl">$3,074.00</p>
                   <p className="text-[#717171] font-poppins text-[10px]">Gastaste $300 menos que en Agosto</p>
                 </div>
               </div>

               <div className="space-y-2">
                 <div className="flex items-center justify-between p-5 bg-[#4B4B4B] rounded-2xl">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                       <span className="text-white font-poppins text-xs font-medium">MXN</span>
                     </div>
                     <span className="text-white font-poppins">2,835.00</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                       <path d="M7.61783 0H2.26752C2.05096 0 1.88535 0.165177 1.88535 0.381177C1.88535 0.597177 2.05096 0.762354 2.26752 0.762354H6.72611L0.11465 7.35671C-0.0382166 7.50918 -0.0382166 7.7506 0.11465 7.89036C0.267516 8.03012 0.509554 8.04283 0.649682 7.89036L7.23567 1.33412V5.71765C7.23567 5.93365 7.40127 6.09883 7.61783 6.09883C7.8344 6.09883 8 5.93365 8 5.71765V0.381177C8 0.165177 7.8344 0 7.61783 0Z" fill="#4CD964" />
                     </svg>
                     <span className="text-[#8A8A8F] font-poppins text-[10px]">Depósito en cuenta</span>
                   </div>
                 </div>

                 <div className="flex items-center justify-between p-5 bg-[#4B4B4B] rounded-2xl">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 flex items-center justify-center">
                       <span className="text-white font-poppins text-xs font-medium">EUR</span>
                     </div>
                     <span className="text-white font-poppins">1,743.00</span>
                   </div>
                   <span className="text-[#8A8A8F] font-poppins text-xs">0.3%</span>
                 </div>
               </div>
             </div>
           </div>
         </motion.div>

         <div className="space-y-6">
           <FeatureCard
             icon={<img src="https://api.builder.io/api/v1/image/assets/TEMP/b5e20cc14990708f46dc8a1285e000b6c901ea9f?width=176" alt="Smart Dashboard" className="w-[88px] h-[80px]" />}
             title="SMART DASHBOARD"
             description="Visualiza todo en un solo lugar: desde tus ingresos hasta tus objetivos. Un panel personalizado que se adapta a ti, no al revés."
             custom={3}
             variants={cardVariants}
             controls={controls}
           />
           <FeatureCard
             icon={<img src="https://api.builder.io/api/v1/image/assets/TEMP/43cd41243630d7ff19bd695cc691073852d83847?width=210" alt="AI Copilot" className="w-[105px] h-[92px]" />}
             title="COPILOT FINANCIERO IA"
             description="Ardana te guía en lenguaje real, transformando datos complejos en pasos claros y accionables."
             custom={4}
             variants={cardVariants}
             controls={controls}
           />
         </div>
       </div>
     </div>
   </section>
 );
}

function FeatureCard({ icon, title, description, custom, variants, controls }: any) {
 return (
   <motion.div className="bg-[#8A0000] rounded-[40px] p-9 h-[295px] flex flex-col" custom={custom} variants={variants} initial="hidden" animate={controls}>
     <div className="mb-6">{icon}</div>
     <h3 className="text-white font-sans text-lg font-bold tracking-[0.9px] uppercase leading-[26px] mb-3">{title}</h3>
     <p className="text-white font-sans text-base leading-[26px]">{description}</p>
   </motion.div>
 );
}

function ActionButton({ color, children }: { color: string; children: React.ReactNode }) {
 return (
   <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
     {children}
   </div>
 );
}

function BusinessSection() {
 return (
   <section className="relative w-full bg-[#8A0000] px-6 md:px-32 py-24 overflow-hidden">
     <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
       <div>
         <h2 className="text-white font-sans text-3xl md:text-[42px] font-bold leading-tight md:leading-[55px] mb-6">
           Tu empresa puede expandir sus finanzas de formas infinitas
         </h2>
         <p className="text-white font-sans text-lg leading-8 mb-10">
           Gestiona tus recursos con inteligencia.
           <br />
           Con Ardana, transforma datos en estrategias claras para escalar con seguridad.
         </p>
         <button className="bg-white text-[#5B0202] font-sans font-bold text-base tracking-[1.6px] uppercase px-8 py-6 rounded-[80px] hover:bg-gray-100 transition-colors">
           Simulador para empresas
         </button>
       </div>

       <div className="flex justify-center lg:justify-end">
         <img
           src="https://api.builder.io/api/v1/image/assets/TEMP/9287c65e383ebb070c6019fd1417214f052e53d1?width=854"
           alt="Financial Dashboard"
           className="w-full max-w-[427px] rotate-[-4deg]"
         />
       </div>
     </div>
   </section>
 );
}

function ChatSection() {
 return (
   <section className="w-full bg-white px-6 md:px-32 py-24">
     <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
       <div className="flex justify-center">
         <div className="w-[371px] h-[374px] rounded-full bg-[#292929] flex items-center justify-center">
           <p className="text-white text-center font-sans text-[42px] font-bold leading-[55px] max-w-[283px]">Logo/Ilustración de Ardana AQUÍ</p>
         </div>
       </div>

       <div>
         <h2 className="text-[#8A0000] font-sans text-3xl md:text-[42px] font-bold leading-tight md:leading-[55px] mb-6">Ahora puedes hablar con Ardana</h2>
         <p className="text-[#8A0000] font-sans text-lg leading-8 mb-8">
           Tu asesor financiero con IA que te dice las cosas como son. Analiza tus hábitos, te da consejos reales y te motiva a lograr tus metas.
         </p>

         <div className="space-y-4">
           <IconRow
             icon={
               <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                 <path opacity="0.4" d="M22.8492 0H8.34839C3.06406 0 0.0700684 2.99399 0.0700684 8.27832V22.7654C0.0700684 28.0497 3.06406 31.0437 8.34839 31.0437H22.8492C28.1336 31.0437 31.1138 28.0497 31.1138 22.7654V8.27832C31.1138 2.99399 28.1336 0 22.8492 0Z" fill="white" />
                 <path d="M24.9976 14.8948V20.5382H19.3542" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                 <path d="M24.9976 20.5381L18.3601 13.9006C18.2436 13.7841 18.1054 13.6916 17.9532 13.6285C17.801 13.5655 17.6378 13.533 17.4731 13.533C17.3083 13.533 17.1452 13.5655 16.993 13.6285C16.8407 13.6916 16.7025 13.7841 16.586 13.9006L13.9708 16.5158C13.8543 16.6323 13.7161 16.7248 13.5639 16.7878C13.4117 16.8509 13.2485 16.8834 13.0838 16.8834C12.919 16.8834 12.7559 16.8509 12.6037 16.7878C12.4514 16.7248 12.3132 16.6323 12.1967 16.5158L6.18628 10.5054" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
               </svg>
             }
             text="¿Para qué pagar más si puedes invertir mejor?"
           />
           <IconRow
             icon={
               <svg width="36" height="37" viewBox="0 0 36 37" fill="none">
                 <path d="M17.5917 36.1133C27.3073 36.1133 35.1834 28.2373 35.1834 18.5216C35.1834 8.806 27.3073 0.929932 17.5917 0.929932C7.87607 0.929932 0 8.806 0 18.5216C0 28.2373 7.87607 36.1133 17.5917 36.1133Z" fill="white" fillOpacity="0.4" />
                 <path d="M21.0349 7.65798C21.0349 7.21253 20.4963 6.98945 20.1814 7.30443L8.71114 18.7747C8.59071 18.8953 8.50871 19.0488 8.47551 19.216C8.4423 19.3831 8.45938 19.5564 8.52457 19.7138C8.58977 19.8713 8.70016 20.0059 8.84181 20.1006C8.98346 20.1954 9.15001 20.246 9.32043 20.2462H13.6488C13.9249 20.2462 14.1488 20.4701 14.1488 20.7462V29.3856C14.1488 29.831 14.6873 30.0541 15.0023 29.7391L26.4726 18.2689C26.593 18.1483 26.675 17.9947 26.7082 17.8276C26.7414 17.6604 26.7243 17.4872 26.6591 17.3297C26.5939 17.1723 26.4835 17.0377 26.3419 16.9429C26.2002 16.8482 26.0337 16.7975 25.8633 16.7974H21.5349C21.2588 16.7974 21.0349 16.5735 21.0349 16.2974V7.65798Z" fill="white" />
               </svg>
             }
             text="Seguro, fluido y al instante."
           />
           <IconRow
             icon={
               <svg width="25" height="33" viewBox="0 0 25 33" fill="none">
                 <path d="M6.70874 12.5681V8.3489C6.70874 6.78233 7.32858 5.27992 8.4319 4.17219C9.53522 3.06446 11.0316 2.44214 12.592 2.44214C14.1523 2.44214 15.6487 3.06446 16.752 4.17219C17.8554 5.27992 18.4752 6.78233 18.4752 8.3489V12.5681" stroke="white" strokeOpacity="0.4" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                 <path d="M20.758 11.2656H4.42578C2.21664 11.2656 0.425781 13.0565 0.425781 15.2656V28.6012C0.425781 30.8104 2.21664 32.6012 4.42578 32.6012H20.758C22.9671 32.6012 24.758 30.8104 24.758 28.6012V15.2656C24.758 13.0565 22.9671 11.2656 20.758 11.2656Z" fill="white" />
               </svg>
             }
             text="La confianza no se promete, se protege."
           />
         </div>
       </div>
     </div>
   </section>
 );
}

function IconRow({ icon, text }: { icon: React.ReactNode; text: string }) {
 return (
   <div className="flex items-center gap-4">
     <div className="bg-[#5B0202] rounded-[13px] p-2 flex-shrink-0">{icon}</div>
     <p className="text-[#8A0000] font-sans text-lg leading-8">{text}</p>
   </div>
 );
}

function FooterLocal() {
 return (
   <footer className="w-full bg-[#8A0000] px-6 md:px-36 py-14">
     <div className="max-w-[1500px] mx-auto">
       <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24">
         <div className="flex items-center gap-4">
           <svg width="51" height="30" viewBox="0 0 51 30" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M35.0766 21.3392C34.9777 21.0758 26.2085 3.75414 26.0766 3.4907C25.6151 2.37105 24.7909 1.41605 23.703 0.757437C20.9667 -0.823244 17.4722 0.0988199 15.8898 2.83208C14.8019 4.70914 14.8678 6.9155 15.9228 8.66084C16.0217 8.89136 24.3953 25.4885 24.5601 25.7519C24.659 26.0154 24.7909 26.2459 24.9228 26.5094C25.3843 27.629 26.2085 28.584 27.2964 29.2426C30.0327 30.8233 33.5272 29.9342 35.1096 27.2009C36.2305 25.3238 36.1316 23.0846 35.0766 21.3392Z" fill="white" fillOpacity="0.4" />
             <path d="M24.956 9.61581C25.9121 8.59495 26.5055 7.21185 26.5055 5.69704C26.5055 2.56861 23.967 0 20.8022 0C18.8571 0 17.1429 0.954995 16.1209 2.43688C15.9231 2.63447 1.71429 20.1537 1.54945 20.3842C0.593407 21.405 0 22.7881 0 24.303C0 27.4643 2.57143 30 5.7033 30C7.64835 30 9.36264 29.045 10.3846 27.5631C10.5824 27.3326 24.8242 9.84632 24.956 9.61581Z" fill="white" />
             <path d="M49.4502 9.61581C50.4062 8.59495 50.9996 7.21185 50.9996 5.69704C50.9996 2.53567 48.4282 0 45.2963 0C43.3513 0 41.637 0.954995 40.615 2.43688C40.4172 2.63447 26.1755 20.1537 26.0106 20.3842C25.0546 21.405 24.4612 22.7881 24.4612 24.303C24.4612 27.4643 27.0326 30 30.1645 30C32.1095 30 33.8238 29.045 34.8458 27.5631C35.0766 27.3326 49.2854 9.84632 49.4502 9.61581Z" fill="white" />
           </svg>
           <span className="text-white text-lg font-sans">FinanceFlow</span>
         </div>

         <div className="flex items-center gap-3">
           <a href="#" className="w-9 h-9 rounded-full bg-white/50 flex items-center justify-center hover:bg-white/70 transition-colors">
             <svg width="20" height="20" viewBox="0 0 36 36" fill="none">
               <path d="M18.0223 12.8438C15.1652 12.8438 12.8884 15.1652 12.8884 17.9777C12.8884 20.8348 15.1652 23.1116 18.0223 23.1116C20.8348 23.1116 23.1563 20.8348 23.1563 17.9777C23.1563 15.1652 20.8348 12.8438 18.0223 12.8438ZM18.0223 21.3259C16.192 21.3259 14.6741 19.8527 14.6741 17.9777C14.6741 16.1473 16.1473 14.6741 18.0223 14.6741C19.8527 14.6741 21.3259 16.1473 21.3259 17.9777C21.3259 19.8527 19.8527 21.3259 18.0223 21.3259ZM24.5402 12.6652C24.5402 11.9955 24.0045 11.4598 23.3348 11.4598C22.6652 11.4598 22.1295 11.9955 22.1295 12.6652C22.1295 13.3348 22.6652 13.8705 23.3348 13.8705C24.0045 13.8705 24.5402 13.3348 24.5402 12.6652ZM27.933 13.8705C27.8438 12.2634 27.4866 10.8348 26.3259 9.67411C25.1652 8.51339 23.7366 8.15625 22.1295 8.06696C20.4777 7.97768 15.5223 7.97768 13.8705 8.06696C12.2634 8.15625 10.8795 8.51339 9.67411 9.67411C8.51339 10.8348 8.15625 12.2634 8.06696 13.8705C7.97768 15.5223 7.97768 20.4777 8.06696 22.1295C8.15625 23.7366 8.51339 25.1205 9.67411 26.3259C10.8795 27.4866 12.2634 27.8438 13.8705 27.933C15.5223 28.0223 20.4777 28.0223 22.1295 27.933C23.7366 27.8438 25.1652 27.4866 26.3259 26.3259C27.4866 25.1205 27.8438 23.7366 27.933 22.1295C28.0223 20.4777 28.0223 15.5223 27.933 13.8705Z" fill="white" />
             </svg>
           </a>
           <a href="#" className="w-9 h-9 rounded-full bg-white/50 flex items-center justify-center hover:bg-white/70 transition-colors">
             <svg width="20" height="20" viewBox="0 0 36 36" fill="none">
               <path d="M25.8571 8H10.1429C8.9375 8 8 8.98214 8 10.1429V25.8571C8 27.0625 8.9375 28 10.1429 28H16.2589V21.2143H13.4464V18H16.2589V15.5893C16.2589 12.8214 17.9107 11.2589 20.4107 11.2589C21.6607 11.2589 22.9107 11.4821 22.9107 11.4821V14.2054H21.5268C20.1429 14.2054 19.6964 15.0536 19.6964 15.9464V18H22.7768L22.2857 21.2143H19.6964V28H25.8571C27.0179 28 28 27.0625 28 25.8571V10.1429C28 8.98214 27.0179 8 25.8571 8Z" fill="white" />
             </svg>
           </a>
           <a href="#" className="w-9 h-9 rounded-full bg-white/50 flex items-center justify-center hover:bg-white/70 transition-colors">
             <svg width="20" height="20" viewBox="0 0 36 36" fill="none">
               <path d="M12.4743 28V14.6219H8.3132V28H12.4743ZM10.3714 12.8322C11.7136 12.8322 12.7875 11.7136 12.7875 10.3714C12.7875 9.07383 11.7136 8 10.3714 8C9.07383 8 8 9.07383 8 10.3714C8 11.7136 9.07383 12.8322 10.3714 12.8322ZM28.0447 28V20.6622C28.0447 17.0828 27.2394 14.3087 23.0336 14.3087C21.0201 14.3087 19.6779 15.4273 19.0962 16.4564H19.0515V14.6219H15.0694V28H19.2304V21.3781C19.2304 19.6331 19.5436 17.9776 21.6913 17.9776C23.8389 17.9776 23.8837 19.9463 23.8837 21.5123V28H28.0447Z" fill="white" />
             </svg>
           </a>
         </div>
       </div>

       <div className="mb-16">
         <div className="mb-8 pb-8 border-b border-white max-w-[280px]">
           <h3 className="text-white text-lg font-sans font-bold tracking-[0.9px] uppercase">Menu</h3>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl">
           <div className="space-y-4">
             <a href="#" className="block text-white text-sm font-sans font-bold tracking-[1.4px] uppercase">
               INICIO
             </a>
             <a href="#" className="block text-white text-sm font-sans tracking-[1.4px] uppercase">
               SIMULADOR
             </a>
           </div>
           <div className="space-y-4">
             <a href="#" className="block text-white text-sm font-sans tracking-[1.4px] uppercase">
               TABLERO INTELIGENTE
             </a>
             <a href="#" className="block text-white text-sm font-sans tracking-[1.4px] uppercase">
               INICIAR SESIÓN
             </a>
           </div>
         </div>
       </div>
     </div>
   </footer>
 );
}