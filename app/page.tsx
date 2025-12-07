import Home from "./src/home/page";
import { SpeedInsights } from "@vercel/speed-insights/next"
export default function DefaultPage() {
  return (
    <div className="bg-red-100 w-full min-h-screen">
      <div>
        <Home />
        <SpeedInsights />
      </div>
    </div>
  );
}
