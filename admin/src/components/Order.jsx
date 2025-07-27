import { useEffect, useState } from 'react';
import axios from "axios";
import { iconMap, paymentMethodDetails, statusStyles } from '../assets/dummyadmin';
import { FiBox, FiUser } from 'react-icons/fi';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          'https://fooddeliveryapp-backend-d6ry.onrender.com/api/orders/getall',
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );

        const formatted = response.data.map(order => ({
          ...order,
          address: order.address ?? order.shippingAddress?.address ?? '',
          city: order.city ?? order.shippingAddress?.city ?? '',
          zipCode: order.zipCode ?? order.shippingAddress?.zipCode ?? '',
          phone: order.phone ?? '',
          items: order.items?.map(e => ({ _id: e._id, item: e.item, quantity: e.quantity })) || [],
          createdAt: new Date(order.createdAt).toLocaleDateString('en-IN', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
          }),
        }));

        setOrders(formatted);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`https://fooddeliveryapp-backend-d6ry.onrender.com/api/orders/getAll/${orderId}`, {
        status: newStatus
      });
      setOrders(orders =>
        orders.map(o =>
          o._id === orderId ? { ...o, status: newStatus } : o
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#112436] to-[#123a4d] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="text-cyan-300 text-xl">Loading Orders...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#112436] to-[#123a4d] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="text-red-400 text-xl">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#112436] to-[#123a4d] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="bg-[#1b2e45]/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-cyan-400/20">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent text-center">
            Order Management
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#13283d]/60">
                <tr>
                  {[
                    'Order ID',
                    'Customer',
                    'Address',
                    'Items',
                    'Total Items',
                    'Price',
                    'Payment',
                    'Status'
                  ].map((h) => (
                    <th key={h} className={`p-4 text-left text-cyan-400 ${h === 'Total Items' ? 'text-center' : ''}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {orders.map(order => {
                  const totalItems = order.items.reduce((s, i) => s + i.quantity, 0);
                  const totalPrice = order.total ?? order.items.reduce((s, i) => s + i.item.price * i.quantity, 0);
                  const payMethod = paymentMethodDetails[order.paymentMethod?.toLowerCase()] || paymentMethodDetails.default;
                  const payStatusStyle = statusStyles[order.paymentStatus] || statusStyles.processing;
                  const stat = statusStyles[order.status] || statusStyles.processing;

                  return (
                    <tr key={order._id} className="border-b border-cyan-400/20 hover:bg-[#1a344e]/30 transition-colors group">
                      <td className="p-4 font-mono text-sm text-cyan-100">
                        #{order._id.slice(-8)}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FiUser className='text-cyan-400' />
                          <div>
                            <p className="text-cyan-100">{order.user?.name || `${order.firstName} ${order.lastName}`}</p>
                            <p className="text-sm text-cyan-400/60">{order.user?.phone || order.phone}</p>
                            <p className="text-sm text-cyan-400/60">{order.user?.email || order.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="text-cyan-100/80 text-sm max-w-[200px]">
                          {order.address}, {order.city}, {order.zipCode}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="space-y-1 max-h-52 overflow-auto">
                          {order.items.map((itm, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-2 rounded-lg">
                              <img src={`https://fooddeliveryapp-backend-d6ry.onrender.com${itm.item.imageUrl}`} alt={itm.item.name}
                                className="w-10 h-10 object-cover rounded-lg" />
                              <div className="flex-1">
                                <span className="text-cyan-100/80 text-sm block truncate">
                                  {itm.item.name}
                                </span>
                                <div className="flex items-center gap-2 text-xs text-cyan-400/60">
                                  <span>₹{itm.item.price.toFixed(2)}</span>
                                  <span>&bull;</span>
                                  <span>x{itm.quantity}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <FiBox className='text-cyan-400' />
                          <span className='text-cyan-300 text-lg'>{totalItems}</span>
                        </div>
                      </td>

                      <td className="p-4 text-cyan-300 text-lg">
                        ₹{totalPrice.toFixed(2)}
                      </td>

                      <td className="p-4">
                        <div className="flex flex-col gap-2">
                          <div className={`${payMethod.class} px-3 py-1.5 rounded-lg border text-sm`}>
                            {payMethod.label}
                          </div>
                          <div className={`${payStatusStyle.color} flex items-center gap-2 text-sm`}>
                            {iconMap[payStatusStyle.icon]}
                            <span>{payStatusStyle.label}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={`${stat.color} text-xl`}>
                            {iconMap[stat.icon]}
                          </span>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className={`px-4 py-2 rounded-lg ${stat.bg} ${stat.color} border border-cyan-500/20 text-sm cursor-pointer`}
                          >
                            {Object.entries(statusStyles)
                              .filter(([k]) => k !== 'succeeded')
                              .map(([key, sty]) => (
                                <option value={key} key={key} className={`${sty.bg} ${sty.color}`}>
                                  {sty.label}
                                </option>
                              ))}
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="text-center py-12 text-cyan-100/60 text-xl">
              No Order Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
