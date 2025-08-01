import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { AuthContext } from "../../contexts/AuthProvider";

export default function MyGroups() {
  const { user } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch(
      import.meta.env.VITE_API_BASE + `/myGroups?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setGroups(data);
        setLoading(false);
      });
  };

  useEffect(fetchData, [user]);

  const handleDelete = (id) => {
    if (!confirm("Delete this group?")) return;
    fetch(import.meta.env.VITE_API_BASE + `/groups/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        toast.success("Deleted");
        fetchData();
      })
      .catch((err) => toast.error(err.message));
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Groups
      </h2>

      {groups.length === 0 ? (
        <div className="text-center py-8">
          <p className="mb-6 text-gray-600 dark:text-gray-400">You haven't created any groups yet.</p>
          <div className="flex flex-col items-center gap-4">
            <Link
              to="/createGroup"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              Create Your First Group
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <Link
              to="/createGroup"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              Create New Group
            </Link>
          </div>

          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
            <table className="table w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Group Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {groups.map((g) => (
                  <tr key={g._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/group/${g._id}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                        {g.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(g.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {g.isActive === false ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Inactive</span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/updateGroup/${g._id}`}
                          className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded text-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(g._id)}
                          className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
