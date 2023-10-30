import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import performRequest from "../Services/restCalls";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const PostView = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const postId = window.location.href.split("/posts/")[1];
  const [post, setPost] = useState({
    text: "",
  });
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(null);

  function updatePost() {
    const createPostDto = {
      text: post,
    };
    performRequest(`/api/posts/${postId}`, "PUT", jwt, createPostDto).then(
      (data) => {
        setPost(data);
      }
    );
  }

  useEffect(() => {
    performRequest(`/api/posts/${postId}`, "GET", jwt).then((data) => {
      setPost(data);
    });
  }, []);

  function createComment() {
    const createCommentDto = {
      text: comment,
      postId: postId,
    };
    performRequest("/api/comments", "POST", jwt, createCommentDto).then(
      (data) => {
        window.location.href = `/posts/${postId}`;
      }
    );
  }

  useEffect(() => {
    performRequest(`/api/comments/${postId}/all`, "GET", jwt).then(
      (commentsData) => {
        setComments(commentsData);
      }
    );
  }, []);

  function deleteComment(commentId) {
    performRequest(`/api/comments/${commentId}`, "DELETE", jwt).then((data) => {
      window.location.href = `/posts/${postId}`;
    });
  }

  return (
    <>
      <Container className="mt-5 w-25 justify-content-md-center">
        <Row>
          <Col className="mt-2">
            <h2>Post id: {postId}</h2>
            {post ? (
              <>
                <Form.Label htmlFor="content">Post Content:</Form.Label>
                <Form.Control
                  type="text"
                  id="content"
                  placeholder="Type your post content to update"
                  value={post.text}
                  onChange={(event) => setPost(event.target.value)}
                />
                <Button id="submit" type="button" onClick={() => updatePost()}>
                  Update post content
                </Button>
              </>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <Row>
          <Col className="mt-2">
            <Form.Label htmlFor="comment">Comment Content:</Form.Label>
            <Form.Control
              type="text"
              id="comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <Button onClick={() => createComment()}>Create comment</Button>
            {comments ? (
              comments.map((comment) => (
                <Row key={comment.id}>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Card.Title>Comment id: {comment.id}</Card.Title>
                        <Card.Text>{comment.text}</Card.Text>
                        <Button
                          onClick={() =>
                            (window.location.href = `/posts/${post.id}/comments/${comment.id}`)
                          }
                          variant="primary"
                        >
                          Edit comment
                        </Button>
                        <Button
                          id="delete"
                          type="button"
                          onClick={() => deleteComment(comment.id)}
                        >
                          Delete comment
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              ))
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PostView;
