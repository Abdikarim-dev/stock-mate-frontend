const RecentActivities = () => {
  const user = {
    name: "Jibril John",
    role: "admin",
  };
  const items = [
    {
      id: 1,
      title: "Added new product: Organic Cotton T-shirt",
      user: "Jibril John",
      timeStamp: "2 hours ago",
    },
    {
      id: 2,
      title: "Updated product: Organic Cotton T-shirt",
      user: "Jane Jones",
      timeStamp: "3 hours ago",
    },
    {
      id: 3,
      title: "Deleted product: Organic Cotton T-shirt",
      user: "John Doe",
      timeStamp: "4 hours ago",
    },
    {
      id: 4,
      title: "Added new product: Organic Cotton T-shirt",
      user: "Jibril John",
      timeStamp: "5 hours ago",
    },
    {
      id: 5,
      title: "Updated product: Organic Cotton T-shirt",
      user: "Jane Jones",
      timeStamp: "6 hours ago",
    },
  ];
  return (
    <div
      className={`bg-white shadow rounded-lg px-4 py-4 ${
        user.role === "admin" ? "w-full lg:w-160" : ""
      }`}
    >
      <h3 className="pb-5 pt-2 text-lg font-semibold tracking-tight">
        Recent Activity
      </h3>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <RecentActivity
            key={item.id}
            title={item.title}
            user={item.user}
            timeStamp={item.timeStamp}
          />
        ))}
      </div>
    </div>
  );
};

function RecentActivity({ title, user, timeStamp }) {
  return (
    <div className="flex items-center  justify-between py-4 border-t border-gray-200">
      <div>
        <h2 className=" text-md font-medium">{title}</h2>
        <p className="text-sm">By {user}</p>
      </div>
      <p>
        <span className="text-sm text-gray-500">{timeStamp}</span>
      </p>
    </div>
  );
}

export default RecentActivities;
