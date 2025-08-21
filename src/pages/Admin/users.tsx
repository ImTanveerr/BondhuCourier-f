import {
  useGetAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useDeleteUserMutation,
} from "@/redux/apis/admin.api";

export default function AdminUsers() {
  const { data, isLoading, isError } = useGetAllUsersQuery();
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Failed to fetch users</p>;
  if (!data || data.data.length === 0) return <p>No users found</p>;

  const handleAction = async (action: "block" | "unblock" | "delete", id: string) => {
    try {
      if (action === "block") await blockUser(id).unwrap();
      if (action === "unblock") await unblockUser(id).unwrap();
      if (action === "unblock") await unblockUser(id).unwrap();
      if (action === "delete") await deleteUser(id).unwrap();
      alert(`User ${action}ed successfully`);
    } catch (err: any) {
      alert(err?.data?.message || `Failed to ${action} user`);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-3">All Users ({data.meta.total})</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.Status}</td>
              <td className="border px-4 py-2 space-x-2">
                {user.Status === "ACTIVE" ? (
                  <button onClick={() => handleAction("block", user._id ?? "")} className="px-2 py-1 bg-yellow-600 text-white rounded">
                    Block
                  </button>
                ) : (
                  <button onClick={() => handleAction("unblock", user._id ?? "")} className="px-2 py-1 bg-green-600 text-white rounded">
                    Unblock
                  </button>
                )}
                <button onClick={() => handleAction("delete", user._id ?? "")} className="px-2 py-1 bg-red-600 text-white rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
