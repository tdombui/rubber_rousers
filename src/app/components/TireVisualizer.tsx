'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function TireVisualizer() {
  const [tread, setTread] = useState(70);
  const [width, setWidth] = useState(245);
  const [aspectRatio, setAspectRatio] = useState(45);
  const [diameter, setDiameter] = useState(18);

  const topViewSize = 300;

  const treadBasePrice = (tread / 100) * 100;
  const widthPremium = Math.max(0, (width - 245) * 0.4);
  const aspectPremium = Math.max(0, (aspectRatio - 45)) * 0.4;
  const diameterPremium = Math.max(0, (diameter - 18)) * 5;

  const totalPrice = (treadBasePrice + widthPremium + aspectPremium + diameterPremium).toFixed(2);
  const maxMiles = 40000;
  const estimatedRange = Math.round((tread / 100) * maxMiles);

  const VALID = {
    widths: [215, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315, 325, 335, 345, 355],
    aspectRatios: [25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
    diameters: [17, 18, 19, 20, 21, 22, 23],
  };

  const isValidSpec =
    VALID.widths.includes(width) &&
    VALID.aspectRatios.includes(aspectRatio) &&
    VALID.diameters.includes(diameter);

  const isCupSportLikely = width >= 345 && aspectRatio <= 30 && diameter >= 20;

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
        <div className="relative" style={{ width: `${topViewSize}px`, height: `${topViewSize}px` }}>
          <Image
            src={`/tires/michelin/pilotsport/front/${width}.webp`}
            alt={`${width}mm Front View`}
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="relative" style={{ width: `${topViewSize}px`, height: `${topViewSize}px` }}>
          <Image
            src={`/tires/michelin/pilotsport/side/${diameter}.webp`}
            alt={`${diameter}in Side View`}
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
          Price: <span className="text-emerald-400 font-light">${totalPrice}</span>
          <span className="font-light"> per tire</span>
        </div>

        {!isValidSpec && (
          <div className="mt-4 text-red-400 font-semibold">
            ❌ The spec {width}/{aspectRatio}/{diameter} is not available for Pilot Sport 4S.
          </div>
        )}

        {isValidSpec && isCupSportLikely && (
          <div className="mt-2 text-yellow-300 text-sm font-light">
            ⚠️ This size is typically found on track-focused Cup Sport or Cup 2 tires.
          </div>
        )}
      </div>

      {/* Sliders Card */}
      <div className="w-full max-w-md rounded-xl bg-white/10 backdrop-blur-lg shadow-lg p-6 space-y-4 border border-white/20">
        <div>
          <label className="block mb-1 font-semibold text-white">Tire Life/Tread Depth ({tread}%)</label>
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
          <label className="block mb-1 font-semibold text-white">Tire Width ({width}mm)</label>
          <input
            type="range"
            min={215}
            max={355}
            step={10}
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-white">Aspect Ratio ({aspectRatio})</label>
          <input
            type="range"
            min={25}
            max={70}
            step={5}
            value={aspectRatio}
            onChange={(e) => setAspectRatio(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-white">Wheel Diameter ({diameter}in)</label>
          <input
            type="range"
            min={17}
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
          disabled={!isValidSpec}
          className={`px-6 py-2 text-white rounded-xl transition-colors ${isValidSpec
            ? 'bg-emerald-600 hover:bg-emerald-700'
            : 'bg-gray-600 cursor-not-allowed'
            }`}
          onClick={() => isValidSpec && alert('Order placed for pickup!')}
        >
          {isValidSpec ? 'Buy now' : 'Unavailable'}
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
