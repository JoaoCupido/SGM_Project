import Header from "./header"
import Footer from "./footer"
import {ScrollToTop} from "react-simple-scroll-up";

const Layout = ({ children }) => {
    return (
        <div className="content">
            <div className='App'>
                <ScrollToTop bgColor={"rgb(56 229 77 / 75%)"} strokeFillColor={"rgb(253 255 0 / 50%)"} strokeEmptyColor={"rgb(120 122 0 / 85%)"}/>
            </div>
            <Header/>
                {children}
            <Footer />
        </div>
    );
}

export default Layout;