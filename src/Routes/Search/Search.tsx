import React from "react";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { useQuery } from "@apollo/react-hooks";

import { SEARCH } from "./Search.queries";
import { Search } from "../../types/api";
import InfiniteScroll from "react-infinite-scroll-component";
import { ISProps } from "../../types/custom";
import { Card, Spin } from "antd";

const Container = styled.div`
  margin-top: 10px;
  width: 80vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SInfiniteScroll = styled(InfiniteScroll)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-gap: 20px;
  padding: 10px;
  justify-items: center;
  width: ${(props: ISProps) => props.theme.basciWidth};
  height: 400px;
`;

const SCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 200px;
  height: 300px;
  box-shadow: 1px 1px 10px black;
  > .ant-card-body {
    padding: 5px 5px 15px;
  }
`;

const CardImg = styled.img`
  width: 200px;
  height: 200px;
`;

const CardTittl = styled.p`
  font-weight: 800;
  padding: 0px 3px;
`;

const Message = styled.div`
  font-weight: 900;
`;

const SearchContainer: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const { term } = queryString.parse(location.search); // 입력 받은 검색어
  const items = 10; // 쿼리 당 가져올 post 갯수

  const { data, loading, fetchMore } = useQuery<Search>(SEARCH, {
    variables: {
      term,
      items,
      pageNumber: 0
    },
    fetchPolicy: "cache-and-network"
  });

  const onLoadMore = () => {
    try {
      fetchMore({
        variables: {
          pageNumber: data?.SearchPost?.posts!.length,
          items,
          term
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          // updateQuery를 통해 기존 data에 새로운 data 추가
          if (fetchMoreResult?.SearchPost?.error) return prev;
          return Object.assign({}, prev, {
            SearchPost: {
              ...prev!.SearchPost!,
              posts: [
                ...prev!.SearchPost!.posts!,
                ...fetchMoreResult!.SearchPost!.posts!
              ]
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onClick = (postId: string) => () => {
    history.push(`/post/${postId}`);
  };

  console.log("data", data);
  return (
    <Container>
      <>
        {!loading ? (
          data &&
          data.SearchPost &&
          data.SearchPost.posts &&
          data.SearchPost.posts!.length !== 0 ? (
            <SInfiniteScroll
              dataLength={data.SearchPost!.posts!.length}
              next={onLoadMore}
              hasMore={true}
              loader={null}
            >
              {data.SearchPost!.posts!.map(post => {
                if (post) {
                  return (
                    <SCard
                      onClick={onClick(post.id)}
                      key={post.id}
                      cover={
                        <CardImg alt="상품 사진" src={post!.files![0]!.url} />
                      }
                      hoverable
                    >
                      <CardTittl>{post.title}</CardTittl>
                    </SCard>
                  );
                }
                return null;
              })}
            </SInfiniteScroll>
          ) : (
            <Message>등록된 대여 상품이 없습니다.</Message>
          )
        ) : (
          <Spin size="default" />
        )}
      </>
    </Container>
  );
};

export default SearchContainer;
