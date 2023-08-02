import { useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { format } from "date-fns";
import { useStoreState, useStoreActions } from "easy-peasy";

const EditPost = () => {
  const history = useHistory();
  const id = useParams();

  const editTitle = useStoreActions((state) => state.editTitle);
  const editBody = useStoreActions((state) => state.editBody);
  const editPost = useStoreActions((state) => state.editPost);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);
  const getPostById = useStoreActions((state) => state.getPostById);

  const post = getPostById(id);

  useEffect(() => {
    if (post) {
      setEditBody(post.body);
      setEditTitle(post.title);
    }
  }, [post, setEditBody, setEditTitle]);

  const handleEdit = (id) => {
    const datetime = format(new Date(), "MMMM dd,yyyy pp");
    const updatePost = { id, title, editTitle, datea };
    history.pusth(`/post/${id}`);
  };

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="button" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, thta is disappointing</p>
          <p>
            <Link to="/">Vist Our HomePage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
