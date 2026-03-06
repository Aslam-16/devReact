import axios from 'axios';
import React, { useEffect } from 'react';



const Connections = () => {
    console.log('connections');
    const [connections,setconnections]=React.useState([]);
    

    const loadconnections=async () => {
        try{
        const res=await axios.get('http://localhost:1616/connections',{withCredentials:true});
        console.log('connections',res.data.connections);
        setconnections(res.data.connections);
        }
        catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        loadconnections();
    },[])

if(connections.length===0) return <h1>No connections found</h1>


  return (

      connections.map((connection,index)=>
        
        <div key={connection?._id}className="card card-side bg-base-300 shadow-sm w-1/2 m-auto mb-5">
          <figure>
              <img className='w-20'
                  src={connection?.photourl ? connection?.photourl : "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"}
                  alt="Movie" />
          </figure>
          <div className="card-body">
              <h2 className="card-title">{connection?.firstName || 'User'}</h2>
              <p>{connection?.gender}, {connection?.age}</p>
              {/* <div className="card-actions justify-end">
                  <button className="btn btn-primary">Watch</button>
              </div> */}
          </div>
      </div>)
  )
}

export default Connections