import axios from 'axios';
import React, { use } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUserinFeed } from '../slices/feedSlice';
const Card = ({ post }) => {
    const user=useSelector(state=>state.user.user);
    const dispatch=useDispatch();
    console.log("post",post);

    const onUpdate=async(id,status)=>{
        try{
            console.log(`Updating request ${id} with status ${status}`);
            const response = await axios.post(`http://localhost:1616/connectionrequest/${status}/${id}`,{}, { withCredentials: true });
            console.log(response.data);
            dispatch(removeUserinFeed(id));
            
        }
        catch(error){
            console.error("Error updating request:", error);
        }
    }

  return (
      <div className="card bg-base-100 w-96 shadow-sm">
          <figure>
              <img
                  src={post?.photourl ? post.photourl :'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'}
                  alt="Post Image" />
          </figure>
          <div className="card-body">
              <h2 className="card-title">{post?.firstName} {post?.lastName}</h2>
              <p>{post?.age} {post?.gender}</p>
              <p>{(user._id === post._id) ? post?.skills:post?.skills?.join(', ')}</p>
              <div className="card-actions justify-between">
                  <button className="btn btn-warning" onClick={()=>onUpdate(post._id,"ignored")} disabled={(user._id === post._id)}>Not Interested</button>
                  <button className="btn btn-secondary" onClick={() => onUpdate(post._id, "interested")} disabled={(user._id === post._id)}>Interested</button>
              </div>
          </div>
      </div>
  )
}

export default Card