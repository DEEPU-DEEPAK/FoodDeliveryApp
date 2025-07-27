import axios from "axios"
import { useEffect, useState } from "react"
import { FiHeart, FiStar, FiTrash2 } from "react-icons/fi"

const List = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await axios.get('https://fooddeliveryapp-backend-d6ry.onrender.com/api/items')
        setItems(data)
      } catch (err) {
        console.error("Error Fetching Item:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchItem()
  }, [])

  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to DELETE this item?")) return
    try {
      await axios.delete(`https://fooddeliveryapp-backend-d6ry.onrender.com/api/items/${itemId}`)
      setItems(prev => prev.filter(item => item._id !== itemId))
      console.log('Deleted item Id: ', itemId)
    } catch (err) {
      console.error("Error deleting item", err)
    }
  }

  const renderStar = (rating) =>
    [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`text-xl ${i < rating ? 'text-cyan-400 fill-current' : 'text-cyan-100/30'}`}
      />
    ))

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e] text-cyan-100 px-4">
        Loading Menu...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#111d2f] to-[#12293c] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#16243b]/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-cyan-400/20">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent text-center">
            Manage Items In Menu
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0f1b2d]/60">
                <tr>
                  <th className="p-4 text-left text-cyan-400">Image</th>
                  <th className="p-4 text-left text-cyan-400">Name</th>
                  <th className="p-4 text-left text-cyan-400">Category</th>
                  <th className="p-4 text-left text-cyan-400">Price</th>
                  <th className="p-4 text-left text-cyan-400">Rating</th>
                  <th className="p-4 text-left text-cyan-400">Hearts</th>
                  <th className="p-4 text-center text-cyan-400">Delete</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id} className="border-b border-cyan-400/20 hover:bg-[#1a2e4d]/30 transition-colors">
                    <td className="p-4">
                      <img src={item.imageUrl} alt={item.name} className="w-40 h-24 object-contain rounded-lg" />
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="text-cyan-100 font-medium text-lg">{item.name}</p>
                        <p className="text-sm text-cyan-100/60">{item.description}</p>
                      </div>
                    </td>
                    <td className="p-4 text-cyan-100/80">{item.category}</td>
                    <td className="p-4 text-cyan-300 font-medium">{item.price}</td>
                    <td className="p-4">
                      <div className="flex gap-1">{renderStar(item.rating)}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <FiHeart className="text-xl" />
                        <span>{item.hearts}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-cyan-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-900/20"
                      >
                        <FiTrash2 className="text-2xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {items.length === 0 && (
            <div className="text-center py-12 text-cyan-100/60 text-xl">
              No Item Found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default List
