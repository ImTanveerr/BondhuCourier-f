import { useState } from "react";
import {
  useGetAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "@/redux/apis/admin.api";
import { IUser, UserStatus } from "@/types/user.types";

export default function AdminUsers() {
  const { data, isLoading, isError } = useGetAllUsersQuery();
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<IUser>>({});

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Failed to fetch users</p>;
  if (!data || !data.data || data.data.length === 0) return <p>No users found</p>;

  const handleAction = async (action: "block" | "unblock" | "delete", id: string) => {
    try {
      if (action === "block") await blockUser(id).unwrap();
      if (action === "unblock") await unblockUser(id).unwrap();
      if (action === "delete") await deleteUser(id).unwrap();
      alert(`User ${action}ed successfully`);
    } catch (err: any) {
      alert(err?.data?.message || `Failed to ${action} user`);
    }
  };

  const handleUpdate = async (userId: string) => {
    try {
      await updateUser({ id: userId, body: formData }).unwrap();
      alert("User updated successfully");
      setEditingUserId(null);
      setFormData({});
    } catch (err: any) {
      alert(err?.data?.message || "Failed to update user");
    }
  };

  const handleCancel = () => {
    setEditingUserId(null);
    setFormData({});
  };

  const handleInputChange = (key: keyof IUser, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Users ({data.meta.total})</h1>

      {/* Large screen table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((user) => (
              <tr key={user._id} className="hover:bg-muted dark:hover:bg-muted-dark">
                <td className="border px-4 py-2">
                  {editingUserId === user._id ? (
                    <input
                      type="text"
                      value={formData.name ?? user.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingUserId === user._id ? (
                    <input
                      type="email"
                      value={formData.email ?? user.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingUserId === user._id ? (
                    <input
                      type="text"
                      value={formData.phone ?? user.phone ?? ""}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    user.phone
                  )}
                </td>
                <td className="border px-4 py-2">{user.Status}</td>
                <td className="border px-4 py-2 flex flex-wrap gap-2">
                  {user.Status === UserStatus.ACTIVE ? (
                    <button
                      onClick={() => handleAction("block", user._id!)}
                      className="px-2 py-1 bg-yellow-600 text-white rounded"
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAction("unblock", user._id!)}
                      className="px-2 py-1 bg-green-600 text-white rounded"
                    >
                      Unblock
                    </button>
                  )}

                  {editingUserId === user._id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(user._id!)}
                        className="px-2 py-1 bg-blue-600 text-white rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-2 py-1 bg-gray-400 text-white rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingUserId(user._id!);
                        setFormData({
                          name: user.name,
                          email: user.email,
                          phone: user.phone,
                        });
                      }}
                      className="px-2 py-1 bg-gray-600 text-white rounded"
                    >
                      Update
                    </button>
                  )}

                  <button
                    onClick={() => handleAction("delete", user._id!)}
                    className="px-2 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Small screen cards */}
      <div className="md:hidden flex flex-col gap-4">
        {data.data.map((user) => (
          <div key={user._id} className="border p-4 rounded shadow-sm">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Name:</span>
              {editingUserId === user._id ? (
                <input
                  type="text"
                  value={formData.name ?? user.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="border px-2 py-1 rounded w-2/3"
                />
              ) : (
                <span>{user.name}</span>
              )}
            </div>

            <div className="flex justify-between mb-2">
              <span className="font-semibold">Email:</span>
              {editingUserId === user._id ? (
                <input
                  type="email"
                  value={formData.email ?? user.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border px-2 py-1 rounded w-2/3"
                />
              ) : (
                <span>{user.email}</span>
              )}
            </div>

            <div className="flex justify-between mb-2">
              <span className="font-semibold">Phone:</span>
              {editingUserId === user._id ? (
                <input
                  type="text"
                  value={formData.phone ?? user.phone ?? ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="border px-2 py-1 rounded w-2/3"
                />
              ) : (
                <span>{user.phone}</span>
              )}
            </div>

            <div className="flex justify-between mb-2">
              <span className="font-semibold">Status:</span>
              <span>{user.Status}</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {user.Status === UserStatus.ACTIVE ? (
                <button
                  onClick={() => handleAction("block", user._id!)}
                  className="px-2 py-1 bg-yellow-600 text-white rounded flex-1"
                >
                  Block
                </button>
              ) : (
                <button
                  onClick={() => handleAction("unblock", user._id!)}
                  className="px-2 py-1 bg-green-600 text-white rounded flex-1"
                >
                  Unblock
                </button>
              )}

              {editingUserId === user._id ? (
                <>
                  <button
                    onClick={() => handleUpdate(user._id!)}
                    className="px-2 py-1 bg-blue-600 text-white rounded flex-1"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-2 py-1 bg-gray-400 text-white rounded flex-1"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setEditingUserId(user._id!);
                    setFormData({
                      name: user.name,
                      email: user.email,
                      phone: user.phone,
                    });
                  }}
                  className="px-2 py-1 bg-gray-600 text-white rounded flex-1"
                >
                  Update
                </button>
              )}

              <button
                onClick={() => handleAction("delete", user._id!)}
                className="px-2 py-1 bg-red-600 text-white rounded flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
