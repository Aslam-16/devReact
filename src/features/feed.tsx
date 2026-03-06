import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFeed } from '../slices/feedSlice';
import Card from '../components/Card';

const Feed = () => {


  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed.feed);
  console.log("feed",feed);

  const loadFeed = async () => {
    const response= await axios.get('http://localhost:1616/feed', {withCredentials: true})
    console.log('Feed response:', response);
    dispatch(setFeed(response.data.feed));


  console.log('Rendering Feed component');
  }

  useEffect(() => {
    console.log('useEffect in Feed component called', { feed });
    loadFeed();
  }, [])


if(feed.length===0)
  return <h1>No more users found</h1>;

  return (
    <div className='flex items-center justify-center h-screen '>
    <Card post={feed[0]} />
    </div>
  )
}



export default Feed