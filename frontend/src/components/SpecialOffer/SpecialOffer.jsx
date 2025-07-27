import React, { useEffect, useState } from 'react';
import {
  cardData,
  additionalData,
  addButtonBase,
  addButtonHover,
  commonTransition
} from '../../assets/dummydata';
import { useCart } from '../../CartContext/CartContext';
import { FaFire, FaHeart, FaPlus, FaStar } from 'react-icons/fa';
import { HiMinus, HiPlus } from 'react-icons/hi';
import FloatingParticles from '../FloatingParticles/FloatingParticles';
import axios from 'axios';

const SpecialOffer = () => {
  const [showAll, setShowAll] = useState(false);
  const [items, setItems] = useState([]);
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();

  useEffect(() => {
    axios.get('http://localhost:4000/api/items')
    .then(res => setItems(res.data.items ?? res.data))
    .catch(err => console.error(err));
  }, []);

  const displayList = Array.isArray(items) ? items.slice(0, showAll ? 8 : 4) : [];

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4 font-[Poppins]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold mb-4 transform transition-all bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-[Playfair_Display] italic">
            Today's <span className="text-stroke-cyan">Special</span> Offers
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto tracking-wide leading-relaxed">
            Discover exclusive deals available for a limited time only. Enjoy discounts on premium products, limited editions, and unique bundles crafted to elevate your experience. Don’t miss out!
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayList.map(item=> {
            const cartItem = cartItems.find((ci) => ci.item._id === item._id);
            const qty = cartItem ? cartItem.quantity : 0;
            const cartId = cartItem?._id

            return (
              <div
                key={item._id}
                className="relative group bg-slate-800 rounded-3xl overflow-hidden shadow-2xl transform hover:-translate-y-4 transition-all duration-500 hover:shadow-cyan-500/30 border-2 border-transparent hover:border-cyan-500/20"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={item.imageUrl || item.image}
                    alt={item.name}
                    className="w-full h-full object-cover brightness-90 group-hover:brightness-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

                  {/* Rating + Likes */}
                  <div className="absolute top-4 left-4 ring-4 ring-black/30 border-4 border-cyan-400/50 flex items-center gap-4 bg-black/50 backdrop-blur-sm px-4 py-1 rounded-full z-10">
                    <span className="flex items-center gap-2 text-cyan-400">
                      <FaStar className="text-xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" />
                      <span className="font-bold">{item.rating}</span>
                    </span>
                    <span className="flex items-center gap-2 text-pink-400">
                      <FaHeart className="text-xl animate-pulse" />
                      <span className="font-bold">{item.hearts}</span>
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 relative z-10">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent font-[Playfair_Display] italic">
                    {item.name}
                  </h3>
                  <p className="text-slate-300 mb-5 text-sm leading-relaxed tracking-wide">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-2xl font-bold text-cyan-400 flex-1">{Number(item.price).toFixed(2)}</span>

                    {/* Quantity Controls / Add Button */}
                    {qty > 0 ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            qty > 1
                              ? updateQuantity(cartId.id, qty - 1)
                              : removeFromCart(cartId);
                          }}
                          className="w-8 h-8 rounded-full bg-cyan-900/40 flex items-center justify-center hover:bg-cyan-800/50 transition-all duration-200 active:scale-95"
                        >
                          <HiMinus className="w-4 h-4 text-cyan-100" />
                        </button>
                        <span className="w-8 text-center text-cyan-100 font-cinzel">{qty}</span>
                        <button
                          onClick={() => updateQuantity(cartId, qty + 1)}
                          className="w-8 h-8 rounded-full bg-cyan-900/40 flex items-center justify-center hover:bg-cyan-800/50 transition-all duration-200 active:scale-95"
                        >
                          <HiPlus className="w-4 h-4 text-cyan-100" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          addToCart(item, 1)
                        }
                        className={`relative px-4 py-2 flex items-center gap-2 bg-cyan-800/40 rounded-lg text-cyan-100 hover:bg-cyan-700 transition-all duration-300
                          ${addButtonBase} ${addButtonHover} ${commonTransition}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                        <FaPlus className="text-lg relative z-10 transition-transform" />
                        <span className="relative z-10">Add</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Glow Border & Particles */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-transparent group-hover:border-cyan-500/30 transition-all duration-500" />
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <FloatingParticles />
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More / Less Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-3 bg-gradient-to-r from-cyan-700 to-blue-700 text-white py-4 px-8 rounded-2xl font-bold text-lg uppercase tracking-wider hover:gap-4 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 group border-2 border-cyan-400/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
            <FaFire className="text-xl z-10 animate-pulse" />
            <span className="z-10">{showAll ? 'Show Less' : 'Show More'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
