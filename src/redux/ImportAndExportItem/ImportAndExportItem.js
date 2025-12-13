import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const slice = createSlice({
  name: "inventory",
  initialState: {
    // alerts: [
    //   {
    //     id: 3,
    //     itemId: 3,
    //     title: "Item Alert",
    //     description: `Warning: The quantity of Bataati in Siinaay Store is low. Only 10 left.`,
    //   }
    // ],
    items: [
      {
        id: 1,
        name: "Item 1",
        qoh: 500,
        store: "Store 1",
        importer: "Importer 1",
        createdAt: "2025-04-19T03:00:00+03:00",
      },
      {
        id: 2,
        name: "Item 2",
        qoh: 500,
        store: "Store 2",
        importer: "Importer 2",
        createdAt: "2025-02-18T03:00:00+03:00",
      },
      {
        id: 3,
        name: "Item 3",
        qoh: 500,
        store: "Store 3",
        importer: "Importer 3",
        createdAt: "2025-04-18T03:00:00+03:00",
      },
      {
        id: 4,
        name: "Item 4",
        qoh: 500,
        store: "Store 4",
        importer: "Importer 4",
        createdAt: "2025-04-17T03:00:00+03:00",
      },
      {
        id: 5,
        name: "Item 5",
        qoh: 500,
        store: "Store 5",
        importer: "Importer 5",
        createdAt: "2025-04-01T03:00:00+03:00",
      },
      {
        id: 6,
        name: "Item 4",
        quantity: 200,
        store: "Store 4",
        exporter: "Exporter 4",
        createdAt: "2025-04-19T03:00:00+03:00",
      },
      {
        id: 7,
        name: "Item 3",
        quantity: 200,
        store: "Store 3",
        exporter: "Exporter 3",
        createdAt: "2025-04-19T03:00:00+03:00",
      },
      {
        id: 8,
        name: "Item 2",
        quantity: 200,
        store: "Store 2",
        exporter: "Exporter 2",
        createdAt: "2025-04-19T03:00:00+03:00",
      },
    ],
    editingItem: null,
    deletingItem: null,
    createAndEditItemForm: false,
    deleteItemModal: false,

    editingExportedItem: null,
    deletingExportedItem: null,
    createAndEditItemExportedForm: false,
    deleteItemExportedModal: false,
  },
  reducers: {
    handleCreateAndEditExportedItem: (state, action) => {
      state.createAndEditItemExportedForm = action.payload;
    },
    handleDeleteItemExportedModal: (state, action) => {
      state.deleteItemExportedModal = action.payload;
    },

    handleDeletingExportedItem: (state, action) => {
      state.deletingExportedItem = action.payload;
    },
    handleEditingExportedItem: (state, action) => {
      state.editingExportedItem = action.payload;
    },

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

    handleAddItem: (state, action) => {
      const newItem = action.payload; // { name: "Item 2", location: "Location 2" }

      const item = state.items.find(
        (item) => item.name === newItem.name && item.store === newItem.store
      ); // Reference the item in the state

      if (item) {
        item.qoh += Number(newItem.qoh); // Immer will take care of the immutability
        item.importer = newItem.importer; // Update the importer
        item.createdAt = new Date().toISOString(); // Update the createdAt date

        if (item.qoh <= 30) {
          const alert = state.alerts.find((alert) => alert.itemId === item.id);
          if (alert) {
            // If the alert already exists, update it
            alert.description = `Warning: The quantity of ${item.name} in ${item.store} is low. Only ${item.qoh} left.`;
          } else {
            const itemAlert = {
              id: state.alerts.length + 1,
              itemId: item.id,
              title: "Item Alert",
              description: `Warning: The quantity of ${item.name} in ${item.store} is low. Only ${item.qoh} left.`,
            };
            state.alerts.push(itemAlert);
            console.log(itemAlert);
          }
        } else {
          const newAlerts = state.alerts.filter(
            (alert) => alert.itemId !== item.id
          );
          state.alerts = newAlerts;
          console.log("Item quantity is sufficient, no alert needed.");
        }
      } else {
        state.items.push({
          id: state.items.length + 1,
          createdAt: new Date().toISOString(),
          ...newItem,
        });
      }
      state.createAndEditItemForm = false;
    },
    handleEditItem: (state, action) => {
      const { id, updatedItem } = action.payload;
      const updatedItems = state.items.map((Item) =>
        Item.id === id ? { ...Item, ...updatedItem } : Item
      );

      state.items = updatedItems;
      state.createAndEditItemForm = false;

      state.editingItem = null;
    },
    handleDeleteItem: (state, action) => {
      const id = action.payload;
      const filteredItems = state.items.filter((item) => item.id !== id);
      state.items = filteredItems;

      state.deletingItem = null;

      state.deleteItemModal = false;
    },
    handleAddExportedItem: (state, action) => {
      const itemToBeExported = action.payload; // { name: "Item 2", location: "Location 2" }

      if (
        Number(itemToBeExported?.qoh) >=
        Number(itemToBeExported?.exportedData?.quantity)
      ) {
        const item = state.items.find(
          (item) =>
            item.id === itemToBeExported.id &&
            item.store === itemToBeExported.store
        ); // Reference the item in the state
        if (item) {
          item.qoh -= Number(itemToBeExported?.exportedData?.quantity); // Immer will take care of the immutability
          if (item.qoh <= 30) {
            const itemAlert = {
              id: state.alerts.length + 1,
              itemId: item.id,
              title: "Item Alert",
              description: `Warning: The quantity of ${item.name} in ${item.store} is low. Only ${item.qoh} left.`,
            };
            state.alerts.push(itemAlert);
            console.log(itemAlert);
          }
        } else {
          console.log("Item not found in the inventory.");
        }
      } else {
        toast.error("Quantity on hand is less than the quantity to export");
        return;
      }

      state.items.push({
        id: state.items.length + 1,
        createdAt: new Date().toISOString(),
        ...itemToBeExported?.exportedData,
      });
      state.createAndEditItemExportedForm = false;
    },
    handleEditExportedItem: (state, action) => {
      const { id, updatedItem } = action.payload;
      const updatedItems = state.items.map((Item) =>
        Item.id === id ? { ...Item, ...updatedItem } : Item
      );

      state.items = updatedItems;
      state.createAndEditItemExportedForm = false;

      state.editingExportedItem = null;
    },
    handleDeleteExportedItem: (state, action) => {
      const id = action.payload;
      const filteredItems = state.items.filter((item) => item.id !== id);
      state.items = filteredItems;

      state.deletingExportedItem = null;

      state.deleteItemExportedModal = false;
    },
    onCancel: (state) => {
      state.createAndEditItemForm = false;
      state.editingItem = null;
    },
    onExportedCancel: (state) => {
      state.createAndEditItemExportedForm = false;
      state.editingExportedItem = null;
    },

    // Reducer for damaged subtracting the amount damaged
    handleSubtractingAmountDamaged: (state, action) => {
      const damagedItem = action.payload; // { name: "Item 2", location: "Location 2" }
      console.log(damagedItem);

      const item = state.items.find(
        (item) =>
          item.name === damagedItem.name && item.store === damagedItem.store
      );

      if (item) {
        if (Number(item.qoh) >= Number(damagedItem.quantity)) {
          item.qoh -= Number(damagedItem.quantity); // Immer will take care of the immutability
        } else {
          console.log(
            "Not enough quantity in stock to subtract the damaged amount."
          );
          return;
        }
      } else {
        const itemToEdit = state.items.find((i) => i.id === damagedItem.id);

        if (damagedItem.oldQuantity > damagedItem.newQuantity) {
          const diff = damagedItem.oldQuantity - damagedItem.newQuantity;
          itemToEdit.qoh = itemToEdit.qoh + diff;
        } else if (damagedItem.oldQuantity < damagedItem.newQuantity) {
          const diff = damagedItem.newQuantity - damagedItem.oldQuantity;
          itemToEdit.qoh = itemToEdit.qoh - diff; // 450 - 50 = 400
          if (itemToEdit.qoh <= 30) {
            const itemAlert = {
              id: state.alerts.length + 1,
              itemId: itemToEdit.id,
              title: "Item Alert",
              description: `Warning: The quantity of ${itemToEdit.name} in ${itemToEdit.store} is low. Only ${itemToEdit.qoh} left.`,
            };
            state.alerts.push(itemAlert);
            console.log(itemAlert);
          }
        } else {
          console.log("both are equal");
        }
      }
    },
  },
});
// create
// {
//   id
//   name
//   store
//   quantity
// }
// edit
// {
//   id
//   newQuantity
//   oldQuantity
// }

export const {
  handleCreateAndEditItem,
  handleDeleteItemModal,

  handleEditingItem,
  handleDeletingItem,

  handleAddItem,
  handleEditItem,
  handleDeleteItem,

  onCancel,

  handleCreateAndEditExportedItem,
  handleDeleteItemExportedModal,
  handleDeletingExportedItem,
  handleEditingExportedItem,

  handleAddExportedItem,
  handleEditExportedItem,
  handleDeleteExportedItem,

  handleSubtractingAmountDamaged,

  onExportedCancel,
} = slice.actions;

export default slice.reducer;
