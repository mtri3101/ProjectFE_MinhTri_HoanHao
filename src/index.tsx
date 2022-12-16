import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as HistoryRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import { store } from './Redux/ConfigStore';
import HomeTemplate from './Templates/HomeTemplate';
import { Provider } from 'react-redux';
import Search from './Pages/Search';
import CourseByCategory from './Pages/CourseByCategory';
import Detail from './Pages/Detail';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import MyCourse from './Pages/MyCourse';




export const history: any = createBrowserHistory()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
  <HistoryRouter history={history}>
    <Routes>
      <Route path="" element={<HomeTemplate />}>
        <Route index element={<Home />}></Route>
        <Route path='home' element={<Home />}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='profile' element={<Profile />}></Route>
      </Route>
    </Routes>
  </HistoryRouter>
  </Provider>
);


