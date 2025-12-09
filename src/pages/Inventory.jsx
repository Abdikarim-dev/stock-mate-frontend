import { PlusIcon } from "lucide-react";
import InventoryTableView from "../components/InventoryTableView";
import InventoryForm from "../components/InventoryForm";

import {
  handleCreateAndEditItem,
  handleDeleteItemModal,
} from "../redux/inventory/Inventory";

import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import WrapperAlerts from "../components/WrapperAlerts";
import { useEffect, useState } from "react";
import { getImportItems } from "../apicalls/importItem";

const Inventory = () => {
  // const inventories = useSelector((state) => state.inventory.items);
  const [importItems, setImportItems] = useState([]);
  const [getNewData, setGetNewData] = useState(false);

  // REDUX STATES
  const { createAndEditItemForm, deleteItemModal, editingItem, deletingItem } =
    useSelector((state) => state.inventory);

  const dispatch = useDispatch();

  useEffect(() => {
    const getImportItemsData = async () => {
      const response = await getImportItems();
      if (response.success) setImportItems(response.importedItems);
    };
    getImportItemsData();
  }, [getNewData]);

  return (
    <div className="space-y-4">
      {/* Alerts from WrapperAlerts */}
      <WrapperAlerts />
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold tracking-tight">
          Imported Items
        </span>
        <button
          onClick={() => dispatch(handleCreateAndEditItem(true))}
          className="flex items-center gap-0.5 rounded bg-black text-white px-4 py-2 cursor-pointer "
        >
          <PlusIcon className={"mr-2"} /> Create Inventory
        </button>
      </div>

      {(createAndEditItemForm || editingItem) && (
        <InventoryForm getNewData={getNewData} setGetNewData={setGetNewData} />
      )}

      {/* <div>Inventory Table View</div> */}
      <InventoryTableView items={importItems} />

      {deletingItem && (
        <DeleteConfirmationModal
          title={"import-item"}
          modalState={deleteItemModal}
          object={deletingItem}
          onCancel={() => dispatch(handleDeleteItemModal(false))}
          getNewData={getNewData}
          setGetNewData={setGetNewData}
          name={deletingItem.new_item_id}
        />
      )}
    </div>
  );
};

export default Inventory;
