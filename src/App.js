import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoursePreview from "./pages/CoursePreview";
import Home from "./pages/Home";
import Video from "./pages/Video";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path="/curso/:id" element={<CoursePreview />} />
        <Route path='/learn/:curso/:video' element={<Video />} />
      </Routes>
    </Router>
  );
}

export default App;
