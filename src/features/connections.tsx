import useApi from '../customhooks/useapi';
import { useSelector } from 'react-redux';



const Connections = () => {
    console.log('connections');
    const response = useApi({ url: 'connections', method: 'get' });
    console.log('response connections', response);
    const toast = useSelector((state) => state.toast);

    if (toast.error) return (

        <div className="toast fixed top-4 right-4">
            <div className="alert alert-error">
                <span>{toast.message}</span>
            </div>
        </div>

    )

if(toast.status===1) return (
    <div className="toast fixed top-4 right-4">
        <div className="alert alert-error">
            <span>{toast.message}</span>
        </div>
    </div>
)

if(!response?.connections) return <h1>Loading...</h1>
if(response?.connections.length===0) return <h1>No connections found</h1>


  return (
    <>
    

      {
          toast.error && <div className="toast fixed top-4 right-4">
              <div className="alert alert-error">
                  <span>{toast.message}</span>
              </div>
          </div>}
      
      {response?.connections.map((connection,index)=>
        
        <div key={connection?._id}className="card card-side bg-base-300 shadow-sm w-1/2 m-auto mb-5">
          <figure>
              <img className='w-20'
                  src={connection?.photourl ? connection?.photourl : "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"}
                  alt="Movie" />
          </figure>
          <div className="card-body">
              <h2 className="card-title">{connection?.firstName || 'User'}</h2>
              <p>{connection?.gender}, {connection?.age}</p>
          </div>
      </div>)
}
</>
  )

}

export default Connections