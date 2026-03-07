import axios from 'axios';
import React, { useEffect } from 'react';



const Requests = () => {
    console.log('requests');
    const [requests, setrequests] = React.useState([]);


    const loadrequests = async () => {
        try {
            const res = await axios.get('http://localhost:1616/connection/requestreceived', { withCredentials: true });
            console.log('requests', res.data.requests);
            setrequests(res.data.requests);
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        loadrequests();
    }, [])

    const onUpdate = async (id: string, status: string) => {
        try
       { const response=await axios.post(`http://localhost:1616/respondtorequest/${id}/${status}`,{}, { withCredentials: true });
        console.log(response.data);
        const updatedrequest=requests.filter((req) => req._id !== id);
        setrequests(updatedrequest);}
        catch (err) {
            console.error(err);
        }
    }
    if (requests.length === 0) return <h1>No requests found</h1>


    return (

        requests.map((req, index) =>

            <div key={req?._id} className="card card-side bg-base-300 shadow-sm w-1/2 m-auto mb-5">
                <figure>
                    <img className='w-20'
                        src={req.fromUserId?.photourl ? req?.fromUserId?.photourl : "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"}
                        alt="Movie" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{req?.fromUserId?.firstName || 'User'}</h2>
                    <p>{req?.fromUserId?.gender}, {req?.fromUserId?.age}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-error" onClick={() => onUpdate(req._id, "rejected")}>Reject</button>
                  <button className="btn btn-secondary" onClick={()=>onUpdate(req._id,"accepted")}>Accept</button>
              </div>
                </div>
            </div>)
    )
}

export default Requests;