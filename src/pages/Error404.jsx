import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="mb-4">Page Not Found</p>
      <Link to="/" className="underline text-blue-600">
        Back to Home
      </Link>
    </div>
  );
}
