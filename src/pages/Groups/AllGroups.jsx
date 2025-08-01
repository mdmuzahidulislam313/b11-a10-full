import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function AllGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_BASE + "/groups")
      .then((res) => res.json())
      .then((data) => {
        setGroups(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Groups</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {groups.map((g) => (
          <div
            key={g._id}
            className="border rounded hover:shadow-lg transition"
          >
            <img
              src={g.image}
              alt={g.name}
              className="h-40 w-full object-cover rounded-t"
            />
            <div className="p-4 space-y-2">
              <h4 className="font-semibold">{g.name}</h4>
              <p className="text-sm text-gray-600">{g.category}</p>
              <p className="text-sm">
                Start: {new Date(g.startDate).toLocaleDateString()}
              </p>
              <Link
                to={`/group/${g._id}`}
                className="text-blue-600 underline"
              >
                See More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
