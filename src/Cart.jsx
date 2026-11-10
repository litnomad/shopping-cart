import { useState } from "react";

export default function Cart({ items, handleChange }) {
  const [onEdit, setEdit] = useState(false);

  return (
    <div className="container">
      <h1>Cart</h1>
      {items?.map((item) => {
        return (
          <div key={item.product} className="card">
            <div className="product">{item.product}</div>
            {!onEdit && <div className="quantity">{item.quantity}</div>}
            {onEdit && (
              <form
                method="post"
                onSubmit={(e) => {
                  handleChange(e);
                  setEdit(false);
                }}
              >
                <input
                  type="number"
                  name="quantity"
                  defaultValue={item.quantity}
                  placeholder={item.quantity}
                />
                <button type="submit">Confirm</button>
                <input type="hidden" name="product" value={item.product} />
              </form>
            )}
          </div>
        );
      })}
      {!onEdit && <button onClick={() => setEdit(true)}>Edit</button>}
    </div>
  );
}
