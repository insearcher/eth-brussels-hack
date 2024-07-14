// @ts-nocheck

'use client'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DynamicWidget } from "../../../lib/dynamic";
import {parseEther} from "viem";

import { useDynamicContext, useIsLoggedIn } from '@dynamic-labs/sdk-react-core';

const items = [
  { name: "Autograph", price: 1000 },
  { name: "Pre-sale access", price: 2000 },
  { name: "Selfie with creator", price: 9999 },
];

const creators = {
  1: 'Wildways'
}

export default function Main() {
  const isLoggedIn = useIsLoggedIn();
  const [creatorPoints, setCreatorPoints] = useState(0);
  const [stakeAmount, setStakeAmount] = useState(0.0001);
  const [isMounted, setIsMounted] = useState(false);

  const { primaryWallet } = useDynamicContext();

  const executeContract = async (amount) => {
    try {
      // const provider = newthers.providers.JsonRpcProvider('https://sepolia-rollup.arbitrum.io/rpc');
      // console.log(provider)

      const signer = await primaryWallet?.connector.ethers?.getSigner()
      console.log(signer)

      // const connectedSigner = signer.connect(provider);
      // console.log(connectedSigner)

    const tx = await signer?.sendTransaction({
      to: '0x8c0aB0427749F61E506DC9459259f40846d32A95',
      value: parseEther(amount.toString()),
      chainId: 421614,
    });

    setCreatorPoints(creatorPoints + Math.floor(10000 * amount));
    console.log(tx)
    }
    catch (error) {
      console.error('Transaction failed', error);
    } 
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { id } = useParams();
  const creatorName = creators[id] || 'Unknown Artist';

  const handlePurchase = (item) => {
    if (item.price <= creatorPoints && isLoggedIn) {
      const url = 'https://api.telegram.org/bot7385275610:AAE8ROGu_QB4q23kATKlgkNxF3MXiJIz2J0/sendMessage';
      const data = {
        chat_id: "217941159",
        text: `The user Maksim Frolov purchased your item ${item.name}`,
        disable_notification: true
      };

      setCreatorPoints(creatorPoints - item.price);

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      console.error("trying to purchase when there are no enough money")
    }
};

const handleStake = () => {
  const amount = parseFloat(stakeAmount);
  if (!isNaN(amount) && amount > 0) {
    executeContract(amount)
  }
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

        {isMounted && isLoggedIn && (
          <>
            {/* Stake input and button */}
            <div className="flex flex-row items-center mb-6">
              <input
                type="number"
                step="0.0001"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="bg-gray-800 text-white font-bold py-2 px-4 rounded mr-4"
                min="0.0001"
              />
              <button
                onClick={handleStake}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Stake
              </button>
            </div>

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
                    onClick={() => handlePurchase(item)}
                  >
                    Purchase
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
