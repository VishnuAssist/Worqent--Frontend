
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard/index";
// import Article from "./pages/Article";
// import Employee_Management from "./pages/Employee_Management";

// const Router: React.FC = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/dashboard" replace />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/article" element={<Article/>} />
//      <Route path="employee_Management" element={<Employee_Management/>} />
//     </Routes>
//   );
// };

// export default Router;

// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Article from "./pages/Article";
// import Employee_Management from "./pages/Employee_Management";
// import Login from "./pages/Login/Login";
// import ProtectedRoute from "./ProtectedRoute";


// const Router: React.FC = () => {
//   return (
//     <Routes>
//       {/* Initial route */}
//       <Route path="/" element={<Navigate to="/login" replace />} />

//       {/* Public */}
//       <Route path="/login" element={<Login />} />

//       {/* Protected */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute allowedRoles={["ADMIN"]}>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/article"
//         element={
//           <ProtectedRoute allowedRoles={["ADMIN", "EMPLOYEE"]}>
//             <Article />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/employee_Management"
//         element={
//           <ProtectedRoute allowedRoles={["ADMIN"]}>
//             <Employee_Management />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// };

// export default Router;


// src/Router.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard";
import Article from "./pages/Article";
import Employee_Management from "./pages/Employee_Management";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "./Layout/AuthLayout";
import AppLayout from "./Layout/AppLayout";

const Router = () => {
  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* AUTH (NO SIDEBAR / HEADER) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* APP (SIDEBAR + HEADER) */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/article" element={<Article />} />
        <Route
          path="/employee_Management"
          element={<Employee_Management />}
        />
      </Route>
    </Routes>
  );
};

export default Router;
