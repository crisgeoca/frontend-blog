import React, { useEffect, useState } from "react";
import performRequest from "../Services/restCalls";
import { useLocalState } from "../util/useLocalStorage";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const CommentView = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const postId = window.location.href
    .split("/posts/")[1]
    .split("/comments/")[0];
  const [comment, setComment] = useState("");
  const commentId = window.location.href.split("/comments/")[1];

  function updateComment() {
    const createCommentDto = {
      text: comment,
      postId: postId,
    };
    console.log(postId);
    console.log(commentId);
    performRequest(
      `/api/comments/${commentId}`,
      "PUT",
      jwt,
      createCommentDto
    ).then((data) => {
      setComment(data);
    });
  }

  useEffect(() => {
    performRequest(`/api/comments/${commentId}`, "GET", jwt).then((data) => {
      setComment(data);
    });
  }, []);  

  return (
    <>
      <Container className="mt-5 w-25 justify-content-md-center">
        <Row>
          <Col className="mt-2">
            <h2>Comment id: {commentId}</h2>
            {comment ? (
              <>
                <Form.Label htmlFor="comment">Comment Content:</Form.Label>
                <Form.Control
                  type="text"
                  id="comment"
                  placeholder="Type your comment content to update"
                  value={comment.text}
                  onChange={(event) => setComment(event.target.value)}
                />
                <Button
                  id="submit"
                  type="button"
                  onClick={() => updateComment()}
                >
                  Update comment content
                </Button>                
              </>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CommentView;
