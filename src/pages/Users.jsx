import { PlusIcon } from "lucide-react";
import UserTableView from "../components/UserTableView";

import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";

import { handleCreateAndEdit, handleDeleteModal } from "../redux/User/User";

import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../apicalls/user";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [getNewData, setGetNewData] = useState(false);

  // REDUX STATES
  const { createAndEditForm, deleteModal, editingUser, deletingUser } =
    useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [searchParam, setSearchParam] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.fullname.toLowerCase().includes(searchParam.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchParam.toLowerCase())
  );

  useEffect(() => {
    const getUsersData = async () => {
      const response = await getUsers();
      if (response.success) setUsers(response.users);
    };
    getUsersData();
  }, [getNewData]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold tracking-tight">Users</span>
        <button
          onClick={() => dispatch(handleCreateAndEdit())}
          className="flex items-center gap-0.5 rounded bg-black text-white px-4 py-2 cursor-pointer "
        >
          <PlusIcon className={"mr-2"} /> Create User
        </button>
      </div>

      {(createAndEditForm || editingUser) && (
        <UserForm getNewData={getNewData} setGetNewData={setGetNewData} />
      )}

      <div>
        <input
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          className="w-full max-w-sm rounded-md border bg-white border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          name="name"
          placeholder="Search here (By Name or By Phone)..."
          required
        />
      </div>

      {/* <div>User Table View</div> */}
      <UserTableView
        // onEdit={setEditingUserValue}
        // onDelete={setDeletingUserValue}
        // setOpen={setOpen}
        users={filteredUsers}
      />
      {/* <div>Edit Form</div>
      <div>Delete Form</div> */}

      {deletingUser && (
        <DeleteConfirmationModal
          title={"user"}
          modalState={deleteModal}
          object={deletingUser} // user {name,id,...}
          onCancel={() => dispatch(handleDeleteModal(false))}
          name={deletingUser.fullname}
          getNewData={getNewData}
          setGetNewData={setGetNewData}
        />
      )}
    </div>
  );
};

export default Users;
