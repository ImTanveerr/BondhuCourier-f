// import { useState } from "react";
// import { useUpdateUserMutation } from "@/redux/apis/admin.api";
// import { IUser, Role } from "@/types/user.types";

// interface UpdateUserProps {
//   user: IUser;
//   onClose: () => void;
// }

// export default function UpdateUser({ user, onClose }: UpdateUserProps) {
//   const [updateUser] = useUpdateUserMutation();

//   const [formState, setFormState] = useState({
//     name: user?.name ?? "",
//     email: user?.email ?? "",
//     phone: user?.phone ?? "",
//     role: (user?.role as Role) ?? Role.SENDER,
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormState((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const payload: Partial<IUser> = {
//       name: formState.name,
//       email: formState.email,
//       phone: formState.phone,
//       role: formState.role as Role,
//     };

//     try {
//       await updateUser({ id: user._id!, body: payload }).unwrap();
//       onClose();
//       alert("User updated successfully");
//     } catch (error: any) {
//       alert(error?.data?.message || "Failed to update user");
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//       <div className="bg-white dark:bg-gray-800 rounded p-6 w-full max-w-sm">
//         <h2 className="text-xl font-semibold mb-4">Update User</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//           <input
//             type="text"
//             name="name"
//             value={formState.name}
//             onChange={handleChange}
//             placeholder="Name"
//             className="border rounded p-2 w-full"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             value={formState.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="border rounded p-2 w-full"
//             required
//           />
//           <input
//             type="text"
//             name="phone"
//             value={formState.phone}
//             onChange={handleChange}
//             placeholder="Phone"
//             className="border rounded p-2 w-full"
//           />
//           <select
//             name="role"
//             value={formState.role}
//             onChange={handleChange}
//             className="border rounded p-2 w-full"
//           >
//             {Object.values(Role).map((role) => (
//               <option key={role} value={role}>
//                 {role}
//               </option>
//             ))}
//           </select>
//           <div className="flex justify-end gap-2 mt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-400 rounded text-white"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 rounded text-white"
//             >
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
