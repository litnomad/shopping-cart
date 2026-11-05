export default function Shop({ handleCart }) {
  return (
    <div>
      <h1>Shopping page!</h1>
      <div>
        <div>
          <h2>Product</h2>
          <div></div>
          <form action="" onSubmit={handleCart}>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              step="1"
              id="quantity"
              name="quantity"
              min="0"
              max="50"
            />
            <button type="submit">Add to Cart</button>
          </form>
        </div>
        <div>
          <h2>Product</h2>
          <div></div>
          <form action="" onSubmit={handleCart}>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              step="1"
              id="quantity"
              name="quantity"
              min="0"
              max="50"
            />
            <button type="submit">Add to Cart</button>
          </form>
        </div>
      </div>
    </div>
  );
}
