import AddItems from "./components/AddItems"
import List from "./components/List"
import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import Order from "./components/Order"

const App = () => {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<AddItems />} />
        <Route path="/list" element={<List />} />
        <Route path="/orders" element={<Order />} />
      </Routes>
    </>
  )
}
export default App