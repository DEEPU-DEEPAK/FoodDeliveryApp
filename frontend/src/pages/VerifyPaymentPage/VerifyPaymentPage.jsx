import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext/CartContext"
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const VerifyPaymentPage = () => {

    const { clearCart } = useCart();
    const { search } = useLocation();
    const navigate = useNavigate();
    const [statusMsg, setStatusMsg] = useState("Verifying payment...");

    const token = localStorage.getItem('authToken');
    const authHeaders = useMemo(() => (
        token ? { Authorization: `Bearer ${token}` } : {}
    ), [token]);


    useEffect(() => {
        const params = new URLSearchParams(search);
        const success = params.get('success');
        const session_id = params.get('session_id');

        if (success !== 'true' || !session_id) {
            if (success === 'false') {
                navigate('/checkout', {replace: true });
                return;
            }
            setStatusMsg("Invalid payment details. Please try again.");
            return;
        }
        axios.get("http://localhost:4000/api/orders/confirm", {
            params: { session_id },
            headers: authHeaders
        })
        .then(() => {
            clearCart();
            navigate('/myorders', { replace: true });
        })
        .catch(err => {
            console.error('Error confirming payment:', err);
            setStatusMsg("Failed to verify payment. Please try again.");
            clearCart(false);
        })
    }, [search, authHeaders, clearCart, navigate]);

        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <p>{statusMsg}</p>
            </div>
        )
    }
export default VerifyPaymentPage