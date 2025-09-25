import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <Link to="/">Return Home</Link>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
