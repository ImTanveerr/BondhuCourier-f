import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <div>
      <h1>Youre not authorized</h1>
      <Link to="/"></Link>
    </div>
  );
}
