import { AiOutlineStock } from "react-icons/ai";
import { GoAlertFill } from "react-icons/go";
import { FaStore, FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import { dashboardCard } from "../apicalls/dashboard";

const DashboardCards = () => {
  const [totals, setTotals] = useState(null);
  useEffect(() => {
    const getCards = async () => {
      const response = await dashboardCard();
      if (response.success) setTotals(response.data);
    };
    getCards();
  }, []);
  console.log(totals);

  const cards = [
    {
      id: 1,
      title: "Total Users ",
      value: totals?.users,
      icon: FaUsers,
      className: "text-[#6BA1F8]",
    },
    {
      id: 2,
      title: "Total Stores",
      value: totals?.stores,
      icon: FaStore,
      className: "text-[#24C55F]",
    },
    {
      id: 3,
      title: "Total Items",
      value: totals?.items.toLocaleString(),
      icon: AiOutlineStock,
      className: "text-[#EAB40A]",
    },
    {
      id: 4,
      title: "Total Damaged Items",
      value: totals?.damagedItems.toLocaleString(),
      icon: GoAlertFill,
      className: "text-[#EF4646]",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <DashboardCard
            key={card.id}
            title={card.title}
            value={card.value}
            className={card.className}
            icon={card.icon}
          />
        ))}
      </div>
    </div>
  );
};

function DashboardCard({ title, value, className, icon: Icon }) {
  return (
    <div className="bg-white flex items-center justify-between shadow rounded-lg px-6 py-8">
      <div>
        <h2 className="text-base font-[300]">{title}</h2>
        <p className="pt-4 font-semibold text-xl font-inter">{value}</p>
      </div>
      <Icon size={24} className={className} />
    </div>
  );
}

export default DashboardCards;
