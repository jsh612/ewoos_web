import React from "react";
import styled from "styled-components";

interface IUser {
  id: string;
  username: string;
}

interface IFiles {
  url: string;
}

interface IProps {
  title?: string;
  location?: string;
  desc?: string;
  category?: string;
  createdAt?: string | null;
  updatadAt?: string | null;
  user?: IUser;
  files?: (IFiles | null)[] | null;
}

const Container = styled.div``;

const Title = styled.div``;

const Username = styled.div``;

const Location = styled.div``;

const Desc = styled.div``;

const Category = styled.div``;

const CreateAt = styled.div``;

const PostCard: React.FC<IProps> = ({
  title,
  user,
  location,
  desc,
  category,
  createdAt,
  updatadAt,
  files
}) => {
  const timestamp = new Date(
    Date.parse(updatadAt ? updatadAt : createdAt!)
  ).toString();
  return (
    <Container>
      <Title>{title}</Title>
      <Username>{user && user.username}</Username>
      <Location>{location}</Location>
      <Desc>{desc}</Desc>
      <Category>{category}</Category>
      <CreateAt>{timestamp}</CreateAt>
    </Container>
  );
};

export default PostCard;
