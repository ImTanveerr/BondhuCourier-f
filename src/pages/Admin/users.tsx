import { useState } from "react";
import {
  useGetAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useDeleteUserMutation,
} from "@/redux/apis/admin.api";
import { UserStatus } from "@/types/user.types";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function AdminUsers() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;

  // Hooks must always be at the top
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [deleteUser] = useDeleteUserMutation();


  const { data, isLoading, isError, refetch } = useGetAllUsersQuery({ page: currentPage, limit });

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Failed to fetch users</p>;
  if (!data || !data.data || data.data.length === 0) return <p>No users found</p>;

  const total = data.meta.total;
  const totalPage = Math.max(1, Math.ceil(total / limit));
  const start = total ? (currentPage - 1) * limit + 1 : 0;
  const end = total ? Math.min(currentPage * limit, total) : 0;

  const handleAction = async (action: "block" | "unblock" | "delete", id: string) => {
    try {
      if (action === "block") await blockUser(id).unwrap();
      if (action === "unblock") await unblockUser(id).unwrap();
      if (action === "delete") await deleteUser(id).unwrap();
      toast.success(`User ${action}ed successfully`);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || `Failed to ${action} user`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">All Users ({total})</h1>

      {/* Large screen table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Phone</th>
              <th className="border px-4 py-2 text-left">Role</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phone || "-"}</td>
                <td className="border px-4 py-2">{user.role || "User"}</td>
                <td className="border px-4 py-2">{user.Status}</td>
                <td className="border px-4 py-2 flex flex-wrap gap-2">
                  {user.Status === UserStatus.ACTIVE ? (
                    <button
                      onClick={() => handleAction("block", user._id!)}
                      className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAction("unblock", user._id!)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Unblock
                    </button>
                  )}
                  <button
                    onClick={() => handleAction("delete", user._id!)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
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
          <div key={user._id} className="border p-4 rounded shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Name:</span>
              <span>{user.name}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Phone:</span>
              <span>{user.phone || "-"}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Role:</span>
              <span>{user.role || "User"}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Status:</span>
              <span>{user.Status}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {user.Status === UserStatus.ACTIVE ? (
                <button
                  onClick={() => handleAction("block", user._id!)}
                  className="flex-1 px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
                >
                  Block
                </button>
              ) : (
                <button
                  onClick={() => handleAction("unblock", user._id!)}
                  className="flex-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Unblock
                </button>
              )}
              <button
                onClick={() => handleAction("delete", user._id!)}
                className="flex-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPage > 1 && (
        <div className="w-full bottom-0 left-0 p-4 flex flex-col items-center bg-transparent">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: totalPage }, (_, index) => index + 1).map((page) => (
                <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                  <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPage))}
                  className={currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <p className="text-sm mt-2">
            Showing {start}-{end} of {total}
          </p>
        </div>
      )}
    </div>
  );
}
