import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { onCancel } from "../redux/User/User";
import { addAuditLog } from "../redux/Audit/Audit";
import { addUser, editUser } from "../apicalls/user";

const UserForm = ({ getNewData, setGetNewData }) => {
  const dispatch = useDispatch();

  const authUser = useSelector((s) => s.auth?.activeUser);

  const { editingUser: user } = useSelector((state) => state.user);

  const [changePass, setChangePass] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [name, setName] = useState(user?.fullname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [image, setImage] = useState(user?.image || "");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [role, setRole] = useState(user?.role || "");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userInfo = { username, fullname: name, email, phone, image, role };

    if (user) {
      // userInfo.id = user.id;
      const updateObj = {
        id: user.id,
        user: userInfo,
      };

      const log = {
        title: "User Updated",
        desc: `${authUser.name} has updated a user (${userInfo.username})`,
        user: `${authUser.name}(${authUser.phone})`,
      };

      dispatch(addAuditLog(log));

      const response = await editUser(updateObj);

      if (response.success) {
        setGetNewData(!getNewData);
        toast.success(response.message);
        dispatch(onCancel());
      } else {
        toast.error(response.message);
      }
    } else {
      // Password here
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      if (password.length < 6 || password.length > 20) {
        toast.error("Password must be between 6 and 20 characters");
        return;
      }

      userInfo.password = password;

      const response = await addUser(userInfo);

      if (response.success) {
        setGetNewData(!getNewData);
        toast.success(response.message);
        dispatch(onCancel());
      } else {
        toast.error(response.message);
      }

      const log = {
        title: "User Created",
        desc: `${authUser.name} has created a new user (${userInfo.username})`,
        user: `${authUser.name}(${authUser.phone})`,
      };

      dispatch(addAuditLog(log));
      // dispatch(handleAddUser(userInfo));
    }
  };
  return (
    <div className="container mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">
        {user ? "Edit User" : "Create User"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            name="name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            name="username"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            type="email"
            name="email"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            type="tel"
            name="phone"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            onChange={handleFileChange}
            className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            type="file"
            name="image"
          />
        </div>
        {/* Image Preview */}
        {image && (
          <div className="mt-3 relative">
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm bg-gray-50 p-1">
              <div className="relative h-48 w-full overflow-hidden rounded-md">
                <img
                  src={image || "/placeholder.svg"}
                  alt="User profile preview"
                  className="h-full w-full object-cover transition-all hover:scale-105 duration-300"
                />
              </div>
              <div className="p-2 text-center text-sm text-gray-500">
                Profile image preview
              </div>
            </div>
          </div>
        )}
        <div>
          <label>
            Role
            <select
              value={role}
              name="role"
              className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </label>
        </div>
        {!user || changePass ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                type="password"
                name="password"
                placeholder="********"
                required={user ? !changePass : true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                type="password"
                name="confirm-password"
                placeholder="********"
                required={!changePass}
              />
            </div>
          </>
        ) : null}

        {user && (
          <div>
            <span>
              I{changePass ? " don't" : ""} want to change my password
            </span>
            <a
              className="text-red-600 underline cursor-pointer text-sm"
              onClick={() => {
                setChangePass(!changePass);
                setPassword("");
                setConfirmPassword("");
              }}
            >
              Click here
            </a>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            type="button"
            onClick={() => dispatch(onCancel())}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            type="submit"
          >
            {user ? "Update User" : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
