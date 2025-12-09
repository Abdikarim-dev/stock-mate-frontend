import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  handleEditExportedItem,
  onExportedCancel,
} from "../redux/inventory/Inventory";
import { getNewItems } from "../apicalls/newItem";
import { getStores } from "../apicalls/store";
import { addExportItem, getQOH } from "../apicalls/exportItem";

const InventoryExportedForm = () => {
  const dispatch = useDispatch();

  //   const [selectedItem, setSelectedItem] = useState(null);

  const { item } = useSelector((state) => state.inventory);
  const [name, setName] = useState(item?.name || "");
  const [quantity, setQuantity] = useState(item?.quantity || "");
  const [store, setStore] = useState(item?.store || "");
  const [exporter, setExporter] = useState(item?.exporter || "");

  // const importerItem = items.filter((item) => item.importer);
  // const currentItem = importerItem.find(
  //   (item) => item.name === name && item.store === store
  // );

  const [items, setItems] = useState([]);
  const [stores, setStores] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const itemInfo = { name, quantity: quantity, store, exporter }; // exported data to be stored when creating new rp

    const info = {
      new_item_id: name,
      store_id: store,
      exporter,
      quantity,
    };

    if (item) {
      // itemInfo.id = item.id;
      const updateObj = {
        id: item.id,
        updatedItem: info.exportedData,
      };
      dispatch(handleEditExportedItem(updateObj));
      toast.success("item updated successfully");
    } else {
      if (
        currentItem.data &&
        Number(currentItem.data?.qoh) >= Number(quantity)
      ) {
        //9000 > 800 === true

        // dispatch(handleAddExportedItem(info));

        const response = await addExportItem(info);

        if (response.success) {
          // setGetNewData(!getNewData);
          toast.success(response.message);
          dispatch(onExportedCancel());
        } else {
          toast.error(response.message);
        }
      } else {
        toast.error("Quantity on hand is less than the quantity to export");
        return;
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

  useEffect(() => {
    const getQOHData = async () => {
      const itemResponse = await getQOH({
        name,
        store,
      });
      if (itemResponse.success) setCurrentItem(itemResponse);
    };
    getQOHData();
  }, [name, store]);

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
        {currentItem && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity On Hand
            </label>
            <input
              value={currentItem.data?.qoh ?? 0}
              className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              type="number"
              name="qoh"
              readOnly
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">QTY</label>
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            type="number"
            name="quantity"
            required
          />
        </div>
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
              {stores.map((value) => (
                <option key={value.id} value={value.id}>
                  {value.store_name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Exporter
          </label>
          <input
            value={exporter}
            onChange={(e) => setExporter(e.target.value)}
            className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            name="exporter"
            required
          />
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            type="button"
            onClick={() => dispatch(onExportedCancel())}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            type="submit"
          >
            {item ? "Update item" : "Export item"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InventoryExportedForm;
