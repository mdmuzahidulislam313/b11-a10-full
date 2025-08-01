import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const name  = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const pass  = form.password.value;

    // simple validations
    const regexUpper = /[A-Z]/;
    const regexLower = /[a-z]/;
    if (!regexUpper.test(pass) || !regexLower.test(pass) || pass.length < 6) {
      toast.error(
        "Password must be 6+ chars, with upper & lower case letters"
      );
      return;
    }

    register(name, photo, email, pass)
      .then(() => {
        toast.success("Account created");
        navigate("/login");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="border p-8 rounded w-full max-w-sm space-y-3"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="url"
          name="photo"
          placeholder="Photo URL"
          className="input input-bordered w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full"
          required
        />

        <button className="btn btn-primary w-full">Register</button>

        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
