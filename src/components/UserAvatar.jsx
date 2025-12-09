import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/Auth/Auth";

const UserAvatar = () => {
  const authUser = useSelector((s) => s.auth.activeUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="border-2 border-white rounded-full"
        onClick={() => setIsOpen(true)}
      >
        <img
          className="h-12 w-12 rounded-full hover:scale-105 transition-transform"
          src={authUser?.image ?? "https://i.pravatar.cc/150?img=3"}
          alt="img-alt-info"
        />
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
        <div className="fixed inset-0 flex justify-center items-center p-4">
          <DialogPanel className="p-6 mx-auto w-full max-w-sm rounded-2xl bg-white shadow-lg">
            <div className="flex flex-col items-center space-y-2">
              <img
                className="w-20 h-20 rounded-full border-4 border-blue-500"
                src={authUser.image ?? "https://i.pravatar.cc/150?img=3"}
                alt="avatar-url"
              />
              <DialogTitle>{authUser.username ?? "Cabdikariin10"}</DialogTitle>
              <p className="text-sm text-gray-500">
                {authUser.email ?? "cabdikariim405@gmail.com"}
              </p>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {authUser.role ?? "Admin"}
              </span>
            </div>
            {/* Actions */}
            <div className="mt-4 flex flex-col space-y-2">
              <button
                onClick={() => navigate("/dashboard/user-profile")}
                className="px-4 py-2 text-sm text-blue-600 border-blue-500 border rounded hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                Edit Profile
              </button>
              <button
                onClick={() => dispatch(logout())}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default UserAvatar;
