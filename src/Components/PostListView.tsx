import React from "react";
import styled from "styled-components";
import { GetMe_GetMe_user_posts } from "../types/api";
import { List, Button } from "antd";
import { ISProps } from "../types/custom";

interface ISPropsE extends ISProps {
  pinkBool?: boolean;
}

const Container = styled.div`
  width: ${(props: ISProps) => props.theme.basciWidth};
`;

const Item = styled(List.Item)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: calc(${(props: ISProps) => props.theme.searchFontSize} * 1.5);
`;

const Header = styled.header``;

const ItemMain = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;
const Rent = styled.div`
  color: ${(props: ISPropsE) =>
    props.pinkBool ? props.theme.pinkColor : props.theme.blueColor};
`;

const StatusBtn = styled(Button)`
  font-size: ${(props: ISProps) => props.theme.searchFontSize};
  height: auto;
  margin-right: 0px;
  border-radius: 10px;
  padding: 5px;
`;

interface IProps {
  posts?: GetMe_GetMe_user_posts[] | null;
}

interface IListItem {
  post: GetMe_GetMe_user_posts;
}

const statusTransformer = (status: string) => {
  switch (status) {
    case "APPLY":
      return "대여 요청";
    case "RENT":
      return "대여중";
    default:
      return "대여 가능";
  }
};

const ListItem: React.FC<IListItem> = ({ post }) => {
  return (
    <Item>
      <Header>{post.title}</Header>
      <ItemMain>
        {post.rents && post.rents.length !== 0 ? (
          post.rents.map(rent => (
            <Rent pinkBool key={rent?.id}>
              {statusTransformer(rent?.status!)}
            </Rent>
          ))
        ) : (
          <Rent>대여 가능</Rent>
        )}
        <StatusBtn>상태변경</StatusBtn>
      </ItemMain>
    </Item>
  );
};

const PostListView: React.FC<IProps> = ({ posts }) => {
  console.log("포스트리스트", posts);
  return (
    <Container>
      <List
        size="default"
        bordered
        dataSource={posts!}
        renderItem={(item, index) => <ListItem key={index} post={item} />}
      />
    </Container>
  );
};

export default PostListView;
