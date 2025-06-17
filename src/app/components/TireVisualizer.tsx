'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function TireVisualizer() {
  const [tread, setTread] = useState(70);
  const [width, setWidth] = useState(245);
  const [aspectRatio, setAspectRatio] = useState(45);
  const [diameter, setDiameter] = useState(18);

  const topViewSize = diameter * 12 + 100;
  // const sideViewHeight = diameter * 12 + 100;
  // const sideViewWidth = width * 0.5;

  const treadBasePrice = (tread / 100) * 100;
  const widthPremium = Math.max(0, (width - 245) * 0.4);
  const aspectPremium = Math.max(0, (aspectRatio - 45)) * 0.4;
  const diameterPremium = Math.max(0, (diameter - 18)) * 5;

  const totalPrice = (treadBasePrice + widthPremium + aspectPremium + diameterPremium).toFixed(2);
  const maxMiles = 40000;
  const estimatedRange = Math.round((tread / 100) * maxMiles);

  return (
    <div className="flex flex-col items-center gap-6 p-12 bg-black/60 border border-white/20 rounded-xl">

      {/* Branding */}
      <div className="flex flex-row items-center gap-4">
        <Image
          src="/michelin.svg"
          alt="Michelin Logo"
          width={220}
          height={40}
          className="object-contain"
        />
        <div className="text-2xl font-semibold italic text-white">
          Pilot Sport 4S
        </div>
      </div>

      {/* Tire Images */}
      <div className="flex flex-col md:flex-row items-end justify-center gap-12 m-8">
        <div
          className="relative"
          style={{ width: `${topViewSize}px`, height: `${topViewSize}px` }}
        >
          <Image
            src="/tire.png"
            alt="Top-down tire view"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div
          className="relative"
          style={{
            width: `${diameter * 8 + 80}px`, // scales width slightly with diameter
            height: `${topViewSize}px`,      // match top view height for alignment
          }}
        >
          <Image
            src="/tire_f.png"
            alt="Side tire view"
            fill
            className="object-contain"
          />
        </div>

      </div>

      {/* Spec Summary Card */}
      <div className="w-full max-w-md px-6 py-4 space-y-2 rounded-xl bg-white/10 text-white border backdrop-blur-lg shadow-lg border-white/20 text-left">
        <div className="text-xl font-bold">
          Selected Spec: <span className="font-light">{width}/{aspectRatio}/{diameter}</span>
        </div>

        <div className="text-xl font-bold">
          Estimated driving range: <span className="text-yellow-300 font-light">{estimatedRange.toLocaleString()} miles</span>
        </div>

        <div className="rounded-xl text-2xl font-bold">
          Price:
          <span className="text-emerald-400 font-light">${totalPrice}</span>
          <span className="font-light">per tire</span>
        </div>
      </div>

      {/* Sliders Card */}
      <div className="w-full max-w-md rounded-xl bg-white/10 backdrop-blur-lg shadow-lg p-6 space-y-4 border border-white/20">
        <div>
          <label className="block mb-1 font-semibold text-white">
            Tire Life/Tread Depth ({tread}%)
          </label>
          <input
            type="range"
            min={30}
            max={100}
            step={10}
            value={tread}
            onChange={(e) => setTread(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-white">
            Tire Width ({width}mm)
          </label>
          <input
            type="range"
            min={205}
            max={335}
            step={10}
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-white">
            Aspect Ratio ({aspectRatio})
          </label>
          <input
            type="range"
            min={30}
            max={70}
            step={5}
            value={aspectRatio}
            onChange={(e) => setAspectRatio(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-white">
            Wheel Diameter ({diameter}in)
          </label>
          <input
            type="range"
            min={16}
            max={23}
            step={1}
            value={diameter}
            onChange={(e) => setDiameter(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          className="px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
          onClick={() => alert('Order placed for pickup!')}
        >
          Buy now
        </button>

        <button
          className="px-6 py-2 bg-indigo-700 text-white rounded-xl hover:bg-indigo-800/80 transition-colors"
        >
          Add to cart
        </button>

        <button
          className="px-6 py-2 bg-rose-800 text-white rounded-xl hover:bg-rose-700/90 transition-colors"
        >
          View specs
        </button>
      </div>
    </div>
  );
}
