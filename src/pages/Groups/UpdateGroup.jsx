import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { AuthContext } from "../../contexts/AuthProvider";

export default function UpdateGroup() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_BASE + `/groups/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGroup(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner />;
  if (!group) return <p>No group found</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const updated = {
      name: form.name.value,
      category: form.category.value,
      description: form.description.value,
      location: form.location.value,
      maxMembers: +form.maxMembers.value,
      startDate: form.startDate.value,
      image: form.image.value,
      isActive: form.isActive.checked,
    };

    fetch(import.meta.env.VITE_API_BASE + `/groups/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then(() => {
        toast.success("Group updated");
        navigate("/myGroups");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Update Group
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          defaultValue={group.name}
          className="input input-bordered w-full"
          required
        />

        <select
          name="category"
          defaultValue={group.category}
          className="select select-bordered w-full"
          required
        >
          <option>Photography</option>
          <option>Cooking</option>
          <option>Chess</option>
          <option>Cycling</option>
          <option>DIY Craft</option>
        </select>

        <textarea
          name="description"
          defaultValue={group.description}
          className="textarea textarea-bordered w-full"
          required
        ></textarea>

        <input
          type="text"
          name="location"
          defaultValue={group.location}
          className="input input-bordered w-full"
          required
        />

        <input
          type="number"
          name="maxMembers"
          defaultValue={group.maxMembers}
          className="input input-bordered w-full"
          required
        />

        <input
          type="date"
          name="startDate"
          defaultValue={group.startDate.split("T")[0]}
          className="input input-bordered w-full"
          required
        />

        <input
          type="url"
          name="image"
          defaultValue={group.image}
          className="input input-bordered w-full"
          required
        />

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

        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            name="isActive"
            id="isActive"
            className="checkbox"
            defaultChecked={group.isActive !== false}
          />
          <label htmlFor="isActive" className="cursor-pointer">
            Group is active
          </label>
        </div>

        <button className="btn btn-primary w-full">Save</button>
      </form>
    </div>
  );
}
