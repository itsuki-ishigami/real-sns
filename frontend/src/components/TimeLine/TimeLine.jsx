import React, { useContext, useEffect, useState } from 'react';
import "./TimeLine.css";
import Share from"../Share/Share";
import Post from '../Post/Post';
// import{ Posts } from "../../dummyData";
import axios from "axios";
import { AuthContext } from '../../state/AuthContext';

export default function TimeLine({username}) {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => { //useEffectのコールバック関数に直接asyncをつけることはできない
      const response = username
      ? await axios.get(`/posts/profile/${username}`) //プロフィールの場合
      : await axios.get(`/posts/timeline/${user._id}`); //ホームの場合
      // console.log(response);
      setPosts(
        response.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => ( //mapは配列の全ての要素を変換して新しい配列を返す（変える）
          <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}
