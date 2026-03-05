import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './footer'
import axios from 'axios'
import { addUser } from '../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect ,useState} from 'react'
const Body = () => {
  console.log('Rendering Body component');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getprofile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1616/getprofile",
        { withCredentials: true }
      );
      console.log('Profile response:', response);

      dispatch(addUser(response.data.profile));

    } catch (err) {

      if (err.response?.status === 401) {
        navigate("/login");
      }

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect in Body component called', { user });
    if (!user) {
      getprofile();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body