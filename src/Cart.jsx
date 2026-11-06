export default function Cart({ items }) {
  return (
    <div>
      <h1>Cart</h1>
      {items?.map((item) => {
        console.log(item.product);
        console.log(item.quantity);
        return (
          <div key={item.product}>
            <p>
              {item.product} {item.quantity}
            </p>
          </div>
        );
      })}
    </div>
  );
}
