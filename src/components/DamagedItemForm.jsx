import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddDamagedItem,
  handleEditDamagedItem,
  onCancel,
} from "../redux/damagedItem/damagedItem";
import { handleSubtractingAmountDamaged } from "../redux/inventory/Inventory";

const DamagedItemForm = () => {
  const dispatch = useDispatch();

  //   const [selectedItem, setSelectedItem] = useState(null);

  const { items } = useSelector((state) => state.inventory);
  const { editingItem } = useSelector((state) => state.damagedItem);

  const [name, setName] = useState(editingItem?.name || "");
  const [quantity, setQuantity] = useState(editingItem?.quantity || "");
  const [oldQuantity, setOldQuantity] = useState(editingItem?.quantity || "");
  const [store, setStore] = useState(editingItem?.store || "");
  const [assignBy, setAssignBy] = useState(editingItem?.assignBy || "");

  const importerItem = items.filter((item) => item.importer);
  const currentItem = importerItem.find(
    (item) => item.name === name && item.store === store
  );

  // Get the Items'name from the items
  const itemNames = items
    .filter((item) => item.importer)
    .map((item) => item.name);

  const uniqueItems = [...new Set(itemNames)];

  const stores = useSelector((s) => s.store.stores);
  const storeNames = stores.map((s) => s.name);

  const handleSubmit = (event) => {
    event.preventDefault();

    const itemInfo = { name, quantity, store, assignBy };

    if (editingItem) {
      // itemInfo.id = item.id;
      const updateObj = {
        id: editingItem.id,
        updateItem: itemInfo,
      };

      const itemIntheInventory = {
        id: currentItem.id,
        oldQuantity,
        newQuantity: quantity,
      };

      dispatch(handleEditDamagedItem(updateObj));

      dispatch(handleSubtractingAmountDamaged(itemIntheInventory));

      toast.success("item updated successfully");
    } else {
      if (currentItem && Number(currentItem.qoh) >= Number(quantity)) {
        //9000 > 800 === true

        dispatch(handleAddDamagedItem(itemInfo));
        dispatch(
          handleSubtractingAmountDamaged({
            id: currentItem.id,
            name: currentItem.name,
            quantity: Number(quantity),
            store: currentItem.store,
          })
        );
      } else {
        toast.error(
          "Quantity on hand is less than the quantity to report as damaged items"
        );
        return;
      }
      toast.success("item created successfully");
    }
  };

  return (
    <div className="container mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">
        {editingItem ? "Edit Damaged Item" : "Report Damaged item"}
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
              {uniqueItems.map((name) => (
                <option key={name} value={name}>
                  {name}
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
              value={currentItem.qoh}
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
              {storeNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Assigned By
          </label>
          <input
            value={assignBy}
            onChange={(e) => setAssignBy(e.target.value)}
            className="block mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            name="assign-by"
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
            {editingItem ? "Update damaged item" : "Report Damaged item"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DamagedItemForm;
