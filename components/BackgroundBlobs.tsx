export default function BackgroundBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600 opacity-20 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-pink-600 opacity-20 blur-3xl animate-blob [animation-delay:2s]" />
      <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-orange-500 opacity-15 blur-3xl animate-blob [animation-delay:4s]" />
      <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 opacity-10 blur-3xl animate-blob [animation-delay:6s]" />
    </div>
  );
}
