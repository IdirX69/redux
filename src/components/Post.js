import React, { useRef, useState } from "react";
import Like from "./Like";
import { isEmpty } from "./Utils";
import { useDispatch, useSelector } from "react-redux";
import { editPost, getPosts } from "../actions/post.action";

const Post = ({ post }) => {
  const [editToggle, setEditToggle] = useState(false);
  const user = useSelector((state) => state.userReducer);
  const form = useRef();
  const [editContent, setEditContent] = useState(post.content);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const editData = {
      author: user.pseudo,
      title: post.title,
      content: editContent,
      likes: post.likes,
      id: post.id,
    };
    await dispatch(editPost(editData, post.id));
    dispatch(getPosts());
    setEditToggle(false);
  };
  return (
    <div className="post">
      {!isEmpty(user) && user.pseudo === post.author && (
        <div className="edit-delete">
          <img
            src="./icons/edit.svg"
            alt="edit"
            onClick={() => setEditToggle(!editToggle)}
          />
          <img src="./icons/delete.svg" alt="delete" />
        </div>
      )}

      <h2>{post.title}</h2>
      <img
        src="https://picsum.photos/1500/400"
        className="post-img"
        alt="img-post"
      />

      {editToggle ? (
        <form ref={form} onSubmit={(e) => handleSubmit(e)}>
          <textarea
            onChange={(e) => setEditContent(e.target.value)}
            autoFocus={true}
            defaultValue={post.content}
          ></textarea>
          <input type="submit" value="Valider modification" />
        </form>
      ) : (
        <p>{post.content}</p>
      )}

      <div className="author">
        <h5>{post.author}</h5>
        <Like post={post} />
      </div>
    </div>
  );
};

export default Post;
