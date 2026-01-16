import Desk from "../components/Desk";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const nav = useNavigate();

  return (
    <div className="mx-auto max-w-7xl px-10 pb-10">
      {/* this makes desk fill remaining viewport below navbar */}
      <div className="h-[calc(100vh-96px)] min-h-[640px]">
        <Desk
          onGoWork={() => nav("/work")}
          // onGoPlay={() => nav("/play")}
          onGoAbout={() => nav("/about")}
          onGoContact={() => nav("/contact")}
        />
      </div>
    </div>
  );
}
