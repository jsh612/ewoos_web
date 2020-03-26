import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { Spin, Card } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  CategoryPost,
  CategoryPostVariables,
  CategoryPost_CategoryPost_posts
} from "../../types/api";
import GET_CATEGORY from "./Home.queries";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Home: React.FC = () => {
  const items = 2;

  const { data, loading, fetchMore } = useQuery<
    CategoryPost,
    CategoryPostVariables
  >(GET_CATEGORY, {
    variables: { items, pageNumber: 0 },
    fetchPolicy: "cache-and-network",
    onCompleted: data => {
      console.log("내부 데이터", data);
    }
  });

  const onLoadMore = () => {
    try {
      fetchMore({
        variables: {
          pageNumber: data?.CategoryPost?.posts!.length,
          items
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          const newData = Object.assign({}, prev, {
            CategoryPost: {
              ...prev!.CategoryPost!,
              posts: [
                ...prev!.CategoryPost!.posts!,
                ...fetchMoreResult!.CategoryPost!.posts!
              ]
            }
          });
          console.log("newData", newData);
          return newData;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {!loading && data && data.CategoryPost && data.CategoryPost.posts && (
        <InfiniteScroll
          dataLength={data.CategoryPost.posts.length}
          next={onLoadMore}
          hasMore={true}
          loader={<Spin />}
        >
          {data.CategoryPost.posts.map(post => {
            if (post) {
              return (
                <Card key={post.id}>
                  <Card.Meta key={post.id + "meta"} title={post.title} />
                </Card>
              );
            }
          })}
        </InfiniteScroll>
      )}
    </Container>
  );
};

export default Home;
