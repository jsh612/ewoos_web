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
import { TTheme } from "../../Styles/theme";
import { Spin } from "antd";

interface ISProps {
  theme: TTheme;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${(props: ISProps) => props.theme.basicMarginTop};
`;

const PostDetail: React.FC = () => {
  const { postId } = useParams();
  const { data, loading } = useQuery<PostDetailData, PostDetailVariables>(
    POST_DETAIL,
    {
      variables: { postId: postId! }
    }
  );

  console.log("data", data);
  return (
    <Container>
      {!loading && data && data.PostDetail ? (
        <PostCard {...data.PostDetail.post} />
      ) : (
        <Spin size="large" />
      )}
    </Container>
  );
};

export default PostDetail;
