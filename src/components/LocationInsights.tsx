import { useState } from "react";
import { Sparkles, MapPin, Loader2 } from "lucide-react";
import { Reveal } from "./Reveal";

interface Props {
  pickup: string;
  dropoff: string;
}

export function LocationInsights({ pickup, dropoff }: Props) {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    if (!pickup || !dropoff) {
      alert("Please enter both pickup and dropoff locations to get smart insights.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/gemini/maps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Analyze a route between ${pickup} and ${dropoff} in Uganda (Kampala). Provide a very brief, helpful insight for a driver or rider about this route (e.g. traffic hotspots, road conditions, or notable landmarks). Keep it to 2-3 sentences max.`
        })
      });
      const data = await response.json();
      setInsight(data.text);
    } catch (e) {
      console.error(e);
      setInsight("Unable to fetch insights at this time.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-bold text-indigo-900 flex items-center gap-2 text-sm">
          <Sparkles size={16} className="text-indigo-500" /> AI Route Insights
        </h4>
        <button 
          type="button"
          onClick={fetchInsights}
          disabled={loading}
          className="text-xs font-bold bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-1"
        >
          {loading ? <Loader2 size={12} className="animate-spin" /> : <MapPin size={12} />}
          Get Insights
        </button>
      </div>
      {insight && (
        <Reveal direction="up">
          <p className="text-sm font-medium text-indigo-800 leading-relaxed bg-white p-3 rounded-lg border border-indigo-50">
            {insight}
          </p>
        </Reveal>
      )}
    </div>
  );
}
