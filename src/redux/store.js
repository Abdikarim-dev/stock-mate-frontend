import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/Auth.js";
import auditReducer from "./Audit/Audit.js";
import userReducer from "./User/User.js";
import storeReducer from "./Store/Store.js";
import inventoryReducer from "./ImportAndExportItem/ImportAndExportItem.js";
import categoryReducer from "./Item/Item.js";
import damagedItemReducer from "./DamagedItem/DamagedItem.js";
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
