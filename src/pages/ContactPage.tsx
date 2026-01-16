// export default function ContactPage() {
//   return (
//     <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10">
//       {/* Header */}
//       <div className="mb-8">
      
//         <h1 className="mt-2 text-4xl font-bold tracking-tight text-black md:text-5xl">
//           Let’s talk
//         </h1>
//         <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-black/70">
//           If something here feels interesting or familiar, feel free to reach
//           out. I’m always happy to chat.
//         </p>
//       </div>

//       {/* Main card */}
//       <section className="rounded-[32px] border border-black/10 bg-white/60 backdrop-blur-md shadow-[0_30px_100px_rgba(0,0,0,0.10)]">
//         <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
//           {/* Left */}
//           <div>
//             <div className="text-sm font-semibold text-black">Reach me at</div>

//             <div className="mt-4 space-y-4">
//               <a
//                 href="mailto:rajveedkadchha@gmail.com"
//                 className="flex items-center justify-between rounded-[18px] border border-black/10 bg-white/55 px-5 py-4 text-sm text-black/80 hover:bg-white/80"
//               >
//                 <span>Email</span>
//                 <span className="font-medium">rajveedkadchha@gmail.com</span>
//               </a>

//               <a
//                 href="https://www.linkedin.com/in/rajveekadchha/"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="flex items-center justify-between rounded-[18px] border border-black/10 bg-white/55 px-5 py-4 text-sm text-black/80 hover:bg-white/80"
//               >
//                 <span>LinkedIn</span>
//                 <span className="font-medium">/rajveekadchha</span>
//               </a>

//               <a
//                 href="https://github.com/rajveekadchha"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="flex items-center justify-between rounded-[18px] border border-black/10 bg-white/55 px-5 py-4 text-sm text-black/80 hover:bg-white/80"
//               >
//                 <span>GitHub</span>
//                 <span className="font-medium">@rajveekadchha</span>
//               </a>

//               <a
//                 href="https://www.instagram.com/chaotic_yet_exotic/"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="flex items-center justify-between rounded-[18px] border border-black/10 bg-white/55 px-5 py-4 text-sm text-black/80 hover:bg-white/80"
//               >
//                 <span>Instagram</span>
//                 <span className="font-medium">@chaotic_yet_exotic</span>
//               </a>
//             </div>
//           </div>

//           {/* Right */}

//           <div className="flex flex-col gap-6">
//             {/* Photo / sticker card */}
//             <div className="rounded-[28px] border border-black/10 bg-white/55 p-6">
//               <div className="text-lg">💌</div>
//               <div className="mt-2 text-sm font-semibold text-black">
//                 Open to conversations
//               </div>
//               <div className="mt-1 text-sm text-black/70">
//                 Work, frontend, coffee, or just saying hi.
//               </div>
//             </div>

//             {/* Note card */}
//             <div className="rounded-[24px] border border-black/10 bg-white/55 p-6">
//               <div className="text-sm font-semibold text-black">
//                 A small note
//               </div>
//               <p className="mt-2 text-sm leading-relaxed text-black/70">
//                 I’m now exploring new frontend opportunities where I can bring
//                 in my experience, continue learning, and grow with a great team.
//                 If something sounds like a good fit, let’s connect!
//               </p>
//             </div>

//             {/* Micro copy */}
//           </div>

//           <div className="text-xs  text-black/50">
//             I usually reply within a day or two ☕
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-black md:text-5xl">
          Let’s talk
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-black/70">
          If something here feels interesting or familiar, feel free to reach
          out. I’m always happy to chat.
        </p>
      </div>

      {/* Main card */}
      <section className="rounded-[32px] border border-black/10 bg-white/60 backdrop-blur-md shadow-[0_30px_100px_rgba(0,0,0,0.10)]">
        <div className="grid items-stretch gap-8 p-6 md:grid-cols-2 md:p-10">
          {/* LEFT */}
          <div className="flex h-full flex-col">
            <div className="text-sm font-semibold text-black">Reach me at</div>

            <div className="mt-4 flex flex-1 flex-col gap-4">
              <a
                href="mailto:rajveedkadchha@gmail.com"
                className="flex items-center justify-between rounded-[18px] border border-black/10 bg-white/55 px-5 py-4 text-sm text-black/80 hover:bg-white/80"
              >
                <span>Email</span>
                <span className="font-medium">rajveedkadchha@gmail.com</span>
              </a>

              <a
                href="https://www.linkedin.com/in/rajveekadchha/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-[18px] border border-black/10 bg-white/55 px-5 py-4 text-sm text-black/80 hover:bg-white/80"
              >
                <span>LinkedIn</span>
                <span className="font-medium">/rajveekadchha</span>
              </a>

              <a
                href="https://github.com/rajveekadchha"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-[18px] border border-black/10 bg-white/55 px-5 py-4 text-sm text-black/80 hover:bg-white/80"
              >
                <span>GitHub</span>
                <span className="font-medium">@rajveekadchha</span>
              </a>

              <a
                href="https://www.instagram.com/chaotic_yet_exotic/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-[18px] border border-black/10 bg-white/55 px-5 py-4 text-sm text-black/80 hover:bg-white/80"
              >
                <span>Instagram</span>
                <span className="font-medium">@chaotic_yet_exotic</span>
              </a>

              {/* Resume download */}
             <a
  href="/Rajvee_Resume.pdf"
  download
  className="
    mt-3 inline-flex items-center justify-center gap-2
    rounded-full
    border border-black/10
    bg-white/70
    px-5 py-3
    text-sm font-semibold text-black/80
    backdrop-blur
    transition
    hover:bg-white
    hover:border-black/20
  "
>
  📄 Download resume
</a>

            </div>
          </div>

          {/* RIGHT */}
          <div className="flex h-full flex-col gap-6">
            {/* Conversation card */}
            <div className="rounded-[28px] border border-black/10 bg-white/55 p-6">
              <div className="text-lg">💌</div>
              <div className="mt-2 text-sm font-semibold text-black">
                Open to conversations
              </div>
              <div className="mt-1 text-sm text-black/70">
                Work, frontend, coffee, or just saying hi.
              </div>
            </div>

            {/* Note card */}
            <div className="flex-1 rounded-[24px] border border-black/10 bg-white/55 p-6">
              <div className="text-sm font-semibold text-black">
                A small note
              </div>
              <p className="mt-2 text-sm leading-relaxed text-black/70">
                I’m now exploring new frontend opportunities where I can bring
                in my experience, continue learning, and grow with a great team.
                If something sounds like a good fit, let’s connect.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/60">
                ☕ I usually reply within a day or two
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
