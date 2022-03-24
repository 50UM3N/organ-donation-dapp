import { Routes, Route } from "react-router-dom";
function App() {
    return (
        <Routes>
            <Route path="/login" element={<p>login</p>} />
        </Routes>
    );
}

export default App;
