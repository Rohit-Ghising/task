import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Task1Component from "./components/Task1Component";
import Task2Component from "./components/Task2Component";
import Task3Component from "./components/Task3Component";
import Task4Component from "./components/Task4Component";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Styled Navbar */}
        <nav className="flex flex-wrap justify-center gap-4 mb-4 p-4 bg-white rounded-xl shadow-md">
          <Link to="/task1" className="px-4 py-2 rounded-lg font-semibold text-blue-600 hover:bg-blue-100 hover:shadow-sm transition-all duration-300">
            Task 1
          </Link>
          <Link to="/task2" className="px-4 py-2 rounded-lg font-semibold text-blue-600 hover:bg-blue-100 hover:shadow-sm transition-all duration-300">
            Task 2
          </Link>
          <Link to="/task3" className="px-4 py-2 rounded-lg font-semibold text-blue-600 hover:bg-blue-100 hover:shadow-sm transition-all duration-300">
            Task 3
          </Link>
          <Link to="/task4" className="px-4 py-2 rounded-lg font-semibold text-blue-600 hover:bg-blue-100 hover:shadow-sm transition-all duration-300">
            Task 4
          </Link>
        </nav>

        {/* Message under navbar */}
        <div className="text-center text-lg text-gray-700 mb-6">
          Go through the above buttons to view tasks.
        </div>

        {/* Routes */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <Routes>
            <Route path="/task1" element={<Task1Component />} />
            <Route path="/task2" element={<Task2Component />} />
            <Route path="/task3" element={<Task3Component />} />
            <Route path="/task4" element={<Task4Component />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
