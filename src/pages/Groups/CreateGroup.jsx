import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

export default function CreateGroup() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newGroup = {
      name: form.name.value,
      category: form.category.value,
      description: form.description.value,
      location: form.location.value || "Dhaka",
      maxMembers: +form.maxMembers.value || 30,
      startDate: form.startDate.value,
      image: form.image.value,
      userName: user.displayName,
      userEmail: user.email,
      isActive: true, // Groups are active by default
    };

    fetch(import.meta.env.VITE_API_BASE + "/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGroup),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Group created");
        navigate("/myGroups");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Create Group
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Group Name"
          className="input input-bordered w-full"
          required
        />

        <select
          name="category"
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Hobby Category</option>
          <option>Photography</option>
          <option>Cooking</option>
          <option>Chess</option>
          <option>Cycling</option>
          <option>DIY Craft</option>
        </select>

        <textarea
          name="description"
          className="textarea textarea-bordered w-full"
          placeholder="Description"
          required
        ></textarea>

        <input
          type="text"
          name="location"
          placeholder="Meeting Location"
          defaultValue="Dhaka"
          className="input input-bordered w-full"
          required
        />

        <input
          type="number"
          name="maxMembers"
          placeholder="Max Members"
          defaultValue="30"
          className="input input-bordered w-full"
          required
        />

        <input
          type="date"
          name="startDate"
          className="input input-bordered w-full"
          defaultValue="2025-07-31"
          required
        />

        <input
          type="url"
          name="image"
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />

        {/* readonly user */}
        <input
          type="text"
          defaultValue={user.displayName}
          readOnly
          className="input input-bordered w-full"
        />
        <input
          type="email"
          defaultValue={user.email}
          readOnly
          className="input input-bordered w-full"
        />

        <button className="btn btn-primary w-full">Submit</button>
      </form>
    </div>
  );
}
