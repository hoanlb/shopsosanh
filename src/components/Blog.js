import React, { useEffect, useState } from 'react';
import { Rounter, Routes, Route, Switch, Link, Outlet } from "react-router-dom";
import axios from 'axios';

function Blog() {
  const [Blogs, setBlogs] = useState([]);

  const getBlog = () => {
    axios
      .get(`https://dummyjson.com/posts`)
      .then((res) => {
        setBlogs(res.data.posts);
      })
      .catch((err) => {
        alert("Can't connect server");
      })
      .finally(() => {
      });
  };
  useEffect(()=>{
    getBlog();
  },[])

  const [Comments, setComments] = useState([]);
  const getComment = () => {
    axios
    .get(`https://dummyjson.com/comments`)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => {
        alert("Can't connect server");
      })
      .finally(() => {
      });
  };
  useEffect(()=>{
    getComment();
  },[])

  return (
    <div className="blog">
      <div className="container">
        <div className="blogs">
          {Blogs.map((blog, index) => {
            return (
              <React.Fragment key={blog.id}>
                <div className="blog">
                  <div className="blog_name">{blog.title}</div>
                  <div className="blog_desc">{blog.body}</div>
                  <div className="comments">
                    {Comments.map((comment, index) => {
                      return (
                        <React.Fragment key={comment.id}>
                          {comment.postId === blog.id ? (
                          <div className="comment">{comment.body} - <i>{comment.user.username}</i></div>
                          ) : ''}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Blog