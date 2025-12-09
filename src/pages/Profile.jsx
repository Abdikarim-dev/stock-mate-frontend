import { useSelector } from "react-redux";

const Profile = () => {
  const authUser = useSelector((s) => s.auth.activeUser);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold tracking-tight">User Profile</span>
      </div>

      <div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
          <div className="flex justify-between  space-x-4">
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {authUser.fullname}
              </p>
              <p>
                <strong>Email:</strong> {authUser.email}
              </p>
              <p>
                <strong>Phone:</strong> {authUser.phone}
              </p>
              <p>
                <strong>Role:</strong> {authUser.role}
              </p>
            </div>
            {/* Image goes here */}
            <div>
              <img
                src={authUser.image || "https://i.pravatar.cc/150"}
                alt="User Avatar"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
