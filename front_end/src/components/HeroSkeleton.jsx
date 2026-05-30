const HeroSkeleton = () => {
  return (
    <div className="animate-pulse min-h-screen bg-black p-3 md:p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-[#111] border border-purple-900 rounded-2xl p-4 h-auto lg:h-[340px]">
            <div className="h-6 w-40 bg-[#222] rounded mb-6"></div>

            <div className="space-y-4">
              <div className="h-14 bg-[#1a1a1a] rounded-xl"></div>
              <div className="h-14 bg-[#1a1a1a] rounded-xl"></div>
              <div className="h-14 bg-[#1a1a1a] rounded-xl"></div>
            </div>
          </div>

          <div className="bg-[#111] border border-purple-900 rounded-2xl p-4 h-auto lg:h-[280px]">
            <div className="h-6 w-44 bg-[#222] rounded mb-6"></div>

            <div className="space-y-3">
              <div className="h-12 bg-[#1a1a1a] rounded-xl"></div>
              <div className="h-12 bg-[#1a1a1a] rounded-xl"></div>
              <div className="h-12 bg-[#1a1a1a] rounded-xl"></div>
              <div className="h-12 bg-[#1a1a1a] rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* CENTER */}
        <div className="lg:col-span-6">
          <div className="bg-[#111] rounded-2xl border border-[#222] p-4 min-h-[430px]">
            <div className="h-8 w-40 bg-[#222] rounded mx-auto mb-10"></div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 place-items-center">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-10 md:h-12 md:w-12 rounded bg-[#1a1a1a]"
                ></div>
              ))}
            </div>
          </div>

          <div className="bg-[#111] mt-4 rounded-2xl border border-[#222] p-4 min-h-[220px]">
            <div className="h-6 w-48 bg-[#222] rounded mb-8"></div>

            <div className="space-y-4">
              <div className="h-5 bg-[#1a1a1a] rounded"></div>
              <div className="h-5 bg-[#1a1a1a] rounded"></div>
              <div className="h-5 bg-[#1a1a1a] rounded"></div>
              <div className="h-5 bg-[#1a1a1a] rounded"></div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-[#111] rounded-2xl border border-yellow-800 p-4 h-auto lg:h-[320px]">
            <div className="h-6 w-32 bg-[#222] rounded mb-8"></div>

            <div className="space-y-4">
              <div className="h-24 rounded-xl bg-[#1a1a1a]"></div>
              <div className="h-24 rounded-xl bg-[#1a1a1a]"></div>
            </div>
          </div>

          <div className="bg-[#111] rounded-2xl border border-pink-900 p-4 h-auto lg:h-[290px]">
            <div className="h-6 w-40 bg-[#222] rounded mb-8"></div>

            <div className="space-y-4">
              <div className="h-14 rounded-xl bg-[#1a1a1a]"></div>
              <div className="h-14 rounded-xl bg-[#1a1a1a]"></div>
              <div className="h-14 rounded-xl bg-[#1a1a1a]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
