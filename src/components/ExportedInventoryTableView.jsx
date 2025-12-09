import { useDispatch } from "react-redux";
import {
  handleDeleteItemExportedModal,
  handleDeletingExportedItem,
  handleEditingExportedItem,
} from "../redux/inventory/Inventory";

const ExportedInventoryTableView = ({ items }) => {
  const dispatch = useDispatch();
  return (
    <div className="container mx-auto py-4">
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
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Store
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exporter
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {items
              ?.filter((item) => item.exporter)
              .map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.store}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.exporter}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium">
                    <button
                      onClick={() => dispatch(handleEditingExportedItem(item))}
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
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExportedInventoryTableView;
