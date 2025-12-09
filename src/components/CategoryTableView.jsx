import { useDispatch } from "react-redux";
import {
  handleDeletingCategory,
  handleEditingCategory,
} from "../redux/Category/Category";

const CategoryTableView = ({ categories }) => {
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
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {categories?.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap">{category.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{category.item_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{category.item_category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{category.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-xs font-medium">
                  <button
                    onClick={() => dispatch(handleEditingCategory(category))}
                    className="mr-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      dispatch(handleDeletingCategory(category));
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

export default CategoryTableView;
