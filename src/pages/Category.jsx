import { PlusIcon } from "lucide-react";
import CategoryTableView from "../components/CategoryTableView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import CategoryForm from "../components/CategoryForm";
import {
  handleCreateAndEditCategory,
  handleDeleteCategoryModal,
} from "../redux/Category/Category";
import { getNewItems } from "../apicalls/newItem";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [getNewData, setGetNewData] = useState(false);
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useState("");
  // const categories = useSelector((state) => state.category.categories);

  const {
    createAndEditCategoryForm,
    deleteCategoryModal,
    editingCategory,
    deletingCategory,
  } = useSelector((state) => state.category);

  useEffect(() => {
    const getUsersData = async () => {
      const response = await getNewItems();
      if (response.success) setCategories(response.newItems);
    };
    getUsersData();
  }, [getNewData]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold tracking-tight">Item Creation</span>
        <button
          onClick={() => dispatch(handleCreateAndEditCategory(true))}
          className="flex items-center gap-0.5 rounded bg-black text-white px-4 py-2 cursor-pointer "
        >
          <PlusIcon className={"mr-2"} /> Add Category
        </button>
      </div>
      {/* <div>User Table View</div> */}

      {(createAndEditCategoryForm || editingCategory) && (
        <CategoryForm getNewData={getNewData} setGetNewData={setGetNewData} />
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

      <CategoryTableView categories={categories} />
      {deletingCategory && (
        <DeleteConfirmationModal
          title="new-item"
          modalState={deleteCategoryModal}
          object={deletingCategory}
          onCancel={() => dispatch(handleDeleteCategoryModal(false))}
          name={deletingCategory.item_name}
          getNewData={getNewData}
          setGetNewdata={setGetNewData}
        />
      )}
    </div>
  );
};

export default Category;
