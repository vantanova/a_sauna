import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { restoreUser } from "./store/session";
import TaskForm from "./components/auth/TaskForm";
import Home from "./components/Home";
import Calendar from "./components/Calendar";
import Project from "./components/Project";
import ProjectForm from "./components/auth/ProjectForm";

function App() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  // const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => {
      setLoaded(true);
    });
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <ProtectedRoute path="/tasks" exact={true}>
          <TaskForm />
        </ProtectedRoute>
        <ProtectedRoute path="/calendar" exact={true}>
          <Calendar></Calendar>
        </ProtectedRoute>
        <Route path="/project" exact={true}>
          <ProjectForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <Home></Home>
        </ProtectedRoute>
        <ProtectedRoute path="/project/:id" exact={true}>
          <Project></Project>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
