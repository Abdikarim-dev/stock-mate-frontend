import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  onCancel,
} from "../redux/inventory/Inventory";
import { getNewItems } from "../apicalls/newItem";
import { getStores } from "../apicalls/store";
import { addImportItem, editImportItem } from "../apicalls/importItem";

const InventoryForm = ({getNewData,setGetNewData}) => {
  const dispatch = useDispatch();

  const item = useSelector((state) => state.inventory?.editingItem);
  const [name, setName] = useState(item?.new_item_id || "");
  const [QOH, setQOH] = useState(item?.qoh || "");
  const [store, setStore] = useState(item?.store_id || "");
  const [importer, setImporter] = useState(item?.importer || "");

  const [items, setItems] = useState([]);
  const [stores, setStores] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const itemInfo = {
      new_item_id:name,
      qoh: Number(QOH),
      store_id:store,
      importer,
    };

    if (item) {
      // itemInfo.id = item.id;
      const updateObj = {
        id: item.id,
        importItem: itemInfo,
      };
      const response = await editImportItem(updateObj);

      if (response.success) {
        setGetNewData(!getNewData);
        toast.success(response.message);
        dispatch(onCancel());
      } else {
        toast.error(response.message);
      }
    } else {
      const response = await addImportItem(itemInfo);

      if (response.success) {
        setGetNewData(!getNewData);
        toast.success(response.message);
        dispatch(onCancel());
      } else {
        toast.error(response.message);
      }
    }
  };
  useEffect(() => {
    const getItemsAndStores = async () => {
      const itemResponse = await getNewItems();
      if (itemResponse.success) setItems(itemResponse.newItems);
      const storeResponse = await getStores();
      if (storeResponse.success) setStores(storeResponse.stores);
    };
    getItemsAndStores();
  }, []);
  return (
    <div className="container mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">
        {item ? "Edit item" : "Create item"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>
            Item Name
            <select
              value={name}
              name="role"
              className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setName(e.target.value)}
              required
            >
              <option value="" disabled>
                Select an Item
              </option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.item_name}
                </option>
              ))}
            </select>
          </label>
        </div>
        {/* <div>
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
        </div> */}
        <div>
          <label className="block text-sm font-medium text-gray-700">QTY</label>
          <input
            value={QOH}
            onChange={(e) => setQOH(e.target.value)}
            className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            type="number"
            name="QOH"
            required
          />
        </div>
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Store
          </label>
          <input
            value={store}
            onChange={(e) => setStore(e.target.value)}
            className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            name="store"
            required
          />
        </div> */}
        <div>
          <label>
            Store
            <select
              value={store}
              name="store"
              className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setStore(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a Store
              </option>
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.store_name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Importer
          </label>
          <input
            value={importer}
            onChange={(e) => setImporter(e.target.value)}
            className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            name="importer"
            required
          />
        </div>
        {/* <div>
          <label>
            Role
            <select
              value={role}
              name="role"
              className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="item">item</option>
              <option value="admin">Admin</option>
            </select>
          </label>
        </div> */}
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
            {item ? "Update item" : "Create item"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InventoryForm;
