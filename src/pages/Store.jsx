import { PlusIcon } from "lucide-react";
import StoreTableView from "../components/store/StoreTableView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import StoreForm from "../components/store/StoreForm";
import {
  handleCreateAndEdit,
  handleDeleteStoreModal,
} from "../redux/Store/Store";
import { getStores } from "../apicalls/store";

const Store = () => {
  const [getNewData, setGetNewData] = useState(true);

  const [stores, setStores] = useState([]);

  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useState("");
  // const stores = useSelector((state) => state.store.stores);

  const { createAndEditForm, deleteModal, editingStore, deletingStore } =
    useSelector((state) => state.store);

  useEffect(() => {
    const getStoresData = async () => {
      const response = await getStores();
      if (response.success) setStores(response.stores);
    };
    getStoresData();
  }, [getNewData]);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold tracking-tight">Stores</span>
        <button
          onClick={() => dispatch(handleCreateAndEdit(true))}
          className="flex items-center gap-0.5 rounded bg-black text-white px-4 py-2 cursor-pointer "
        >
          <PlusIcon className={"mr-2"} /> Add Store
        </button>
      </div>
      {/* <div>User Table View</div> */}

      {(createAndEditForm || editingStore) && (
        <StoreForm getNewData={getNewData} setGetNewData={setGetNewData} />
      )}

      <div>
        <input
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          className="w-full max-w-sm rounded-md border bg-white border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          name="name"
          placeholder="Search here (By Name or By Location)..."
          required
        />
      </div>

      <StoreTableView stores={stores} />
      {deletingStore && (
        <DeleteConfirmationModal
          title="store"
          modalState={deleteModal}
          object={deletingStore}
          onCancel={() => dispatch(handleDeleteStoreModal(false))}
          name={deletingStore.store_name}
          getNewData={getNewData}
          setGetNewData={setGetNewData}
        />
      )}
    </div>
  );
};

export default Store;
