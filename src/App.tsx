import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Body from './components/Body';
import Profile from './components/Profile';
import Login from './components/Login';
import { Provider } from 'react-redux';
import store from './store';

function App() {

  return (
    <>
    <Provider store={store}>
    <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' element={<Body />}>
      <Route path='/profile' element={<Profile />} />
      <Route path='/login' element={<Login />} />
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
       </>
  )
}

export default App
