import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Addnewblog from "./Pages/Addnewblog";
import Blogcontext from "./BlogContext.js";
import { useEffect, useState } from "react";
import axios from "axios";
import EditBlog from "./Pages/EditBlog.jsx";

function App() {
  const [blogPost, setBlogPost] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5175/blogs")
      .then((res) => {
        setBlogPost(res.data);
        console.log("Successfull fetch data");
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Blogcontext.Provider value={blogPost}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newblog" element={<Addnewblog />} />
          <Route path="/edit/:id" element={<EditBlog />} />
        </Routes>
      </BrowserRouter>
    </Blogcontext.Provider>
  );
}

export default App;
