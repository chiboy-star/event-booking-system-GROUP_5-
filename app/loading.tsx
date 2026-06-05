// app/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f9fb]">
      <div className="w-12 h-12 border-4 border-[#e2dfff] border-t-[#3525cd] rounded-full animate-spin"></div>
      <p className="mt-4 text-[#464555] font-semibold animate-pulse">Loading Pulse...</p>
    </div>
  );
}