type Props = { children: React.ReactNode };

export default function Wallpaper({ children }: Props) {
  const bgUrl = `${import.meta.env.BASE_URL}bg-grid.jpg`;

  return (
    <div className="relative min-h-screen w-full">
      {/* Full-screen wallpaper */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -20,
          backgroundImage: `url(${bgUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Soft wash */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -10,
          background: "rgba(255,255,255,0.22)",
        }}
      />

      <div className="relative">{children}</div>
    </div>
  );
}
