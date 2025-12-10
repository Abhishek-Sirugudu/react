import Product from "./Product.jsx";
import "./Product.css"
function ProductDisplay(){
    return (
        <>
        <Product name = "Mobile Phone" price = {75000} />
        <Product name = "Playstation 5" price = {50000} />
        <Product name = "Sony" />
        </>
    );
}
export default ProductDisplay;