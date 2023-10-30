import "./App.css";
import { Route, Routes } from "react-router-dom";
import Blog from "./Blog";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import PostView from "./PostView";
import Signup from "./Signup";
import CommentView from "./CommentView";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      <Route
        path="/blog"
        element={
          <PrivateRoute>
            <Blog />
          </PrivateRoute>
        }
      />
      <Route
        path="/posts/:id"
        element={
          <PrivateRoute>
            <PostView />
          </PrivateRoute>
        }
      />
      <Route
        path="/posts/:id/comments/:id"
        element={
          <PrivateRoute>
            <CommentView />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
