import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteItemModal,
  handleEditingItem,
  handleDeletingItem,
} from "../redux/damagedItem/damagedItem";
import { format } from "date-fns";

const DamagedItemTableView = () => {
  const { damagedItems } = useSelector((state) => state.damagedItem);
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
                Assigned By
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
            {damagedItems?.map((item, index) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.store}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.assignBy}</td>
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

export default DamagedItemTableView;
