import { useEffect, useState } from "react";
import { topItems } from "../apicalls/dashboard";

const SummaryInvenInfo = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getTops = async () => {
      const response = await topItems();
      if (response.success) setItems(response.data);
    };
    getTops();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg py-8 px-6 w-full lg:w-220">
      <h3 className="font-semibold text-lg tracking-tight pb-6">
        Top Inventories
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-950">
                Item Info
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-950">
                QOH
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-950">
                T. Imp QTY
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-950">
                T. Exp QTY
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items?.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  <div className="flex items-center space-x-2">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ({item.store}) 
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {item.qoh.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {item.importedQuantity.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {item.exportedQuantity.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SummaryInvenInfo;
