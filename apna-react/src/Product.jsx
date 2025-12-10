function Product({name,price = 100}) {
    return (
        <>
            <div className="Product">
                <h1>{name}</h1>
                <p>{price}</p>
            </div>
        </>
    );
}
export default Product;