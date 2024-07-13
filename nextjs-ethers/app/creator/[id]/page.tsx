'use client'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DynamicWidget } from "../../../lib/dynamic";
// import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

const items = [
  { name: "Autograph", price: 1000 },
  { name: "Pre-sale access", price: 2000 },
  { name: "Selfie with creator", price: 9999 },
];

const creators = {
  1: 'Wildways'
}

export default function Main() {
  const [creatorPoints, setCreatorPoints] = useState(1000);

  // const { user } = useDynamicContext();
  // console.log(user)

  const { id } = useParams();
  const creatorName = creators[id] || 'Unknown Artist';

  const handlePurchase = (price) => {
    if (price <= creatorPoints) {
      setCreatorPoints(creatorPoints - price);
    }
  };

  const handleStake = () => {
    setCreatorPoints(creatorPoints + 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center">
            <img src="/logo.png" alt="logo"/>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Creator {creatorName}</h1>

        <DynamicWidget />

        {/* Stake button */}
        <button
          onClick={handleStake}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6"
        >
          Stake
        </button>

        {/* Creator points counter */}
        <div className="text-xl font-bold mb-6">
          Creator points: {creatorPoints}
        </div>

        {/* List of items */}
        <div className="mt-10 space-y-4">
          {items.map((item, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg w-64 flex flex-row items-center">
              <div className="text-xl font-bold mb-2 mx-2">{item.name}</div>
              <div className="text-lg mb-4 mx-2">{item.price}</div>
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 ${item.price > creatorPoints ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={item.price > creatorPoints}
                onClick={() => handlePurchase(item.price)}
              >
                Purchase
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
