import { Link, Outlet } from "react-router"
import Home from "../pages/Home";

const Layout = () => {
    return (
        <div>
            <div className="header px-8 py-4 bg-black text-white flex justify-between items-center">
                <p className="font-bold text-3xl">ContactR</p>
                <nav className="w-2/5 font-bold">
                    <Link to="/">Home</Link>
                </nav>
            </div>
            <div className="pages mb-12 px-12 py-8 flex justify-center">
                <Outlet/>
            </div>
            <div className="footer bg-black flex justify-center px-8 py-4 text-white fixed bottom-0 right-0 left-0">
                <p>ContactR &copy;2025</p>
            </div>
        </div>
    )
}

export default Layout;