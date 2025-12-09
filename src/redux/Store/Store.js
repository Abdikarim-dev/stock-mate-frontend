import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "store",
  initialState: {
    stores: [
      {
        id: 1,
        name: "Store 1",
        location: "Location 1",
      },
      // {
      //   id: 2,
      //   name: "Store 2",
      //   location: "Location 2",
      // },
      // {
      //   id: 3,
      //   name: "Store 3",
      //   location: "Location 3",
      // },
      // {
      //   id: 4,
      //   name: "Store 4",
      //   location: "Location 4",
      // },
      // {
      //   id: 5,
      //   name: "Store 5",
      //   location: "Location 5",
      // },
    ],
    editingStore: null,
    deletingStore: null,
    createAndEditForm: false,
    deleteModal: false,
  },
  reducers: {
    handleCreateAndEdit: (state, action) => {
      state.createAndEditForm = action.payload;
    },
    handleDeleteStoreModal: (state, action) => {
      state.deleteModal = action.payload;
    },

    handleDeletingStore: (state, action) => {
      state.deletingStore = action.payload;
    },
    handleEditingStore: (state, action) => {
      state.editingStore = action.payload;
    },

    handleAddStore: (state, action) => {
      const newStore = action.payload; // { name: "Store 2", location: "Location 2" }

      state.stores.push({ id: state.stores.length + 1, ...newStore });
      state.createAndEditForm = false;
    },
    handleEditStore: (state, action) => {
      const { id, updatedStore } = action.payload;
      const updatedStores = state.stores.map((store) =>
        store.id === id ? { ...store, ...updatedStore } : store
      );

      state.stores = updatedStores;
      state.createAndEditForm = false;

      state.editingStore = null;
    },
    handleDeleteStore: (state, action) => {
      const id = action.payload;
      const filteredStores = state.stores.filter((store) => store.id !== id);
      state.stores = filteredStores;

      state.deletingStore = null;

      state.deleteModal = false;
    },
    onCancel: (state) => {
      state.createAndEditForm = false;
      state.editingStore = null;
    },
  },
});

export const {
  handleCreateAndEdit,
  handleDeleteStoreModal,

  handleEditingStore,
  handleDeletingStore,

  handleAddStore,
  handleEditStore,
  handleDeleteStore,

  onCancel,
} = slice.actions;

export default slice.reducer;
