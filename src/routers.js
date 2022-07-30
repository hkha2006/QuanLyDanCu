import React from "react";
import {Dashboard, Feedback, Form, News, Setting, Users, ErrorPage, Login, Logout} from "./Pages"

const routes = [
  {
    path: "administrator/dashboard",
    component: () => <Dashboard />,
  },
  {
    path: "administrator/feedback",
    component: () => <Feedback/>
  },
  {
    path: "administrator/form",
    component: () => <Form/>
  },
  {
    path: "administrator/news",
    component: () => <News/>
  },
  {
    path: "administrator/setting",
    component: () => <Setting/>
  },
  {
    path: "administrator/users",
    component: () => <Users/>
  },
  {
    path: "/login",
    component: () => <Login/>
  },
  {
    path: "/logout",
    component: () => <Logout/>
  },
  {
    path: "/*",
    component: () => <ErrorPage />,
  },
];

export default routes;
