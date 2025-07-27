import { useState } from "react";
import { FiHeart, FiStar, FiUpload } from "react-icons/fi";
import axios from "axios";
import { FaRupeeSign } from "react-icons/fa";

const AddItems = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        rating: 0,
        hearts: 0,
        total: 0,
        image: null,
        preview: "",
    });

    const [categories] = useState([
        "Breakfast",
        "Lunch",
        "Dinner",
        "Mexican",
        "Italian",
        "Desserts",
        "Drinks",
    ]);

    const [hoverRating, setHoverRating] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: file,
                preview: URL.createObjectURL(file),
            }));
        }
    };

    const handleRating = (rating) =>
        setFormData((prev) => ({ ...prev, rating }));

    const handleHearts = () =>
        setFormData((prev) => ({ ...prev, hearts: prev.hearts + 1 }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = new FormData();
            Object.entries(formData).forEach(([key, val]) => {
                if (key === "preview") return;
                payload.append(key, val);
            });

            await axios.post("https://fooddeliveryapp-backend-d6ry.onrender.com/api/items", payload, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setFormData({
                name: "",
                description: "",
                category: "",
                price: "",
                rating: 0,
                hearts: 0,
                total: 0,
                image: null,
                preview: "",
            });

            alert("Item added successfully!");
        } catch (err) {
            console.error("Error in uploading item", err.response || err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0b1727] via-[#0d2239] to-[#102c4b] py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-[#152a3a]/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-cyan-500/20">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent text-center">
                        Add New Items To The Menu
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                        {/* Image Upload */}
                        <div className="flex justify-center">
                            <label
                                htmlFor="item-image"
                                className="w-full max-w-xs sm:w-72 h-56 sm:h-72 bg-[#1b3a4a]/50 border-2 border-dashed border-cyan-500/30 rounded-2xl cursor-pointer flex items-center justify-center overflow-hidden hover:border-cyan-400 transition-all"
                            >
                                {formData.preview ? (
                                    <img
                                        src={formData.preview}
                                        alt="preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center p-4">
                                        <FiUpload className="text-3xl sm:text-4xl text-cyan-400 mb-2 mx-auto animate-pulse" />
                                        <p className="text-cyan-300 text-sm">Upload the Product Image</p>
                                    </div>
                                )}
                                <input
                                    id="item-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    required
                                />
                            </label>
                        </div>

                        {/* Inputs */}
                        <div className="space-y-6">
                            <div>
                                <label className="block mb-2 text-base sm:text-lg text-cyan-300">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#1b3a4a]/50 border border-cyan-500/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:border-cyan-400 text-cyan-100"
                                    placeholder="Enter Product Name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-base sm:text-lg text-cyan-300">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#1b3a4a]/50 border border-cyan-500/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:border-cyan-400 text-cyan-100 h-32 sm:h-40"
                                    placeholder="Enter product description"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className="block mb-2 text-base sm:text-lg text-cyan-300">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#1b3a4a]/50 border border-cyan-500/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:border-cyan-400 text-cyan-100"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((c) => (
                                            <option key={c} value={c} className="bg-[#102c4b]">
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-2 text-base sm:text-lg text-cyan-300">Price (₹)</label>
                                    <div className="relative">
                                        <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg sm:text-xl" />
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#1b3a4a]/50 border border-cyan-500/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:border-cyan-400 text-cyan-100 pl-10 sm:pl-12"
                                            placeholder="Enter the Price"
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className="block mb-2 text-base sm:text-lg text-cyan-300">Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => handleRating(star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className="text-2xl sm:text-3xl transition-transform hover:scale-110"
                                            >
                                                <FiStar
                                                    className={
                                                        star <= (hoverRating || formData.rating)
                                                            ? "text-cyan-400 fill-current"
                                                            : "text-cyan-100/30"
                                                    }
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 text-base sm:text-lg text-cyan-300">Popularity</label>
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <button
                                            type="button"
                                            onClick={handleHearts}
                                            className="text-2xl sm:text-3xl text-cyan-400 hover:text-cyan-300 transition-colors animate-pulse"
                                        >
                                            <FiHeart />
                                        </button>
                                        <input
                                            type="number"
                                            name="hearts"
                                            value={formData.hearts}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#1b3a4a]/50 border border-cyan-500/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:border-cyan-400 text-cyan-100 pl-10 sm:pl-12"
                                            placeholder="Enter Likes"
                                            min="0"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg transition-all hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-95 mt-6"
                            >
                                Add Item to Menu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddItems;
