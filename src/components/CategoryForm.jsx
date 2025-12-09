import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { onCancel } from "../redux/Category/Category";
import { addNewItem, editNewItem } from "../apicalls/newItem";

const CategoryForm = ({ getNewData, setGetNewData }) => {
  const types = [
    "Electronics",
    "Clothing",
    "Food",
    "Furniture",
    "Books",
    "Mobiles",
    "Laptops",
    "Shoes",
    "Watches",
    "Bags",
    "Accessories",
    "Home Appliances",
  ];
  const dispatch = useDispatch();

  const category = useSelector((state) => state.category?.editingCategory);
  const [name, setName] = useState(category?.item_name || "");
  const [type, setType] = useState(category?.item_category || "");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const categoryInfo = { item_name: name, item_category: type };

    if (category) {
      // categoryInfo.id = Category.id;
      const updateObj = {
        id: category.id,
        newItem: categoryInfo,
      };
      const response = await editNewItem(updateObj);

      if (response.success) {
        setGetNewData(!getNewData);
        toast.success(response.message);
        dispatch(onCancel());
      } else {
        toast.error(response.message);
      }
    } else {
      const response = await addNewItem(categoryInfo);

      if (response.success) {
        setGetNewData(!getNewData);
        toast.success(response.message);
        dispatch(onCancel());
      } else {
        toast.error(response.message);
      }
    }
  };
  return (
    <div className="container mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">
        {category ? "Edit Category" : "Create Category"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            name="name"
            required
          />
        </div>
        <div>
          <label>
            Type
            <select
              value={type}
              name="role"
              className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a Type
              </option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            type="button"
            onClick={() => dispatch(onCancel())}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            type="submit"
          >
            {category ? "Update Category" : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
