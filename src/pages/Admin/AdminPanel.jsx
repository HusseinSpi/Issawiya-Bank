import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userData, AddUser, DeleteUser } from "../../api/APIUsers";
import { ChangeDetail } from "../../hooks/ChangeDetail";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await userData();
    setUsers(data);
  };

  const handleDeleteUser = async (email) => {
    try {
      await DeleteUser(email);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      money: 0,
      credit: 5000,
      isAdmin: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      phoneNumber: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Password"),
      money: Yup.number().required("Required"),
      credit: Yup.number().required("Required"),
      isAdmin: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      try {
        if (editingUser) {
          await ChangeDetail(
            editingUser.email,
            values.firstName,
            values.lastName,
            values.phoneNumber,
            values.email,
            values.password,
            values.money,
            values.credit,
            values.isAdmin
          );
          toast.success("User updated successfully");
        } else {
          await AddUser(
            values.firstName,
            values.lastName,
            values.phoneNumber,
            values.email,
            values.password,
            values.money,
            values.credit,
            values.isAdmin
          );
          toast.success("User added successfully");
        }
        fetchUsers();
        setEditingUser(null);
        formik.resetForm();
      } catch (error) {
        toast.error("Failed to update user");
      }
    },
  });

  useEffect(() => {
    if (editingUser) {
      formik.setValues(editingUser);
    }
  }, [editingUser]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="mb-4">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-500 text-sm">
                {formik.errors.firstName}
              </div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-500 text-sm">
                {formik.errors.lastName}
              </div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="text-red-500 text-sm">
                {formik.errors.phoneNumber}
              </div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="text"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Money
            </label>
            <input
              type="number"
              name="money"
              onChange={formik.handleChange}
              value={formik.values.money}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {formik.touched.money && formik.errors.money ? (
              <div className="text-red-500 text-sm">{formik.errors.money}</div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Credit
            </label>
            <input
              type="number"
              name="credit"
              onChange={formik.handleChange}
              value={formik.values.credit}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {formik.touched.credit && formik.errors.credit ? (
              <div className="text-red-500 text-sm">{formik.errors.credit}</div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              IsAdmin
            </label>
            <input
              type="checkbox"
              name="isAdmin"
              onChange={formik.handleChange}
              checked={formik.values.isAdmin}
              className="mt-1"
            />
            {formik.touched.isAdmin && formik.errors.isAdmin ? (
              <div className="text-red-500 text-sm">
                {formik.errors.isAdmin}
              </div>
            ) : null}
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md p-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="ml-5">
            <tr>
              <th className="py-4 border-b">First Name</th>
              <th className="py-4 border-b">Last Name</th>
              <th className="py-4 border-b">Phone Number</th>
              <th className="py-4 border-b">Email</th>
              <th className="py-4 border-b">Password</th>
              <th className="py-4 border-b">Money</th>
              <th className="py-4 border-b">Credit</th>
              <th className="py-4 border-b">IsAdmin</th>
              <th className="py-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-6 border-b">{user.firstName}</td>
                <td className="py-2 px-6 border-b">{user.lastName}</td>
                <td className="py-2 px-6 border-b">{user.phoneNumber}</td>
                <td className="py-2 px-6 border-b">{user.email}</td>
                <td className="py-2 px-6 border-b">{user.password}</td>
                <td className="py-2 px-6 border-b">{user.money}</td>
                <td className="py-2 px-6 border-b">{user.credit}</td>
                <td className="py-2 px-6 border-b">
                  {user.isAdmin ? "Yes" : "No"}
                </td>
                <td className="py-2 px-6 border-b">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="bg-yellow-500 text-white rounded-md p-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.email)}
                    className="bg-red-500 text-white rounded-md p-2 ml-3"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
