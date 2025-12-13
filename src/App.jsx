import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import User from "./pages/User";
import Home from "./pages/Home";
import ImportItem from "./pages/ImportItem";
import AuditLog from "./pages/AuditLog";
import Store from "./pages/Store";
import DamageItem from "./pages/DamageItem";
import DashboardLayout from "./components/DashboardLayout";
import Item from "./pages/Item";
import ExportItem from "./pages/ExportItem";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
          
            {/* Admin-only routes */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="user" element={<User />} />
              <Route path="item" element={<Item />} />
              <Route path="audit-log" element={<AuditLog />} />
              <Route path="store" element={<Store />} />
            </Route>

            {/* Admin+Staff routes */}
            <Route
              element={<ProtectedRoute allowedRoles={["ADMIN", "STAFF"]} />}
            >
              <Route path="import-item" element={<ImportItem />} />
              <Route path="export-item" element={<ExportItem />} />
              <Route path="damage-item" element={<DamageItem />} />
              <Route path="user-profile" element={<Profile />} />
              <Route index element={<Home />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
