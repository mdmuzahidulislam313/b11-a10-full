import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { AuthContext } from "../../contexts/AuthProvider";

export default function GroupDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joinedUsers, setJoinedUsers] = useState([]);
  const [joinedCount, setJoinedCount] = useState(0);
  const [hasJoined, setHasJoined] = useState(false);

  // Fetch group details
  useEffect(() => {
    fetch(import.meta.env.VITE_API_BASE + `/groups/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGroup(data);
        setLoading(false);
      });
  }, [id]);

  // Fetch joined users
  useEffect(() => {
    if (!group) return;

    // Fetch the list of users who joined this group
    fetch(import.meta.env.VITE_API_BASE + `/joinedGroups?groupId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJoinedUsers(data);
        setJoinedCount(data.length);

        // Check if current user has already joined
        if (user) {
          const alreadyJoined = data.some(item => item.email === user.email);
          setHasJoined(alreadyJoined);
        }
      })
      .catch(error => {
        console.error("Error fetching joined users:", error);
        // Initialize with empty array if endpoint doesn't exist yet
        setJoinedUsers([]);
        setJoinedCount(0);
      });
  }, [group, id, user]);

  if (loading) return <Spinner />;
  if (!group) return <p>No group found</p>;

  // Only check if group is explicitly marked as inactive
  const isInactive = group.isActive === false;

  const handleJoin = () => {
    fetch(import.meta.env.VITE_API_BASE + "/joinGroup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ groupId: id, email: user.email }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.message || "Failed to join group");
          });
        }
        return res.json();
      })
      .then(() => {
        toast.success("Joined group!");
        // Update the joined status immediately
        setHasJoined(true);
        setJoinedCount(prev => prev + 1);

        // Add the current user to joinedUsers
        setJoinedUsers(prev => [...prev, {
          email: user.email,
          joinedAt: new Date().toISOString()
        }]);
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <img
        src={group.image}
        alt={group.name}
        className="w-full h-60 object-cover rounded mb-6"
      />
      <h2 className="text-3xl font-bold mb-2">{group.name}</h2>
      <p className="text-gray-600 mb-4">{group.category}</p>
      <p>{group.description}</p>
      <p className="mt-3">
        Meet at: <strong>{group.location}</strong>
      </p>
      <p>
        Max Members: <strong>{group.maxMembers}</strong>
      </p>
      <p>
        Starts:{" "}
        <strong>
          {new Date(group.startDate).toLocaleDateString()}
        </strong>
      </p>

      {/* Membership information */}
      <div className="bg-gray-100 dark:bg-gray-700 p-4 mt-4 rounded">
        <h3 className="font-bold mb-2">Membership Information</h3>
        <p>
          Current Members: <strong>{joinedCount}</strong> / {group.maxMembers}
        </p>
        <p>
          Available Slots: <strong>{Math.max(0, group.maxMembers - joinedCount)}</strong>
        </p>
      </div>

      {isInactive ? (
        <p className="mt-4 text-red-600 font-semibold">
          Group is no longer active
        </p>
      ) : hasJoined ? (
        <p className="mt-4 text-green-600 font-semibold">
          You have already joined this group
        </p>
      ) : joinedCount >= group.maxMembers ? (
        <p className="mt-4 text-red-600 font-semibold">
          This group is full
        </p>
      ) : (
        <button
          onClick={handleJoin}
          className="btn btn-primary mt-4"
        >
          Join Group
        </button>
      )}

      {/* Members list */}
      {joinedUsers.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Group Members</h3>
          <ul className="divide-y">
            {joinedUsers.map((joinedUser, index) => (
              <li key={index} className="py-2">
                <div className="flex items-center">
                  <p>{joinedUser.email}</p>
                  <span className="text-gray-500 text-sm ml-2">
                    (Joined: {new Date(joinedUser.joinedAt).toLocaleDateString()})
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
