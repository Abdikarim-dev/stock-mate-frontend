import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "damaged-items",
  initialState: {
    alerts: [],
    damagedItems: [
      {
        id: 6,
        name: "Item 4",
        quantity: 200,
        store: "Store 4",
        assignBy: "Jama",
        createdAt: "2025-04-19T03:00:00+03:00",
      },
      {
        id: 7,
        name: "Item 3",
        quantity: 200,
        store: "Store 3",
        assignBy: "Hussein",
        createdAt: "2025-04-19T03:00:00+03:00",
      },
      {
        id: 8,
        name: "Item 2",
        quantity: 200,
        store: "Store 2",
        assignBy: "Jama",
        createdAt: "2025-04-19T03:00:00+03:00",
      },
    ],
    editingItem: null,
    deletingItem: null,
    createAndEditItemForm: false,
    deleteItemModal: false,
  },
  reducers: {
    handleCreateAndEditItem: (state, action) => {
      state.createAndEditItemForm = action.payload;
    },
    handleDeleteItemModal: (state, action) => {
      state.deleteItemModal = action.payload;
    },

    handleDeletingItem: (state, action) => {
      state.deletingItem = action.payload;
    },
    handleEditingItem: (state, action) => {
      state.editingItem = action.payload;
    },

    handleAddDamagedItem: (state, action) => {
      const newDamagedItem = action.payload; // { name: "DamagedItem 2", location: "Location 2" }

      state.damagedItems.push({
        id: state.damagedItems.length + 1,
        createdAt: new Date().toISOString(),
        ...newDamagedItem,
      });
      state.createAndEditItemForm = false;
    },
    handleEditDamagedItem: (state, action) => {
      const { id, updateItem } = action.payload;
      const updatedDamagedItems = state.damagedItems.map((damagedItem) =>
        damagedItem.id === id ? { ...damagedItem, ...updateItem } : damagedItem
      );

      state.damagedItems = updatedDamagedItems;
      state.createAndEditItemForm = false;

      state.editingItem = null;
    },
    handleDeleteDamagedItem: (state, action) => {
      const id = action.payload;
      const filteredDamagedItems = state.damagedItems.filter(
        (damagedItem) => damagedItem.id !== id
      );
      state.damagedItems = filteredDamagedItems;

      state.deletingItem = null;

      state.deleteItemModal = false;
    },

    onCancel: (state) => {
      state.createAndEditItemForm = false; // Opens and closes the create modal
      state.editingItem = null; // opens and closes the edit modal
    },
  },
});

export const {
  handleCreateAndEditItem,
  handleDeleteItemModal,

  handleEditingItem, // Where the editing item is being stored
  handleDeletingItem, // Where deleting item is being stored

  handleAddDamagedItem,
  handleEditDamagedItem,
  handleDeleteDamagedItem,

  onCancel,
} = slice.actions;

export default slice.reducer;
