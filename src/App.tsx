import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Body from './components/Body';
import Profile from './components/Profile';
import Login from './components/Login';
import { Provider } from 'react-redux';
import store from './store';
import Feed from './features/feed';

function App() {
  console.log('Rendering App component');

  return (
    <>
    <Provider store={store}>
    <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' element={<Body />}>
      <Route path='/profile' element={<Profile />} />
      <Route path='/login' element={<Login />} />
      <Route path='/feed' element={<Feed/>} />
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
       </>
  )
}

export default App
