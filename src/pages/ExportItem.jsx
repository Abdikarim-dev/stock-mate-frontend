import { useEffect, useState } from "react";

import {
  handleCreateAndEditExportedItem,
  handleDeleteItemExportedModal
} from "../redux/ImportAndExportItem/ImportAndExportItem";

import { PlusIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getExportItems } from "../apicalls/exportItem";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import InventoryExportedForm from "../components/exportItem/ExportedItemForm";
import ImportAndExportTableView from "../components/ImportAndExportTableView";

const ExportItem = () => {
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

      <ImportAndExportTableView items={exportedItems} formState={"ExportTable"} />

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

export default ExportItem;
