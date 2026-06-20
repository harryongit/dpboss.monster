import React from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDailyGuessingFreeFix } from "@/hooks/common/useDailyGuessingFreeFix";

type GuessingItem = {
  market_name: string;
  single?: string;
  panna?: string;
  jodi?: string;
};



const FreeGuessingDaily: React.FC = () => {
  const query = useDailyGuessingFreeFix();

  const apiItems: GuessingItem[] = query.data?.data?.items ?? [];

  // show dummy markets if API empty
  const items = apiItems.length > 0 ? apiItems : [];

  const [dateStr, setDateStr] = React.useState("");
  React.useEffect(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    setDateStr(`${dd}/${mm}/${yyyy}`);
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-[#f6c79b] border-2 border-pink-500 rounded-md overflow-hidden shadow-md">

      {/* HEADER */}
      <div className="satta-header-pink">
        <h2 className="text-center text-white text-[16px] font-black uppercase m-0 leading-tight">
          FREE GAME ZONE OPEN-CLOSE
        </h2>
      </div>

      {/* DATE + REFRESH */}
      <div className="text-[22px] relative border-2 border-pink-500 mx-2 my-2 rounded-md text-center font-bold bg-[#f6c79b] py-2 leading-tight">
        <p>✓ DATE: {dateStr}</p>
        <p>FREE GUESSING DAILY</p>
        <p>OPEN TO CLOSE FIX ANK</p>
      </div>
      {/* MARKETS GRID */}
      <div className="grid grid-cols-2 gap-2 p-2">

        {query.isFetching && (
          <div className="col-span-2 text-center text-red-600 font-semibold py-4">
            Loading...
          </div>
        )}

        {!query.isFetching &&
          items.map((it: GuessingItem, idx: number) => (
            <div
              key={idx}
              className="border-2 border-green-700 rounded-lg overflow-hidden bg-[#f6c79b] shadow-md"
            >
              {/* MARKET TITLE */}
              <div className="bg-green-700 text-white text-center font-extrabold py-2 text-[22px] sm:text-base rounded-b-xl">
                ↪ {it.market_name?.toUpperCase()}
              </div>

              {/* NUMBERS */}
              <div className="text-center text-blue-900 font-bold py-3 leading-6 text-xs sm:text-sm whitespace-pre-wrap">
                <div>{it.single}</div>
                <div>{it.panna}</div>
                <div>{it.jodi}</div>
              </div>
            </div>
          ))}

      </div>
    </div>
  );
};

export default FreeGuessingDaily;
