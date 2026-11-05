import { Link } from "react-router";

export default function Navbar({ num }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Main Page</Link>
        </li>
        <li>
          <Link
            to={{
              pathname: "./Cart",
            }}
          >
            Shopping Cart
          </Link>{" "}
          ({num})
        </li>
      </ul>
    </nav>
  );
}
