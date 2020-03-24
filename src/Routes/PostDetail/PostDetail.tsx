import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import { POST_DETAIL } from "./PostDetail.queries";
import {
  PostDetailVariables,
  PostDetail as PostDetailData
} from "../../types/api";
import PostCard from "../../Components/PostCard";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostDetail: React.FC = () => {
  const { postId } = useParams();
  const { data, loading } = useQuery<PostDetailData, PostDetailVariables>(
    POST_DETAIL,
    {
      variables: { postId: postId! }
    }
  );

  const post = data?.PostDetail?.post;
  console.log(post ? post : "post");
  return (
    <Container>
      {!loading && data && data.PostDetail && (
        <PostCard {...data.PostDetail.post} />
      )}
    </Container>
  );
};

export default PostDetail;
