import { useEffect, useState } from "react";
import { useCart } from "../../CartContext/CartContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import "./OurMenu.css"
import axios from "axios";

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Mexican', 'Italian', 'Desserts', 'Drinks'];

const OurMenu = () => {

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
  const [menuData, setMenuData] = useState({});

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/items');
        const byCategory = res.data.reduce((acc, item) => {
          const cat = item.category || "uncategorized";
          acc[cat] = acc[cat] || [];
          acc[cat].push(item);
          return acc;
        }, {});
        setMenuData(byCategory);
      } catch (err) {
        console.error("failed to fetch menu data", err);
      }
    }
    fetchMenu();
  }, []);

  const getCartEntry = id => cartItems.find(ci => ci.item._id === id);
  const getQuantity = id => getCartEntry(id)?.quantity || 0;

  const displayItem = (menuData[activeCategory] ?? []).slice(0, 12);

  return (
    <div className="bg-gradient-to-br from-[#0a0f1f] via-[#111827] to-[#1e293b] min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-sky-500">
          <span className="font-dancingscript block text-5xl sm:text-6xl md:text-7xl mb-2">
            Our Exquisite Menu
          </span>
          <span className="block text-xl sm:text-2xl md:text-3xl font-cinzel mt-4 text-cyan-200/80">
            A Symphony of Flavours
          </span>
        </h2>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-6 py-2 rounded-full border-2 transition-all duration-300 transform font-cinzel text-sm sm:text-xl
              tracking-widest backdrop-blur-sm ${activeCategory === cat
                  ? "bg-gradient-to-r from-cyan-700 to-sky-600 border-cyan-400 text-white scale-105 shadow-xl shadow-cyan-500/20"
                  : "bg-slate-800/40 border-sky-700/40 text-cyan-100/80 hover:bg-sky-800/50 hover:scale-95"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {displayItem.length > 0 ? (
            displayItem.map((item, i) => {
              const cartEntry = getCartEntry(item._id);
              const quantity = cartEntry?.quantity || 0;
              return (
                <div
                  key={item._id}
                  className="relative bg-cyan-900/10 rounded-2xl overflow-hidden border border-cyan-700/30 backdrop-blur-sm flex flex-col transition-all duration-500 card-enter"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="relative h-48 sm:h-56 md:h-60 flex items-center justify-center bg-black/10">
                    <img
                      src={item.imageUrl || item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain transition-all duration-700"
                    />
                  </div>
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <h3 className="text-xl sm:text-2xl mb-2 font-dancingscript text-cyan-100">
                      {item.name}
                    </h3>
                    <p className="text-cyan-100/80 text-xs sm:text-sm mb-4 font-cinzel leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-auto flex items-center gap-4 justify-between">
                      <div className="bg-cyan-100/10 backdrop-blur-sm px-3 py-1 rounded-2xl shadow-lg">
                        <span className="text-xl font-bold text-cyan-300 font-dancingscript">
                          ₹ {Number(item.price).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {quantity > 0 ? (
                          <>
                            <button
                              className="w-8 h-8 rounded-full bg-cyan-900/40 flex items-center justify-center hover:bg-cyan-800/50 transition-colors"
                              onClick={() =>
                                quantity > 1
                                  ? updateQuantity(cartEntry._id, quantity - 1)
                                  : removeFromCart(cartEntry._id)
                              }
                            >
                              <FaMinus className="text-cyan-100" />
                            </button>
                            <span className="w-8 text-center text-cyan-100">{quantity}</span>
                            <button
                              className="w-8 h-8 rounded-full bg-cyan-900/40 flex items-center justify-center hover:bg-cyan-800/50 transition-colors"
                              onClick={() => updateQuantity(cartEntry._id, quantity + 1)}
                            >
                              <FaPlus className="text-cyan-100" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => addToCart(item, 1)}
                            className="bg-cyan-900/40 px-4 py-1.5 rounded-full font-cinzel text-xs uppercase sm:text-sm tracking-wider
                            transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/20 relative overflow-hidden
                            border border-cyan-700/50"
                          >
                            <span className="relative z-10 text-cyan-100">Add To Cart</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center col-span-full text-cyan-100/70 font-cinzel italic">
              No items available in this category.
            </p>
          )}
        </div>


      </div>
    </div>
  );
}
export default OurMenu