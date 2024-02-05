import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";

const App = () => {
  return (
        <div className="h-screen w-screen bg-gray-400 items-center flex justify-center">
          <Router>
              <Routes>
                <Route path="/signup" element={<Signup />} /> 
                <Route path="/signin" element={<Signin/>} /> 
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/send" element={<SendMoney />} /> 
              </Routes>
        </Router>
        </div>
  );
};

export default App
