import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Link } from "react-router-dom";
import performRequest from "../Services/restCalls";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const Blog = () => {
  const [postContent, setPostContent] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [posts, setPosts] = useState(null);
  const createPostDto = {
    text: postContent,
  };

  useEffect(() => {
    performRequest("/api/posts", "GET", jwt).then((postsData) => {
      setPosts(postsData);
    });
  }, []);

  function createPost() {
    performRequest("/api/posts", "POST", jwt, createPostDto).then((data) => {
      window.location.href = "/blog";
    });
  }

  function deletePost(postId) {
    performRequest(`/api/posts/${postId}`, "DELETE", jwt).then((data) => {
      window.location.href = "/blog";
    });
  }

  return (
    <>
      <Container className="mt-5 w-25 justify-content-md-center">
        <Row>
          <Col>
            <Form.Label htmlFor="content">Content</Form.Label>
            <Form.Control
              type="text"
              id="text"
              placeholder="Type your post content"
              value={postContent}
              onChange={(event) => setPostContent(event.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mt-2">
            <Button onClick={() => createPost()}>Create post</Button>
            {posts ? (
              posts.map((post) => (
                <Row key={post.id}>
                  <Col>
                    <Card>
                      <Card.Body>
                        <Card.Title>Post id: {post.id}</Card.Title>
                        <Card.Text>{post.text}</Card.Text>
                        <Button
                          onClick={() =>
                            (window.location.href = `/posts/${post.id}`)
                          }
                          variant="primary"
                        >
                          Add comment
                        </Button>
                        <Button
                          id="delete"
                          type="button"
                          onClick={() => deletePost(post.id)}
                        >
                          Delete post
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

export default Blog;
