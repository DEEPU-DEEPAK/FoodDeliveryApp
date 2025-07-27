import { useEffect, useMemo, useState } from "react"
import { FaArrowLeft, FaLock } from "react-icons/fa"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useCart } from "../../CartContext/CartContext"
import axios from "axios"

const Checkout = () => {

    const { totalAmount, cartItems, clearCart } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', phone: '',
        email: '', address: '', city: '',
        zipCode: '', paymentMethod: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('authToken');
    const authHeaders = useMemo(() => (
        token ? { Authorization: `Bearer ${token}` } : {}
    ), [token]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const paymentStatus = params.get('paymentStatus');
        const sessionId = params.get('sessionId');

        if (paymentStatus) {
            setLoading(true);

            if (paymentStatus === 'success' && sessionId) {
                axios.post('https://fooddeliveryapp-backend-d6ry.onrender.com/api/orders/confirm', { sessionId }, { headers: authHeaders })
                    .then(({ data }) => {
                        clearCart();
                        navigate('/myorders', { state: { order: data } });
                    })
                    .catch(err => {
                        console.error('Error confirming order:', err);
                        setError('Failed to confirm order. Please try again.');
                    })
                    .finally(() => setLoading(false));
            } else if (paymentStatus === 'cancel') {
                setError('Payment was cancelled. Please try again.');
                setLoading(false);
            }
        }
    }, [location.search, authHeaders, clearCart, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const subtotal = Number(totalAmount.toFixed(2));
        const tax = Number((subtotal * 0.05).toFixed(2));
        const payload = {
            ...formData,
            subtotal,
            tax,
            total: Number((subtotal + tax).toFixed(2)),
            items: cartItems.map(({ item, quantity }) => ({
                name: item.name,
                price: item.price,
                quantity,
                imageUrl: item.imageUrl || ''
            }))
        };
        try {
            if (formData.paymentMethod === 'online') {
                const { data } = await axios.post('http://localhost:4000/api/orders', payload, { headers: authHeaders });
                window.location.href = data.checkoutUrl;
            } else {
                const { data } = await axios.post('http://localhost:4000/api/orders', payload, { headers: authHeaders });
                clearCart();
                navigate('/myorders', { state: { order: data } });
            }
        } catch (err) {
            console.error('Error during checkout:', err);
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-[#0D1B2A] to-[#1B263B] text-white py-16 px-4'>
            <div className='mx-auto max-w-4xl'>
                <Link className='flex items-center gap-2 text-cyan-400 mb-8' to='/cart'>
                    <FaArrowLeft /> Back to Cart
                </Link>
                <h1 className='text-4xl font-bold text-center mb-8 text-cyan-200'>Checkout</h1>
                <form className='grid lg:grid-cols-2 gap-12' onSubmit={handleSubmit}>

                    {/* Personal Info */}
                    <div className="bg-[#1E2A38] p-6 rounded-3xl space-y-6">
                        <h2 className="text-2xl font-bold text-cyan-300">Personal Information</h2>
                        <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                        <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                        <Input label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                        <Input label="Address" name="address" value={formData.address} onChange={handleInputChange} />
                        <Input label="City" name="city" value={formData.city} onChange={handleInputChange} />
                        <Input label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleInputChange} />
                    </div>

                    {/* Payment Info */}
                    <div className="bg-[#1E2A38] p-6 rounded-3xl space-y-6">
                        <h2 className="text-2xl font-bold text-cyan-300">Payment Information</h2>

                        <div className="space-y-4 mb-6">
                            <h3 className="text-lg font-semibold text-cyan-100">Your Ordered Items</h3>
                            {cartItems.map(({ _id, item, quantity }) => (
                                <div key={_id} className="flex justify-between items-center bg-[#283646] p-3 rounded-lg">
                                    <div className="flex-1">
                                        <span className="text-cyan-100">{item.name}</span>
                                        <span className="ml-2 text-cyan-400 text-sm">x{quantity}</span>
                                    </div>
                                    <span className="text-cyan-300">₹{(item.price * quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <PaymentSummary totalAmount={totalAmount} />

                        <div>
                            <label className="block mb-2 text-cyan-200">Payment Method</label>
                            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} required
                                className="w-full bg-[#283646] text-white rounded-xl px-4 py-3">
                                <option value="" disabled>Select Payment Method</option>
                                <option value="cod">Cash on Delivery</option>
                                <option value="online">Online Payment</option>
                            </select>
                        </div>

                        {error && <p className="text-red-400 mt-4">{error}</p>}

                        <button type="submit" disabled={loading}
                            className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 py-4 rounded-xl font-bold flex justify-center items-center text-white">
                            <FaLock className="mr-2" /> {loading ? 'Processing...' : 'Complete Order'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const Input = ({ label, name, type = 'text', value, onChange }) => (
    <div>
        <label className="block mb-1 font-semibold text-cyan-200">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required
            className="w-full bg-[#283646] text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 border-0 hover:border-1 hover:border-cyan-500 transition duration-200"
        />
    </div>
);

const PaymentSummary = ({ totalAmount }) => {
    const subtotal = Number(totalAmount.toFixed(2));
    const tax = Number((subtotal * 0.05).toFixed(2));
    const total = Number((subtotal + tax).toFixed(2));

    return (
        <div className="space-y-2 text-cyan-100">
            <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
                <span>Tax (5%):</span>
                <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold border-t border-cyan-600 pt-2 text-cyan-200 ">
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
            </div>
        </div>
    )
}

export default Checkout