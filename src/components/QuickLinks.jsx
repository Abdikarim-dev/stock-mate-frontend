import { Link } from "react-router-dom";

const QuickLinks = () => {
  const cards = [
    {
      id: 1,
      title: "Create Item",
      desc: "Create a new item in the inventory",
      route: "/dashboard/category",
    },
    {
      id: 2,
      title: "Import Items",
      desc: "Import items from the store",
      route: "/dashboard/inventory",
    },
    {
      id: 3,
      title: "Export Items",
      desc: "Export items from the store",
      route: "/dashboard/exported-item",
    },
    {
      id: 4,
      title: "Damaged Items",
      desc: "View all damaged items",
      route: "/dashboard/damaged-item",
    },
  ];
  return (
    <div className="bg-white shadow rounded-lg py-8 px-8">
      <h3 className="pb-4 text-center text-lg font-bold tracking-tight">
        Quick Links
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <QuickLink
            key={card.id}
            route={card.route}
            title={card.title}
            desc={card.desc}
          />
        ))}
      </div>
    </div>
  );
};

function QuickLink({ title, desc, route }) {
  return (
    <Link
      to={route}
      className="bg-slate-50 shadow rounded-lg p-6 hover:bg-slate-200 cursor-pointer"
    >
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-semibold text-center text-lg tracking-tight">
          {title}
        </h2>
        <p className="text-sm  text-center">{desc}</p>
      </div>
      {/* <Icon size={24} className={className} /> */}
    </Link>
  );
}

export default QuickLinks;
