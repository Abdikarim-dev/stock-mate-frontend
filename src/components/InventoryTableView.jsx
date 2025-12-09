import { useDispatch } from "react-redux";
import {
  handleDeleteItemExportedModal,
  handleDeleteItemModal,
  handleDeletingExportedItem,
  handleDeletingItem,
  handleEditingExportedItem,
  handleEditingItem,
} from "../redux/inventory/Inventory";
import {
  addDays,
  format,
  isThisMonth,
  isThisWeek,
  isToday,
  isWithinInterval,
} from "date-fns";
import { useEffect, useState } from "react";

const InventoryTableView = ({ items, formState }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchParam, setSearchParam] = useState("");

  const [rp, setRp] = useState("all");
  const [importedRpData, setImportedRpData] = useState([]);

  // const filteredInventories = items.filter(
  //   (inventory) =>
  //     inventory.name.toLowerCase().includes(searchParam.toLowerCase()) ||
  //     inventory.phone.toLowerCase().includes(searchParam.toLowerCase())
  // );

  // Form State  (ExportTable || ImportTable)

  // newArray = those who meet with our conditions

  const importItems = items?.filter((item) => item.importer);

  // Report type based on the importer

  const reportForImportedItemsFn = (formState) => {
    if (rp === "day") {
      if (formState === "ExportTable") {
        const rpData = exportItems.filter((item) => isToday(item.createdAt));
        setImportedRpData(rpData);
      } else {
        const rpData = importItems.filter((item) => isToday(item.createdAt));
        setImportedRpData(rpData);
      }
    } else if (rp === "week") {
      const rpData = importItems.filter((item) => isThisWeek(item.createdAt));
      setImportedRpData(rpData);
    } else if (rp === "month") {
      const rpData = importItems.filter((item) => isThisMonth(item.createdAt));
      setImportedRpData(rpData);
    } else if (rp === "custom") {
      const rpData = importItems.filter((item) =>
        isWithinInterval(new Date(item.createdAt), {
          start: new Date(startDate),
          end: addDays(new Date(endDate), 1),
        })
      );
      setImportedRpData(rpData);
    } else {
      setImportedRpData(importItems);
    }
  };

  useEffect(() => {
    reportForImportedItemsFn();
  }, [items]);

  const exportItems = items?.filter((item) => item.exporter);

  const dispatch = useDispatch();
  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <input
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
            className="w-full max-w-sm rounded-md border bg-white border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            name="name"
            placeholder="Search here (By Name or By Phone)"
            required
          />
        </div>

        <div className="flex gap-4 items-center">
          <select
            value={rp}
            name="role"
            className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setRp(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a report
            </option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="custom">Custom</option>
            <option value="all">All</option>
          </select>
          {rp === "custom" && (
            <div className="flex gap-4 items-center">
              <input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full max-w-sm rounded-md border bg-white border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                type="date"
                name="name"
                placeholder="Search here (By Name or By Phone)"
                required
              />
              <input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full max-w-sm rounded-md border bg-white border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                type="date"
                name="name"
                placeholder="Search here (By Name or By Phone)"
                required
              />
            </div>
          )}
          <button
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => reportForImportedItemsFn(formState)}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {formState === "ExportTable" ? "Quantity" : "QOH"}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Store
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {formState === "ExportTable" ? "Exporter" : "Importer"}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {formState === "ExportTable"
              ? exportItems?.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.newItem.item_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.store.store_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.exporter}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(item?.createdAt, "PPp")}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium">
                      <button
                        onClick={() =>
                          dispatch(handleEditingExportedItem(item))
                        }
                        className="mr-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          dispatch(handleDeletingExportedItem(item));
                          dispatch(handleDeleteItemExportedModal(true));
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : importedRpData?.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.newItem.item_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.qoh}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.store.store_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.importer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(item?.createdAt, "PPp")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium">
                      <button
                        onClick={() => dispatch(handleEditingItem(item))}
                        className="mr-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          dispatch(handleDeletingItem(item));
                          dispatch(handleDeleteItemModal(true));
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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

export default InventoryTableView;
