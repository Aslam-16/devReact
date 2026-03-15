import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import useApi from '../customhooks/useapi';

const Feed = () => {


  const toast = useSelector((state) => state.toast);
  const response = useApi({ url: 'feed', method: 'get' });
  console.log("responsse feed",response);


if(!response?.feed) return <h1>Loading...</h1>
if(response?.feed.length===0)
  return <h1>No more users found</h1>;

  return (

    <div className='flex items-center justify-center h-screen '>
    <Card post={response?.feed[0]} />
    </div>
  )
}



export default Feed