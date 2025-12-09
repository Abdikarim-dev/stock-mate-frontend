import { PlusIcon } from "lucide-react";

import {
  handleCreateAndEditExportedItem,
  handleDeleteItemExportedModal,
  handleDeleteExportedItem,
} from "../redux/inventory/Inventory";

import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import InventoryExportedForm from "../components/InventoryExportedForm";
import InventoryTableView from "../components/InventoryTableView";
import { useEffect, useState } from "react";
import { getExportItems } from "../apicalls/exportItem";

const ExportedItems = () => {
  // const inventories = useSelector((state) => state.inventory.items);

  const [exportedItems, setExportedItems] = useState([]);
  const [getNewData, setGetNewData] = useState(false);

  // REDUX STATES
  const {
    createAndEditItemExportedForm,
    deleteItemExportedModal,
    editingExportedItem,
    deletingExportedItem,
  } = useSelector((state) => state.inventory);

  const dispatch = useDispatch();

  useEffect(() => {
    const getImportedItemsData = async () => {
      const response = await getExportItems();
      if (response.success) setExportedItems(response.exportedItem);
    };
    getImportedItemsData();
  }, [getNewData]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold tracking-tight">
          Exported Items
        </span>
        <button
          onClick={() => dispatch(handleCreateAndEditExportedItem(true))}
          className="flex items-center gap-0.5 rounded bg-black text-white px-4 py-2 cursor-pointer "
        >
          <PlusIcon className={"mr-2"} /> Export Inventory
        </button>
      </div>

      {(createAndEditItemExportedForm || editingExportedItem) && (
        <InventoryExportedForm getNewData={getNewData} setGetNewData={setGetNewData} />
      )}

      <InventoryTableView items={exportedItems} formState={"ExportTable"} />

      {deletingExportedItem && (
        <DeleteConfirmationModal
          title={"export-item"}
          modalState={deleteItemExportedModal}
          object={deletingExportedItem}
          onCancel={() => dispatch(handleDeleteItemExportedModal(false))}

          name={"export-item"}
          getNewData={getNewData}
          setGetNewData={setGetNewData}
        />
      )}
    </div>
  );
};

export default ExportedItems;
