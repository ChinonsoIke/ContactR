import { Outlet } from "react-router"

const Layout = () => {
    return (
        <div>
            <div className="header px-8 py-4 bg-black">
                <p className="font-bold text-3xl text-white">ContactR</p>
            </div>
            <div className="pages px-12 py-8 flex justify-center">
                <Outlet/>
            </div>
            <div className="footer bg-black flex justify-center px-8 py-4 text-white fixed bottom-0 right-0 left-0">
                <p>ContactR &copy;2025</p>
            </div>
        </div>
    )
}

export default Layout;