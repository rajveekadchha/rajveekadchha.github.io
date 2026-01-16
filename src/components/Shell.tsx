import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopNav from "./TopNav";
import Wallpaper from "./Wallpaper";

export default function Shell() {

  const { pathname } = useLocation();

    useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Wallpaper>
      {/* <ScrollRestoration /> */}
      <div className="min-h-screen flex flex-col">
        <TopNav />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </Wallpaper>
  );
}
