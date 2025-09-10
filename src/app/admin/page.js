import Image from "next/image";

export default function Home() {
  return (
    <main className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hacker.jpg"
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
         🎉 Welcome,🎉
        </h1>
        <p className="text-base md:text-xl text-gray-200 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg inline-block">
         ✨🎆🪔 SMT TRADERS ADMIN! 🪔🎆✨
        </p>
      </div>
    </main>
  );
}
