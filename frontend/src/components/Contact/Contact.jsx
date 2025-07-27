import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { contactFormFields } from "../../assets/dummydata";
import { FiArrowRight, FiGlobe, FiMail, FiMapPin, FiMessageSquare, FiPhone } from "react-icons/fi";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', address: '', dish: '', query: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        toast.success("Your query has been submitted successfully", {
            style: {
                border: '2px solid #06b6d4',
                padding: '16px',
                color: '#fff',
                background: "rgba(0,0,0,0.8)",
                backdropFilter: 'blur(10px)'
            },
            iconTheme: {
                primary: '#06b6d4',
                secondary: '#fff'
            },
        });

        setFormData({
            name: '', phone: '', email: '', address: '', dish: '', query: ''
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#112e42] to-[#0a192f] py-12 px-4 sm:px-6 md:px-8 font-[poppins] relative overflow-hidden">
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 4000 }} />

            {/* Floating Shapes */}
            <div className="absolute top-20 left-10 w-24 h-24 bg-cyan-400/20 rounded-full animate-float" />
            <div className="absolute bottom-40 right-20 w-16 h-16 bg-blue-500/20 rounded-full animate-float-delayed" />

            <div className="max-w-7xl mx-auto relative z-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8 animate-fade-in-down">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-600">
                        Connect With Us
                    </span>
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Info Cards */}
                    <div className="space-y-6">

                        {/* Headquarters */}
                        <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl hover:scale-[1.02] transition duration-300 border-l-4 border-cyan-500 hover:border-cyan-400 group">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                            <div className="flex items-center mb-4 relative z-10">
                                <div className="p-3 bg-gradient-to-br from-cyan-500/30 to-cyan-700/30 rounded-xl">
                                    <FiMapPin className="text-cyan-100 text-2xl animate-pulse" />
                                </div>
                                <h3 className="ml-4 text-cyan-100 text-xl font-semibold">Our Headquarters</h3>
                            </div>
                            <div className="px-6 pb-4 relative z-10">
                                <p className="text-cyan-100 font-light text-lg">Palakkad, Kerala</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl hover:scale-[1.02] transition duration-300 border-l-4 border-teal-500 hover:border-teal-400 group">
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                            <div className="flex items-center mb-4 relative z-10">
                                <div className="p-3 bg-gradient-to-br from-teal-500/30 to-teal-700/30 rounded-xl">
                                    <FiPhone className="text-teal-400 text-2xl animate-ping" />
                                </div>
                                <h3 className="ml-4 text-cyan-100 text-xl font-semibold">Contact Number</h3>
                            </div>
                            <div className="px-6 pb-4 relative z-10">
                                <p className="text-cyan-100 font-light flex items-center text-lg">
                                    <FiGlobe className="text-teal-400 text-xl mr-2" />
                                    +91 98765 43210
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl hover:scale-[1.02] transition duration-300 border-l-4 border-blue-500 hover:border-blue-400 group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                            <div className="flex items-center mb-4 relative z-10">
                                <div className="p-3 bg-gradient-to-br from-blue-500/30 to-blue-700/30 rounded-xl">
                                    <FiMail className="text-blue-400 text-2xl animate-bounce" />
                                </div>
                                <h3 className="ml-4 text-blue-100 text-xl font-semibold">Email Address</h3>
                            </div>
                            <div className="px-6 pb-4 relative z-10">
                                <p className="text-blue-100 font-light text-lg">abcde@gmail.com</p>
                            </div>
                        </div>

                    </div>

                    {/* Contact Form */}
                    <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl animate-slide-in-right border-2 border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300">
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-cyan-500/30 rounded-full animate-ping-slow" />

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            {contactFormFields.map(({ label, name, type, placeholder, pattern, Icon }) => (
                                <div key={name}>
                                    <label className="block text-cyan-100 text-sm font-medium mb-2">{label}</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                            <Icon className="text-cyan-400 text-xl animate-pulse" />
                                        </div>
                                        <input
                                            type={type}
                                            name={name}
                                            value={formData[name]}
                                            onChange={handleChange}
                                            placeholder={placeholder}
                                            pattern={pattern}
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-white/10 border-2 border-cyan-500/30 rounded-xl text-cyan-50 placeholder-cyan-200/50 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* Query Textarea */}
                            <div>
                                <label className="block text-cyan-100 text-sm font-medium mb-2">Your Query</label>
                                <div className="relative">
                                    <div className="absolute left-3 top-4">
                                        <FiMessageSquare className="text-cyan-400 text-xl animate-pulse" />
                                    </div>
                                    <textarea
                                        name="query"
                                        value={formData.query}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Type your query"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-white/10 border-2 border-cyan-500/30 rounded-xl text-cyan-50 placeholder-cyan-200/50 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center gap-2 group"
                            >
                                <span>Submit Query</span>
                                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
