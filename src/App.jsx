import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import Logout from "@/pages/auth/Logout";
function App() {


  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      <Route path="/" element={<Navigate to="/dashboard/home" replace />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default App;
