import React, { use } from 'react'
import { useSelector } from 'react-redux'

const Card = ({ post }) => {
    const user=useSelector(state=>state.user.user);
    console.log("post",post);
    
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
                  <button className="btn btn-warning" disabled={(user._id === post._id)}>Not Interested</button>
                  <button className="btn btn-secondary" disabled={(user._id === post._id)}>Interested</button>
              </div>
          </div>
      </div>
  )
}

export default Card