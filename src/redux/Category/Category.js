import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "item-creation",
  initialState: {
    categories: [
      {
        id: 1,
        type: "Electronics",
        name: "Item 1",
        qoh: 500,
      },
      {
        id: 2,
        type: "Electronics",
        qoh: 500,
        name: "Item 2",
      },
      {
        id: 3,
        type: "Electronics",
        qoh: 500,
        name: "Item 3",
      },
      {
        id: 4,
        type: "Electronics",
        qoh: 500,
        name: "Item 4",
      },
      {
        id: 5,
        type: "Electronics",
        qoh: 500,
        name: "Item 5",
      },
      {
        id: 6,
        type: "Electronics",
        qoh: 0,
        name: "Iphone 16 Pro",
      },
      {
        id: 7,
        type: "Clothing",
        qoh: 0,
        name: "Shirt",
      },
      {
        id: 8,
        type: "Books",
        qoh: 0,
        name: "Book",
      },
      {
        id: 9,
        type: "Furniture",
        qoh: 0,
        name: "Table",
      },
      {
        id: 10,
        type: "Food",
        qoh: 0,
        name: "Pizza",
      },
    ],
    editingCategory: null,
    deletingCategory: null,
    createAndEditCategoryForm: false,
    deleteCategoryModal: false,
  },
  reducers: {
    handleCreateAndEditCategory: (state, action) => {
      state.createAndEditCategoryForm = action.payload;
    },
    handleDeleteCategoryModal: (state, action) => {
      state.deleteCategoryModal = action.payload;
    },

    handleDeletingCategory: (state, action) => {
      state.deletingCategory = action.payload;
      state.deleteCategoryModal = true;
    },
    handleEditingCategory: (state, action) => {
      state.editingCategory = action.payload;
    },

    handleAddCategory: (state, action) => {
      const newCategory = action.payload; // { name: "Category 2", location: "Location 2" }

      state.categories.push({
        id: state.categories.length + 1,
        ...newCategory,
      });
      state.createAndEditCategoryForm = false;
    },
    handleEditCategory: (state, action) => {
      const { id, updatedCategory } = action.payload;
      const updatedCategories = state.categories.map((category) =>
        category.id === id ? { ...category, ...updatedCategory } : category
      );

      state.categories = updatedCategories;
      state.createAndEditCategoryForm = false;

      state.editingCategory = null;
    },
    handleDeleteCategory: (state, action) => {
      const id = action.payload;
      const filteredCategories = state.categories.filter(
        (category) => category.id !== id
      );
      state.categories = filteredCategories;

      state.deletingCategory = null;

      state.deleteCategoryModal = false;
    },
    onCancel: (state) => {
      state.createAndEditCategoryForm = false;
      state.editingCategory = null;
    },
  },
});

export const {
  handleCreateAndEditCategory,
  handleDeleteCategoryModal,

  handleEditingCategory,
  handleDeletingCategory,

  handleAddCategory,
  handleEditCategory,
  handleDeleteCategory,

  onCancel,
} = slice.actions;

export default slice.reducer;
