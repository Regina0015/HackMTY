import React from "react";

export default function VeneraDashboard() {
 return (
   <div className="min-h-screen bg-white">
     {/* Header */}
     <header className="w-full px-6 md:px-28 py-8">
       <nav className="flex items-center justify-between max-w-[1500px] mx-auto">
         <div className="flex items-center gap-8">
           <div className="flex items-center">
             <span className="text-[#8A0000] text-xl font-medium">Venera</span>
           </div>
           <div className="hidden md:block w-px h-16 bg-[#500101]" />
           <div className="hidden lg:flex items-start gap-7 py-2">
             <a href="#" className="text-[#8A0000] text-sm font-medium tracking-[1.4px] uppercase underline">
               INICIO
             </a>
             <a href="#" className="text-[#8A0000] text-sm font-medium tracking-[1.4px] uppercase">
               TABLERO INTELIGENTE
             </a>
             <a href="#" className="text-[#8A0000] text-sm font-medium tracking-[1.4px] uppercase">
               SIMULADOR
             </a>
             <a href="#" className="text-[#8A0000] text-sm font-medium tracking-[1.4px] uppercase">
               INICIAR SESIÓN
             </a>
           </div>
         </div>
         <div className="hidden xl:flex items-center gap-4">
           <span className="text-[#8A0000] text-lg font-bold text-right">Un producto de</span>
           <img
             src="https://api.builder.io/api/v1/image/assets/TEMP/97c8b4dd8a14fc8302f343d9d0bb53f5ec446f47?width=538"
             alt="Banorte"
             className="h-8 w-auto"
           />
         </div>
       </nav>
     </header>

     {/* Hero */}
     <section className="w-full bg-[#8A0000] px-6 md:px-32 py-24 md:py-32">
       <div className="max-w-[1500px] mx-auto">
         <h1 className="text-white text-3xl md:text-[42px] font-extrabold leading-tight">
           Tu dinero, tus metas, tu control
         </h1>
         <p className="text-white text-base font-semibold mt-4">todo en el mismo tablero</p>
       </div>
     </section>

     {/* Main */}
     <div className="relative -mt-16 px-4 md:px-6 max-w-[1500px] mx-auto">
       {/* Top stats + card */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
         <div className="lg:col-span-2">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
             {/* Stat */}
             <div className="flex gap-4 items-start">
               <div className="w-16 h-16 rounded-lg bg-[#8A0000] flex items-center justify-center">
                 <svg width="27" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M8.23828 17.5688L11.6416 12.9451L15.5237 16.1328L18.8542 11.6396" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                   <ellipse cx="22.7364" cy="4.99228" rx="2.18563" ry="2.28467" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                   <path d="M16.9703 3.70853H8.70653C5.28237 3.70853 3.15918 6.24342 3.15918 9.82273V19.4292C3.15918 23.0085 5.24074 25.5326 8.70653 25.5326H18.4898C21.914 25.5326 24.0372 23.0085 24.0372 19.4292V11.063" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
               </div>
               <div>
                 <p className="text-black text-xs opacity-60 mb-2">Total earnings</p>
                 <p className="text-black text-2xl font-semibold">$10,596.57</p>
               </div>
             </div>

             <div className="flex gap-4 items-start">
               <div className="w-16 h-16 rounded-lg bg-[#BE1D20] flex items-center justify-center">
                 <svg width="27" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M8.23828 17.5688L11.6416 12.9451L15.5237 16.1327L18.8542 11.6395" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                   <ellipse cx="22.7364" cy="4.99225" rx="2.18563" ry="2.28467" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                   <path d="M16.9703 3.7085H8.70653C5.28237 3.7085 3.15918 6.24339 3.15918 9.8227V19.4292C3.15918 23.0085 5.24074 25.5325 8.70653 25.5325H18.4898C21.914 25.5325 24.0372 23.0085 24.0372 19.4292V11.063" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
               </div>
               <div>
                 <p className="text-black text-xs opacity-60 mb-2">Total for all goals</p>
                 <p className="text-black text-2xl font-semibold">$5,596.10</p>
               </div>
             </div>

             <div className="flex gap-4 items-start">
               <div className="w-16 h-16 rounded-lg bg-[#8A0000] flex items-center justify-center">
                 <svg width="27" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M8.23828 17.5688L11.6416 12.9451L15.5237 16.1328L18.8542 11.6396" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                   <ellipse cx="22.7364" cy="4.99228" rx="2.18563" ry="2.28467" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                   <path d="M16.9703 3.70853H8.70653C5.28237 3.70853 3.15918 6.24342 3.15918 9.82273V19.4292C3.15918 23.0085 5.24074 25.5326 8.70653 25.5326H18.4898C21.914 25.5326 24.0372 23.0085 24.0372 19.4292V11.063" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
               </div>
               <div>
                 <p className="text-black text-xs opacity-60 mb-2">Expenses</p>
                 <p className="text-black text-2xl font-semibold">$4,166.80</p>
               </div>
             </div>

             <div className="flex gap-4 items-start">
               <div className="w-16 h-16 rounded-lg bg-[#BE1D20] flex items-center justify-center">
                 <svg width="27" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M8.23828 17.5688L11.6416 12.9451L15.5237 16.1327L18.8542 11.6395" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                   <ellipse cx="22.7364" cy="4.99225" rx="2.18563" ry="2.28467" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                   <path d="M16.9703 3.7085H8.70653C5.28237 3.7085 3.15918 6.24339 3.15918 9.8227V19.4292C3.15918 23.0085 5.24074 25.5325 8.70653 25.5325H18.4898C21.914 25.5325 24.0372 23.0085 24.0372 19.4292V11.063" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
               </div>
               <div>
                 <p className="text-black text-xs opacity-60 mb-2">Weekly Stats</p>
                 <p className="text-black text-2xl font-semibold">$1,257.12</p>
               </div>
             </div>
           </div>
         </div>

         {/* Card */}
         <div className="bg-[#8A0000] rounded-2xl p-6 relative overflow-hidden">
           <div className="absolute -right-16 -top-32 w-96 h-72 bg-[#A70101] rounded-full opacity-50" />
           <div className="relative z-10">
             <div className="flex items-start justify-between mb-4">
               <div>
                 <p className="text-white/70 text-xs mb-2">Name Card</p>
                 <p className="text-white text-sm">Mariana Diaz</p>
               </div>
               <svg width="67" height="22" viewBox="0 0 67 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M43.5392 0.0332031C38.7965 0.0332031 34.5582 2.45581 34.5582 6.93175C34.5582 12.0648 42.075 12.4194 42.075 14.9981C42.075 16.0838 40.8124 17.0558 38.6559 17.0558C35.5954 17.0558 33.308 15.6977 33.308 15.6977L32.3293 20.2144C32.3293 20.2144 34.9643 21.3616 38.4627 21.3616C43.648 21.3616 47.7282 18.82 47.7282 14.2676C47.7282 8.84356 40.1801 8.49956 40.1801 6.10608C40.1801 5.25553 41.2166 4.32358 43.3669 4.32358C45.7931 4.32358 47.7726 5.31129 47.7726 5.31129L48.7304 0.948894C48.7304 0.948894 46.5766 0.0332031 43.5392 0.0332031ZM0.148043 0.362441L0.0332031 1.02091C0.0332031 1.02091 2.02847 1.38079 3.82552 2.09865C6.13938 2.92183 6.30421 3.40104 6.6939 4.88945L10.9404 21.0221H16.6328L25.4023 0.362441H19.723L14.088 14.409L11.7886 2.50248C11.5777 1.13979 10.5096 0.362441 9.20211 0.362441H0.148043ZM27.6861 0.362441L23.2308 21.0221H28.6466L33.0862 0.362441H27.6861ZM57.8915 0.362441C56.5856 0.362441 55.8937 1.05148 55.3859 2.25555L47.4515 21.0221H53.1309L54.2297 17.8943H61.1488L61.8169 21.0221H66.8281L62.4564 0.362441H57.8915ZM58.6301 5.94404L60.3136 13.6965H55.8035L58.6301 5.94404Z" fill="white"/>
               </svg>
             </div>
             <p className="text-white text-base tracking-widest mb-8">****   ****   ****   1234</p>
             <div className="flex gap-8">
               <div>
                 <p className="text-white/70 text-xs mb-1">EXP DATE</p>
                 <p className="text-white text-xs">12/25</p>
               </div>
               <div>
                 <p className="text-white/70 text-xs mb-1">CVV NUMBER</p>
                 <p className="text-white text-xs">123</p>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Activity + Right panel */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Activity */}
         <div className="lg:col-span-2 bg-white rounded-3xl border-2 border-[#BE1D20] p-6 md:p-8">
           <h2 className="text-[#8A0000] text-base mb-6 uppercase tracking-wide">Activity Summary</h2>
           <div className="flex gap-8 text-sm opacity-40 mb-8">
             <span className="uppercase tracking-wide">Spending Summary</span>
             <span className="uppercase tracking-wide">Income Summary</span>
           </div>

           <div className="border-b border-[#8A0000] mb-6 pb-6">
             <div className="flex gap-8 mb-6">
               <button className="text-[#BE1D20] font-medium border-b-2 border-[#BE1D20] pb-2">History</button>
               <button className="text-black font-medium pb-2 opacity-60 hover:opacity-100">Upcoming</button>
             </div>
           </div>

           <div className="space-y-6">
             {/* Day 1 */}
             <div>
               <p className="text-[#A1A4AC] text-xs mb-4">13 Sep, 2020</p>
               <div className="flex items-center justify-between py-3 border-b border-gray-100">
                 <div className="flex items-center gap-4">
                   <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M0.834961 3.42764H12.0159M12.0159 3.42764L9.00567 0.404175M12.0159 3.42764L9.00567 6.07318" stroke="black" strokeWidth="1.14582"/>
                     <path d="M12.0176 10.2304H0.836604M0.836604 10.2304L3.84687 7.20691M0.836604 10.2304L3.84687 12.8759" stroke="black" strokeWidth="1.14582"/>
                   </svg>
                   <div>
                     <p className="font-bold text-sm">Transferencia a Regina</p>
                     <p className="text-xs text-[#A1A4AC]">10 Sep, 2020 at 3:30 PM</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2">
                     <div className="w-5 h-4 bg-black rounded flex items-center justify-center">
                       <div className="w-2 h-2 bg-[#BE1D20] rounded-full" />
                     </div>
                     <span className="text-xs opacity-60">Personal</span>
                   </div>
                   <div className="w-8 h-7 bg-black rounded flex items-center justify-center">
                     <svg width="8" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M8.28071 3.63871V9.33407C8.28071 9.59669 8.03949 9.80869 7.74066 9.80869C7.44184 9.80869 7.20062 9.59669 7.20062 9.33407V3.63871C7.20062 2.15475 5.8289 0.949228 4.14036 0.949228C2.45181 0.949228 1.08009 2.15475 1.08009 3.63871V10.9161C1.08009 11.8748 1.96937 12.6564 3.06026 12.6564C4.15116 12.6564 5.04043 11.8748 5.04043 10.9161V4.11332C5.04043 3.67668 4.6372 3.3223 4.14036 3.3223C3.64351 3.3223 3.24028 3.67668 3.24028 4.11332V10.2833C3.24028 10.5459 2.99906 10.7579 2.70023 10.7579C2.40141 10.7579 2.16019 10.5459 2.16019 10.2833V4.11332C2.16019 3.1546 3.04946 2.37307 4.14036 2.37307C5.23125 2.37307 6.12053 3.1546 6.12053 4.11332V10.9161C6.12053 12.4001 4.74881 13.6056 3.06026 13.6056C1.37172 13.6056 0 12.4001 0 10.9161V3.63871C0 1.63267 1.85776 9.53674e-07 4.14036 9.53674e-07C6.42295 9.53674e-07 8.28071 1.63267 8.28071 3.63871Z" fill="#A1A4AC"/>
                     </svg>
                   </div>
                   <span className="text-sm font-semibold">-$10,100.<span className="text-xs">00</span></span>
                 </div>
               </div>
             </div>

             {/* Day 2 */}
             <div>
               <p className="text-[#A1A4AC] text-xs mb-4">10 Sep, 2020</p>
               <div className="flex items-center justify-between py-3 border-b border-gray-100">
                 <div className="flex items-center gap-4">
                   <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M5.73369 12.2889H3.48731C3.06543 12.2889 2.72343 11.9469 2.72343 11.525V3.97434M2.72343 3.97434H1.33712C0.915242 3.97434 0.573242 3.63234 0.573242 3.21046V1.33682C0.573242 0.914937 0.915242 0.572937 1.33712 0.572937H15.2907C15.7126 0.572937 16.0546 0.914937 16.0546 1.33682V3.21046C16.0546 3.63234 15.7126 3.97434 15.2907 3.97434H13.9044M2.72343 3.97434H13.9044M13.9044 3.97434V11.525C13.9044 11.9469 13.5624 12.2889 13.1405 12.2889H11.3242M8.31392 12.6668V5.86401M8.31392 5.86401L5.73369 8.50955M8.31392 5.86401L10.8941 8.50955" stroke="black" strokeWidth="1.14582"/>
                   </svg>
                   <div>
                     <p className="font-bold text-sm">Inverción en Banorte</p>
                     <p className="text-xs text-[#A1A4AC]">10 Sep, 2020 at 3:30 PM</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2">
                     <div className="w-5 h-4 bg-black rounded flex items-center justify-center">
                       <div className="w-2 h-2 bg-[#1683C4] rounded-full" />
                     </div>
                     <span className="text-xs opacity-60">Investments</span>
                   </div>
                   <div className="w-8 h-7 bg-black rounded flex items-center justify-center">
                     <svg width="8" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M8.28071 3.63871V9.33407C8.28071 9.59669 8.03949 9.80869 7.74066 9.80869C7.44184 9.80869 7.20062 9.59669 7.20062 9.33407V3.63871C7.20062 2.15475 5.8289 0.949228 4.14036 0.949228C2.45181 0.949228 1.08009 2.15475 1.08009 3.63871V10.9161C1.08009 11.8748 1.96937 12.6564 3.06026 12.6564C4.15116 12.6564 5.04043 11.8748 5.04043 10.9161V4.11332C5.04043 3.67668 4.6372 3.3223 4.14036 3.3223C3.64351 3.3223 3.24028 3.67668 3.24028 4.11332V10.2833C3.24028 10.5459 2.99906 10.7579 2.70023 10.7579C2.40141 10.7579 2.16019 10.5459 2.16019 10.2833V4.11332C2.16019 3.1546 3.04946 2.37307 4.14036 2.37307C5.23125 2.37307 6.12053 3.1546 6.12053 4.11332V10.9161C6.12053 12.4001 4.74881 13.6056 3.06026 13.6056C1.37172 13.6056 0 12.4001 0 10.9161V3.63871C0 1.63267 1.85776 9.53674e-07 4.14036 9.53674e-07C6.42295 9.53674e-07 8.28071 1.63267 8.28071 3.63871Z" fill="#A1A4AC"/>
                     </svg>
                   </div>
                   <span className="text-sm font-semibold text-[#BE1D20]">+ $50,400.<span className="text-xs">00</span></span>
                 </div>
               </div>

               <div className="flex items-center justify-between py-3 border-b border-gray-100 mt-4">
                 <div className="flex items-center gap-4">
                   <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M5.73369 12.2888H3.48731C3.06543 12.2888 2.72343 11.9468 2.72343 11.5249V3.97428M2.72343 3.97428H1.33712C0.915242 3.97428 0.573242 3.63228 0.573242 3.2104V1.33675C0.573242 0.914876 0.915242 0.572876 1.33712 0.572876H15.2907C15.7126 0.572876 16.0546 0.914876 16.0546 1.33675V3.2104C16.0546 3.63228 15.7126 3.97428 15.2907 3.97428H13.9044M2.72343 3.97428H13.9044M13.9044 3.97428V11.5249C13.9044 11.9468 13.5624 12.2888 13.1405 12.2888H11.3242M8.31392 5.86395V12.6668M8.31392 12.6668L5.73369 10.0212M8.31392 12.6668L10.8941 10.0212" stroke="black" strokeWidth="1.14582"/>
                   </svg>
                   <div>
                     <p className="font-bold text-sm">Cash withdrawl</p>
                     <p className="text-xs text-[#A1A4AC]">10 Sep, 2020 at 3:30 PM</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2">
                     <div className="w-5 h-4 bg-black rounded flex items-center justify-center">
                       <div className="w-2 h-2 bg-[#6746ED] rounded-full" />
                     </div>
                     <span className="text-xs opacity-60">General</span>
                   </div>
                   <div className="w-8 h-7 bg-black rounded flex items-center justify-center">
                     <svg width="8" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M8.28071 3.63871V9.33407C8.28071 9.59669 8.03949 9.80869 7.74066 9.80869C7.44184 9.80869 7.20062 9.59669 7.20062 9.33407V3.63871C7.20062 2.15475 5.8289 0.949228 4.14036 0.949228C2.45181 0.949228 1.08009 2.15475 1.08009 3.63871V10.9161C1.08009 11.8748 1.96937 12.6564 3.06026 12.6564C4.15116 12.6564 5.04043 11.8748 5.04043 10.9161V4.11332C5.04043 3.67668 4.6372 3.3223 4.14036 3.3223C3.64351 3.3223 3.24028 3.67668 3.24028 4.11332V10.2833C3.24028 10.5459 2.99906 10.7579 2.70023 10.7579C2.40141 10.7579 2.16019 10.5459 2.16019 10.2833V4.11332C2.16019 3.1546 3.04946 2.37307 4.14036 2.37307C5.23125 2.37307 6.12053 3.1546 6.12053 4.11332V10.9161C6.12053 12.4001 4.74881 13.6056 3.06026 13.6056C1.37172 13.6056 0 12.4001 0 10.9161V3.63871C0 1.63267 1.85776 9.53674e-07 4.14036 9.53674e-07C6.42295 9.53674e-07 8.28071 1.63267 8.28071 3.63871Z" fill="#A1A4AC"/>
                     </svg>
                   </div>
                   <span className="text-sm font-semibold">-$20,905.<span className="text-xs">00</span></span>
                 </div>
               </div>

               <div className="flex items-center justify-between py-3 border-b border-gray-100 mt-4">
                 <div className="flex items-center gap-4">
                   <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M0.834961 3.42764H12.0159M12.0159 3.42764L9.00567 0.404175M12.0159 3.42764L9.00567 6.07318" stroke="black" strokeWidth="1.14582"/>
                     <path d="M12.0176 10.2304H0.836604M0.836604 10.2304L3.84687 7.20691M0.836604 10.2304L3.84687 12.8759" stroke="black" strokeWidth="1.14582"/>
                   </svg>
                   <div>
                     <p className="font-bold text-sm">Personal</p>
                     <p className="text-xs text-[#A1A4AC]">10 Sep, 2020 at 3:30 PM</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2">
                     <div className="w-5 h-4 bg-black rounded flex items-center justify-center">
                       <div className="w-2 h-2 bg-[#BE1D20] rounded-full" />
                     </div>
                     <span className="text-xs opacity-60">Personal</span>
                   </div>
                   <div className="w-8 h-7 bg-black rounded flex items-center justify-center">
                     <svg width="8" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M8.28071 3.63871V9.33407C8.28071 9.59669 8.03949 9.80869 7.74066 9.80869C7.44184 9.80869 7.20062 9.59669 7.20062 9.33407V3.63871C7.20062 2.15475 5.8289 0.949228 4.14036 0.949228C2.45181 0.949228 1.08009 2.15475 1.08009 3.63871V10.9161C1.08009 11.8748 1.96937 12.6564 3.06026 12.6564C4.15116 12.6564 5.04043 11.8748 5.04043 10.9161V4.11332C5.04043 3.67668 4.6372 3.3223 4.14036 3.3223C3.64351 3.3223 3.24028 3.67668 3.24028 4.11332V10.2833C3.24028 10.5459 2.99906 10.7579 2.70023 10.7579C2.40141 10.7579 2.16019 10.5459 2.16019 10.2833V4.11332C2.16019 3.1546 3.04946 2.37307 4.14036 2.37307C5.23125 2.37307 6.12053 3.1546 6.12053 4.11332V10.9161C6.12053 12.4001 4.74881 13.6056 3.06026 13.6056C1.37172 13.6056 0 12.4001 0 10.9161V3.63871C0 1.63267 1.85776 9.53674e-07 4.14036 9.53674e-07C6.42295 9.53674e-07 8.28071 1.63267 8.28071 3.63871Z" fill="#A1A4AC"/>
                     </svg>
                   </div>
                   <span className="text-sm font-semibold">-$10,100.<span className="text-xs">00</span></span>
                 </div>
               </div>
             </div>

             {/* Day 3 */}
             <div>
               <p className="text-[#A1A4AC] text-xs mb-4">11 Sep, 2020</p>
               <div className="flex items-center justify-between py-3">
                 <div className="flex items-center gap-4">
                   <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M0.573242 4.35221V9.24933C0.573242 10.0931 1.25724 10.7771 2.101 10.7771H13.6668C14.5105 10.7771 15.1945 10.0931 15.1945 9.24933V4.35221M0.573242 4.35221V2.10063C0.573242 1.25688 1.25724 0.572876 2.101 0.572876H13.6668C14.5105 0.572876 15.1945 1.25688 15.1945 2.10063V4.35221M0.573242 4.35221H15.1945M10.0341 8.13155H13.0443" stroke="black" strokeWidth="1.14582"/>
                   </svg>
                   <div>
                     <p className="font-bold text-sm">Ad Spends</p>
                     <p className="text-xs text-[#A1A4AC]">10 Sep, 2020 at 3:30 PM</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2">
                     <div className="w-5 h-4 bg-black rounded flex items-center justify-center">
                       <div className="w-2 h-2 bg-[#FE8E27] rounded-full" />
                     </div>
                     <span className="text-xs opacity-60">Work</span>
                   </div>
                   <div className="w-8 h-7 bg-black rounded flex items-center justify-center">
                     <svg width="8" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M8.28071 3.63871V9.33407C8.28071 9.59669 8.03949 9.80869 7.74066 9.80869C7.44184 9.80869 7.20062 9.59669 7.20062 9.33407V3.63871C7.20062 2.15475 5.8289 0.949228 4.14036 0.949228C2.45181 0.949228 1.08009 2.15475 1.08009 3.63871V10.9161C1.08009 11.8748 1.96937 12.6564 3.06026 12.6564C4.15116 12.6564 5.04043 11.8748 5.04043 10.9161V4.11332C5.04043 3.67668 4.6372 3.3223 4.14036 3.3223C3.64351 3.3223 3.24028 3.67668 3.24028 4.11332V10.2833C3.24028 10.5459 2.99906 10.7579 2.70023 10.7579C2.40141 10.7579 2.16019 10.5459 2.16019 10.2833V4.11332C2.16019 3.1546 3.04946 2.37307 4.14036 2.37307C5.23125 2.37307 6.12053 3.1546 6.12053 4.11332V10.9161C6.12053 12.4001 4.74881 13.6056 3.06026 13.6056C1.37172 13.6056 0 12.4001 0 10.9161V3.63871C0 1.63267 1.85776 9.53674e-07 4.14036 9.53674e-07C6.42295 9.53674e-07 8.28071 1.63267 8.28071 3.63871Z" fill="#A1A4AC"/>
                     </svg>
                   </div>
                   <span className="text-sm font-semibold">-$2,340.<span className="text-xs">00</span></span>
                 </div>
               </div>
             </div>
           </div>
         </div>

         {/* Right panel */}
         <div className="bg-[#8A0000] rounded-2xl p-6 text-white space-y-6">
           {/* Balance */}
           <div className="bg-[#292929] rounded-2xl p-5 relative">
             <div className="flex items-start justify-between mb-4">
               <div>
                 <p className="text-white text-sm font-bold mb-2">Balance Actual</p>
                 <p className="text-white text-3xl font-semibold">$34,010.00</p>
               </div>
               <div className="flex flex-col items-end gap-1">
                 <div className="w-6 h-6 border border-white/25 rounded-md flex items-center justify-center">
                   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M12.8337 12.8333H1.16699C0.927826 12.8333 0.729492 12.635 0.729492 12.3958C0.729492 12.1567 0.927826 11.9583 1.16699 11.9583H12.8337C13.0728 11.9583 13.2712 12.1567 13.2712 12.3958C13.2712 12.635 13.0728 12.8333 12.8337 12.8333Z" fill="white"/>
                     <path d="M5.6875 2.33334V12.8333H8.3125V2.33334C8.3125 1.69167 8.05 1.16667 7.2625 1.16667H6.7375C5.95 1.16667 5.6875 1.69167 5.6875 2.33334Z" fill="white"/>
                     <path d="M1.75 5.83334V12.8333H4.08333V5.83334C4.08333 5.19167 3.85 4.66667 3.15 4.66667H2.68333C1.98333 4.66667 1.75 5.19167 1.75 5.83334Z" fill="white"/>
                     <path d="M9.91699 8.74999V12.8333H12.2503V8.74999C12.2503 8.10833 12.017 7.58333 11.317 7.58333H10.8503C10.1503 7.58333 9.91699 8.10833 9.91699 8.74999Z" fill="white"/>
                   </svg>
                 </div>
                 <span className="text-xs">+2,5%</span>
               </div>
             </div>

             <div className="flex gap-3">
               <button className="flex-1 bg-white rounded-2xl py-3 px-4 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow">
                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M3.33301 14.1667V15.8334C3.33301 16.2754 3.5086 16.6993 3.82116 17.0119C4.13372 17.3244 4.55765 17.5 4.99967 17.5H14.9997C15.4417 17.5 15.8656 17.3244 16.1782 17.0119C16.4907 16.6993 16.6663 16.2754 16.6663 15.8334V14.1667" stroke="#10192D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   <path d="M5.83301 9.16669L9.99967 13.3334L14.1663 9.16669" stroke="#10192D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   <path d="M10 3.33334V13.3333" stroke="#10192D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
                 <span className="text-[#10192D] font-bold text-sm">Deposit</span>
               </button>
               <button className="flex-1 bg-white rounded-2xl py-3 px-4 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow">
                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M3.33301 5.83331V4.16665C3.33301 3.72462 3.5086 3.3007 3.82116 2.98813C4.13372 2.67557 4.55765 2.49998 4.99967 2.49998H14.9997C15.4417 2.49998 15.8656 2.67557 16.1782 2.98813C16.4907 3.3007 16.6663 3.72462 16.6663 4.16665V5.83331" stroke="#10192D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   <path d="M5.83301 10.8333L9.99967 6.66665L14.1663 10.8333" stroke="#10192D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   <path d="M10 16.6667V6.66666" stroke="#10192D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
                 <span className="text-[#10192D] font-bold text-sm">Withdraw</span>
               </button>
             </div>
           </div>

           <div className="text-center">
             <p className="text-[#A1A4AC] text-xl mb-8">Tu asistente financiero, siempre listo para ayudarte</p>
             <div className="w-64 h-64 mx-auto rounded-full bg-[#292929] mb-8" />
             <button className="w-full bg-white rounded-2xl py-3 px-4 flex items-center justify-between shadow-lg hover:shadow-xl transition-shadow">
               <span className="text-[#505050] font-bold text-sm">Preguntame lo que necesitas</span>
               <img
                 src="https://api.builder.io/api/v1/image/assets/TEMP/46b9cda9a63c38f66b78ce49e0d90e83d360bcd7?width=96"
                 alt="AI Assistant"
                 className="w-12 h-12 rounded-full"
               />
             </button>
           </div>

           {/* Live prices */}
           <div>
             <p className="text-white font-bold text-sm mb-4 text-center">Tasa de Valores</p>
             <div className="space-y-4">
               {/* Binance */}
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-[#00E4FF] flex items-center justify-center" />
                   <div>
                     <p className="text-white font-bold text-sm">Binance</p>
                     <p className="text-[#8E9BAE] text-xs">BNB</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-6">
                   <svg width="70" height="24" viewBox="0 0 72 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M1 25.0018C7.90141 21.5813 14.8028 7.04321 18.7465 7.04321C24.2676 7.04321 24.662 17.3054 28.6056 16.45C33.0375 15.1689 33.5352 8.75357 35.507 7.89839C37.4789 7.04321 39.4507 9.60859 41.4225 9.60859C43.9103 9.60859 47.338 0.20177 50.2958 1.0568C53.7309 2.04981 58.1831 19.0156 62.1268 19.0156C66.0704 19.0156 67.0563 9.60869 71 9.60859" stroke="#00E4FF" strokeWidth="2" strokeLinecap="round"/>
                   </svg>
                   <div className="text-right">
                     <p className="text-white font-semibold text-sm">$18,788</p>
                     <p className="text-[#22C36B] text-xs">+0,15%</p>
                   </div>
                 </div>
               </div>

               {/* Litecoin */}
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-white" />
                   <div>
                     <p className="text-white font-bold text-sm">Litecoin</p>
                     <p className="text-[#8E9BAE] text-xs">LTC</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-6">
                   <svg width="70" height="24" viewBox="0 0 72 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M1 25.0018C7.90141 21.5813 14.8028 7.04321 18.7465 7.04321C24.2676 7.04321 24.662 17.3054 28.6056 16.45C33.0375 15.1689 33.5352 8.75357 35.507 7.89839C37.4789 7.04321 39.4507 9.60859 41.4225 9.60859C43.9103 9.60859 47.338 0.20177 50.2958 1.0568C53.7309 2.04981 58.1831 19.0156 62.1268 19.0156C66.0704 19.0156 67.0563 9.60869 71 9.60859" stroke="#1683C4" strokeWidth="2" strokeLinecap="round"/>
                   </svg>
                   <div className="text-right">
                     <p className="text-white font-semibold text-sm">$11,657</p>
                     <p className="text-[#F65556] text-xs">-0,18%</p>
                   </div>
                 </div>
               </div>

               {/* Ethereum */}
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-[#2BEBC8]" />
                   <div>
                     <p className="text-white font-bold text-sm">Ethereum</p>
                     <p className="text-[#8E9BAE] text-xs">ETH</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-6">
                   <svg width="70" height="24" viewBox="0 0 72 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M1 11.362C7.22222 12.8704 11.9473 1.00001 16.037 1.00001C21.7626 1.00001 20.7621 13.9745 24.8519 15.1796C29.4479 16.9846 31.0741 2.75722 34.7037 3.18148C39.3704 3.72694 38.5 11.3665 41.963 12.8704C44.8826 14.1384 46.4327 21.3894 49.5 20.1848C53.0623 18.7858 57.0584 8.63516 61.1481 8.63516C65.2379 8.63516 66.9103 14.0888 71 14.0889" stroke="#2BEBC8" strokeWidth="2" strokeLinecap="round"/>
                   </svg>
                   <div className="text-right">
                     <p className="text-white font-semibold text-sm">$21,543</p>
                     <p className="text-[#22C36B] text-xs">+1,56%</p>
                   </div>
                 </div>
               </div>

               {/* Bitcoin */}
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-[#FC6B21]" />
                   <div>
                     <p className="text-white font-bold text-sm">Bitcoin</p>
                     <p className="text-[#8E9BAE] text-xs">BTC</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-6">
                   <svg width="70" height="19" viewBox="0 0 72 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M1 6.72002C7.22222 5.21158 11.9473 17.082 16.037 17.082C21.7626 17.082 20.9103 7.92507 25 6.72002C29.596 4.91502 31.0741 15.3248 34.7037 14.9005C39.3704 14.3551 40.9971 1.47317 43 1.03981C46.1111 0.366676 46.9327 8.76374 50 9.96835C53.5623 11.3674 55.9103 17.082 60 17.082C64.0897 17.082 66.9103 3.99323 71 3.99309" stroke="#FC6B21" strokeWidth="2" strokeLinecap="round"/>
                   </svg>
                   <div className="text-right">
                     <p className="text-white font-semibold text-sm">$20,788</p>
                     <p className="text-[#22C36B] text-xs">+0,25%</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>      

     {/* Footer */}
     <footer className="w-full bg-[#8A0000] px-6 md:px-36 py-14 mt-16">
       <div className="max-w-[1500px] mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
           <div className="flex gap-3">
             <div className="w-9 h-9 rounded-full bg-white/50" />
             <div className="w-9 h-9 rounded-full bg-white/50" />
             <div className="w-9 h-9 rounded-full bg-white/50" />
           </div>
         </div>

         <div className="flex flex-col md:flex-row gap-12 mb-16">
           <div className="flex-1">
             <div className="mb-8 pb-8 border-b border-white">
               <h3 className="text-white text-lg font-bold tracking-[0.9px] uppercase">Menu</h3>
             </div>
             <div className="flex gap-12">
               <div className="flex flex-col gap-4">
                 <a href="#" className="text-white text-sm font-bold tracking-[1.4px] uppercase">Home</a>
                 <a href="#" className="text-white text-sm tracking-[1.4px] uppercase">About</a>
                 <a href="#" className="text-white text-sm tracking-[1.4px] uppercase">Pricing</a>
               </div>
               <div className="flex flex-col gap-4">
                 <a href="#" className="text-white text-sm tracking-[1.4px] uppercase">Tokens</a>
                 <a href="#" className="text-white text-sm tracking-[1.4px] uppercase">Blog</a>
                 <a href="#" className="text-white text-sm tracking-[1.4px] uppercase">Contact Us</a>
               </div>
             </div>
           </div>
         </div>

         <div className="h-px bg-white/30 mb-8" />
         <p className="text-white text-center">All rights reserved</p>

         <div className="flex items-center gap-4 mt-12">
           <img
             src="https://api.builder.io/api/v1/image/assets/TEMP/40cf25a6a61619af4ee35e39dd73f006ab3c14f2?width=46"
             alt="V"
             className="w-6 h-6"
           />
           <span className="text-white text-xl">enera</span>
         </div>
       </div>
     </footer>
   </div>
 );
}