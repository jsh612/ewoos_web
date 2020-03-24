import React from "react";
import { useParams } from "react-router-dom";

const Post: React.FC = () => {
  const { postId } = useParams();
  return <div>개별 포스트입니다.{postId}</div>;
};

export default Post;
