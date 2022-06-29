/*import "tailwindcss/tailwind.css"*/
import '../styles/globals.css'
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5001";

function MyApp({Component, pageProps}) {
    return (
        <div className="grid h-screen font-serif bg-gray-900 text-white place-content-center">
            <div>
                <Component {...pageProps} />
            </div>
        </div>
    )
}

export default MyApp