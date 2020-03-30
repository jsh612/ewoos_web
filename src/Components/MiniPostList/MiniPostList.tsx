import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { Spin, Card } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { CategoryPost, CategoryPostVariables } from "../../types/api";
import GET_CATEGORY from "./MinPostList.queries";
import { useHistory } from "react-router-dom";
import { ISProps } from "../../types/custom";

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

interface IProps {
  category?: string;
}

const MiniPostList: React.FC<IProps> = ({ category }) => {
  const history = useHistory();
  const items = 10; // 쿼리 당 가져올 post 갯수

  const { data, loading, fetchMore } = useQuery<
    CategoryPost,
    CategoryPostVariables
  >(GET_CATEGORY, {
    variables: { items, pageNumber: 0, category },
    fetchPolicy: "cache-and-network"
  });

  const onLoadMore = () => {
    try {
      fetchMore({
        variables: {
          pageNumber: data?.CategoryPost?.posts!.length,
          items,
          category
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          // updateQuery를 통해 기존 data에 새로운 data 추가
          if (fetchMoreResult?.CategoryPost?.error) return prev;
          return Object.assign({}, prev, {
            CategoryPost: {
              ...prev!.CategoryPost!,
              posts: [
                ...prev!.CategoryPost!.posts!,
                ...fetchMoreResult!.CategoryPost!.posts!
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

  return (
    <>
      {!loading ? (
        data &&
        data.CategoryPost &&
        data.CategoryPost.posts &&
        data.CategoryPost.posts!.length !== 0 ? (
          <SInfiniteScroll
            dataLength={data.CategoryPost!.posts!.length}
            next={onLoadMore}
            hasMore={true}
            loader={null}
          >
            {data.CategoryPost!.posts!.map(post => {
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
  );
};

export default MiniPostList;
