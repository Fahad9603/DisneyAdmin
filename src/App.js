import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/Users/User_List";
import Single from "./pages/Users/User_Details";
import User from "./pages/Users/Create_User";
import Pub_Movies from "./pages/Movie/Moives";
import MoviesList from "./pages/Movie/Movie_List";
import Pub_Slider from "./pages/Images_Slider/Slider";
import SliderList from "./pages/Images_Slider/Slider_List";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieInputs, userInputs,SliderInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="Create_User"
                element={
                  <RequireAuth>
                    <User inputs={userInputs} title="Add New User" />
                  </RequireAuth>
                }
              />
              
            </Route>
            <Route path="ImageSlider">
              <Route
                index
                element={
                  <RequireAuth>
                    <SliderList />
                  </RequireAuth>
                }
              />
              
              <Route
                path=":SliderId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="ImageSlider"
                element={
                  <RequireAuth>
                    <Pub_Slider inputs={SliderInputs} title="Image Slider" />
                  </RequireAuth>
                }
              /> 
            </Route>
            <Route path="Movies">
              <Route
                index
                element={
                  <RequireAuth>
                    <MoviesList />
                  </RequireAuth>
                }
              />
              
              <Route
                path=":MovieId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="Movies"
                element={
                  <RequireAuth>
                    <Pub_Movies inputs={MovieInputs} title="Movie Collection" />
                  </RequireAuth>
                }
              /> 
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
