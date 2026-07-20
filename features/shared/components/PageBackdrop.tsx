export default function PageBackdrop() {
  return (
    <>
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-900/30 to-indigo-900/20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-900/10 blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-[30%] left-2/3 -translate-x-3/6 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-900/30 to-indigo-900/20 blur-[120px] pointer-events-none z-0" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
}
