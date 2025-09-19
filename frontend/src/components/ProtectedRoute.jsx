// // import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// // import { AuthContext } from "../context/AuthContext";
//
// export default function ProtectedRoute({ children }) {
//     // const { user } = useContext(AuthContext);
//     // return user ? children : <Navigate to="/login" />;
//     const token = localStorage.getItem("token");
//     return token ? children : <Navigate to="/login" />;
// }
//
// // import React from "react";
// // // import { Navigate } from "react-router-dom";
// //
// // const PrivateRoute = ({ children }) => {
// //     const token = localStorage.getItem("token");
// //     return token ? children : <Navigate to="/login" />;
// // };
// //
// // export default PrivateRoute;
//

import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/auth" replace />;
    return children;
}

