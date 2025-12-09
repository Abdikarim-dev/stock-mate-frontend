import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { handleEditStore, onCancel } from "../redux/Store/Store.js";
import { addStore, editStore } from "../apicalls/store";

const StoreForm = ({ getNewData, setGetNewData }) => {
  const dispatch = useDispatch();

  const { editingStore: store } = useSelector((state) => state.store);
  const [name, setName] = useState(store?.store_name || "");
  const [location, setLocation] = useState(store?.store_location || "");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const storeInfo = { store_name: name, store_location: location };

    if (store) {
      // storeInfo.id = Store.id;
      const updateObj = {
        id: store.id,
        store: storeInfo,
      };
      const response = await editStore(updateObj);

      if (response.success) {
        setGetNewData(!getNewData);
        toast.success(response.message);
        dispatch(onCancel());
      } else {
        toast.error(response.message);
      }
    } else {
      const response = await addStore(storeInfo);

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
        {store ? "Edit Store" : "Create Store"}
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
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            name="location"
            required
          />
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
            {store ? "Update Store" : "Create Store"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoreForm;
