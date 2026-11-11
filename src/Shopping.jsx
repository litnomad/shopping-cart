import { useEffect, useState } from "react";

export default function Shop({ handleSubmit }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(
          data.slice(0, 5).map((item) => {
            return {
              id: item.id,
              title: item.title,
              image: item.image,
              price: item.price,
            };
          }),
        );
      })
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return (
      <p>Page is currently experiencing an issue fetching from the server!</p>
    );
  }

  return (
    <div>
      <h1>Shopping page!</h1>
      <div>
        {products.map((product) => {
          return (
            <div key={product.id}>
              <h2>{product.title}</h2>
              <img src={product.image} />
              <p>{product.price}</p>
              <form action="" onSubmit={handleSubmit}>
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
                <input type="hidden" name="id" value={product.id} />
                <input type="hidden" name="product" value={product.title} />
                <input type="hidden" name="image" value={product.image} />
                <input type="hidden" name="price" value={product.price} />
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
