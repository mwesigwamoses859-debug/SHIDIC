import { useState, useEffect } from "react";
import { Globe, Loader2 } from "lucide-react";
import { Reveal } from "./Reveal";

export function LocalTrafficUpdates() {
  const [updates, setUpdates] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUpdates() {
      try {
        const response = await fetch("/api/gemini/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: "What is the latest traffic or transportation news in Kampala, Uganda today? Summarize it in 2 short bullet points."
          })
        });
        const data = await response.json();
        setUpdates(data.text);
      } catch (error) {
        console.error("Failed to fetch traffic updates", error);
        setUpdates("Unable to load latest traffic updates at this moment.");
      } finally {
        setLoading(false);
      }
    }
    fetchUpdates();
  }, []);

  return (
    <div className="bg-black text-white p-6 rounded-3xl shadow-xl relative overflow-hidden border border-zinc-800">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC700]/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
      <h3 className="text-lg font-black tracking-wide flex items-center gap-2 mb-4 text-[#FFC700]">
        <Globe size={18} /> Live Kampala Traffic & News
      </h3>
      {loading ? (
        <div className="flex items-center gap-2 text-zinc-400 font-medium text-sm">
          <Loader2 size={16} className="animate-spin" /> Gathering real-time local updates...
        </div>
      ) : (
        <div className="text-sm text-zinc-300 font-medium leading-relaxed prose prose-invert max-w-none">
          {/* Render simple markdown bullets if generated */}
          {updates?.split('\n').map((line, i) => (
            <p key={i} className="mb-2">{line.replace(/[*#]/g, '')}</p>
          ))}
        </div>
      )}
    </div>
  );
}
