import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/Auth.js";
import auditReducer from "./Audit/Audit.js";
import userReducer from "./User/User.js";
import storeReducer from "./store/Store.js";
import inventoryReducer from "./inventory/Inventory.js";
import categoryReducer from "./category/Category.js";
import damagedItemReducer from "./damagedItem/damagedItem.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    audit: auditReducer,
    user: userReducer,
    store: storeReducer,
    inventory: inventoryReducer,
    category: categoryReducer,
    damagedItem: damagedItemReducer,
  },
});

export default store;
