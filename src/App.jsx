import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<YourMainComponent />} />
        <Route path="/signin" element={<YourMainComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 