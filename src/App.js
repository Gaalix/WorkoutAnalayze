import { useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./userContext";
import Header from "./components/header";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import WorkoutData from "./components/WorkoutData";
import QuestionData from "./components/QuestionData";
import HomePage from "./components/HomePage";
import WorkoutInfo from './components/WorkoutInfo';
import Workouts from "./components/Workouts";

function App() {
  const [user, setUser] = useState(
    localStorage.user ? JSON.parse(localStorage.user) : null
  );
  const updateUserData = (userInfo) => {
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  };

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          user: user,
          setUserContext: updateUserData,
        }}
      >
        <div className="App">
          <Header title="Workout"></Header>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Logout" element={<Logout />}></Route>
            <Route path="/Register" element={<Register />}></Route>
            <Route path="/Profile" element={<Profile />}></Route>
            <Route path="/WorkoutData" element={<WorkoutData />}></Route>
            <Route path="/QuestionData" element={<QuestionData />}></Route>
            <Route path="/EditProfile" element={<EditProfile />} />
            <Route path="/WorkoutInfo/:workoutId" element={<WorkoutInfo />}></Route>
            <Route path="/Workouts" element={<Workouts />}></Route>
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
