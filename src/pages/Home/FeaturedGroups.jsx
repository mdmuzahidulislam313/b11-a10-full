import { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function FeaturedGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_BASE + "/groups")
      .then((res) => res.json())
      .then((data) => {
        setGroups(data.slice(0, 6));
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h3 className="text-3xl font-bold mb-4">Featured Groups</h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover our most popular hobby groups and find the perfect community to join
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {groups.map((group) => (
          <div
            key={group._id}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={group.image}
                alt={group.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                {group.category}
              </div>
            </div>

            <div className="p-6">
              <h4 className="text-xl font-bold mb-2 line-clamp-1">{group.name}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {group.description || "Join this exciting group to explore your interests with others."}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <FaUsers className="text-indigo-500" />
                  <span>{group.maxMembers} max</span>
                </div>

                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="text-indigo-500" />
                  <span>{new Date(group.startDate).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-indigo-500" />
                  <span className="truncate">{group.location}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  By {group.userName || "HobbyHub Member"}
                </div>
                <Link
                  to={`/group/${group._id}`}
                  className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium rounded-lg transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/groups"
          className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
        >
          View All Groups
        </Link>
      </div>
    </section>
  );
}
