import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Import your actual component - adjust the import path as needed
import SignIn from './components/SignIn';  // or whatever your component is named

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 