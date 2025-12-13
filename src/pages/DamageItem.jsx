import { PlusIcon } from "lucide-react";

import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { useDispatch, useSelector } from "react-redux";

import DamagedItemTableView from "../components/damagedItem/DamageItemTableView";
import DamagedItemForm from "../components/damagedItem/DamagedItemForm";
import { handleCreateAndEditItem, handleDeleteDamagedItem, handleDeleteItemModal } from "../redux/DamagedItem/DamagedItem";

const DamageItem = () => {
  // REDUX STATES
  const {
    createAndEditItemForm,
    deleteItemModal,
    editingItem,
    deletingItem,
  } = useSelector((state) => state.damagedItem);

  const dispatch = useDispatch();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold tracking-tight">
          Damaged Items
        </span>
        <button
          onClick={() => dispatch(handleCreateAndEditItem(true))}
          className="flex items-center gap-0.5 rounded bg-black text-white px-4 py-2 cursor-pointer "
        >
          <PlusIcon className={"mr-2"} /> Export Inventory
        </button>
      </div>

      {(createAndEditItemForm || editingItem) && (
        <DamagedItemForm />
      )}

      <DamagedItemTableView />

      {deletingItem && (
        <DeleteConfirmationModal
          title={"Exported Inventory Items"}
          modalState={deleteItemModal}
          object={deletingItem}
          onCancel={() => dispatch(handleDeleteItemModal(false))}
          onConfirm={(id) => dispatch(handleDeleteDamagedItem(id))}
        />
      )}
    </div>
  );
};

export default DamageItem;
