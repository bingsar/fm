import Navigation from "./Navigation";
import AddPropertyBar from "./AddPropertyBar";
import OrderPopup from "../components/OrderPopup";

export default function Header() {

    return (
        <>
            <header>
                <OrderPopup />
                <Navigation />
                <AddPropertyBar />
            </header>
        </>
    )
}