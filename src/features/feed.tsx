import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import useApi from '../customhooks/useapi';

const Feed = () => {


  const toast = useSelector((state) => state.toast);
  const response = useApi({ url: 'feed', method: 'get' });
  console.log("responsse feed",response);

  if (toast.status===1) return (

    <div className="toast fixed top-4 right-4">
      <div className="alert alert-error">
        <span>{toast.message}</span>
      </div>
    </div>

  )

if(!response?.feed) return <h1>Loading...</h1>
if(response?.feed.length===0)
  return <h1>No more users found</h1>;

  return (

    <div className='flex items-center justify-center h-screen '>
        {toast.error && <div className="toast fixed top-4 right-4">
            <div className="alert alert-error">
                <span>{toast.message}</span>
            </div>
        </div>}
    <Card post={response?.feed[0]} />
    </div>
  )
}



export default Feed