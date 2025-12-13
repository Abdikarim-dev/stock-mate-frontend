import {
  FaClipboardCheck,
  FaStore,
  FaBoxes,
  FaExclamationTriangle,
  FaHome,
  FaUsers,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useDispatch } from "react-redux";

import { NavLink, useLocation } from "react-router-dom";
import { logout } from "../redux/Auth/Auth";

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className="h-full w-16 lg:w-64 bg-white flex flex-col border-r border-gray-200">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        {/* Logo */}
        <span className="text-2xl font-semibold">
          <h2 className="hidden lg:block">StockMate</h2>
          <h4 className="lg:hidden">S</h4>
        </span>
      </div>
      <nav className="grow">
        {/* Navigation Links */}
        <ul className="space-y-2 py-4">
          <SidebarItem
            title={"Home"}
            icon={FaHome}
            href="/dashboard"
            text="Home"
          />
          <SidebarItem
            title={"Users"}
            icon={FaUsers}
            href="/dashboard/user"
            text="Users"
          />
          <SidebarItem
            title={"Stores"}
            icon={FaStore}
            href="/dashboard/store"
            text="Store"
          />
          <SidebarItem
            title={"Create Item"}
            icon={FaStore}
            href="/dashboard/item"
            text="Item Creation"
          />
          <SidebarItem
            title={"Import Items"}
            icon={FaBoxes}
            href="/dashboard/import-item"
            text="Imported Items Rp"
          />
          <SidebarItem
            title={"Export Items"}
            icon={FaBoxes}
            href="/dashboard/export-item"
            text="Exported Items Rp"
          />
          <SidebarItem
            title={"Damaged Items"}
            icon={FaExclamationTriangle}
            href="/dashboard/damage-item"
            text="Damaged Items"
          />
          <SidebarItem
            title={"Audit Log"}
            icon={FaClipboardCheck}
            href="/dashboard/audit-log"
            text="Audit"
          />
          <SidebarItem
            title={"User Profile"}
            icon={FaUser}
            href="/dashboard/user-profile"
            text="User Profile"
          />
        </ul>
      </nav>
      <div className="flex items-center justify-center lg:justify-start p-4 border-t border-gray-200">
        <button
          onClick={() => dispatch(logout())}
          className="flex items-center justify-center text-gray-600 hover:text-gray-800"
        >
          <FaSignOutAlt className={"lg:mr-2 text-lg"} />
          <span className="hidden lg:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

const SidebarItem = ({ href, text, icon: Icon, title }) => {
  const location = useLocation();
  const checkActive = location.pathname === href;
  return (
    <li>
      <NavLink
        to={href}
        title={title}
        className={`flex items-center justify-center lg:justify-start px-4 py-2 text-gray-800 hover:bg-gray-200 ${
          checkActive ? "bg-gray-200" : ""
        }`}
      >
        <Icon className="lg:mr-4 text-xl" />
        <span className="hidden lg:block">{text}</span>
      </NavLink>
    </li>
  );
};

export default Sidebar;
