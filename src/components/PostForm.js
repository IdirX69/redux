import React, { useRef } from "react";

const PostForm = () => {
  const form = useRef();
  const handleForm = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="form-container">
      <form ref={form} onSubmit={(e) => handleForm(e)}>
        <input type="text" placeholder="Titre du poste" />
        <textarea placeholder="Postez vos pensées..."></textarea>
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default PostForm;
