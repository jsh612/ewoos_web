import React from "react";
import styled from "styled-components";
import { Descriptions, Carousel } from "antd";
import { TTheme } from "../Styles/theme";

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

interface ISProps {
  theme: TTheme;
}

const Container = styled.div`
  min-width: 300px;
  width: 50vw;
  box-shadow: 1px 1px 5px black;
  padding: 10px;
`;

const SDescriptions = styled(Descriptions)`
  font-size: calc(${(props: ISProps) => props.theme.searchFontSize} * 2);
`;

const SDescriptionsItem = styled(Descriptions.Item)`
  width: 30vw;
`;

const Title = styled.div`
  font-size: calc(${(props: ISProps) => props.theme.searchFontSize} * 1.3);
`;

const Label = styled.div`
  font-size: calc(${(props: ISProps) => props.theme.searchFontSize} * 1.3);
`;

const Text = styled.div`
  font-size: calc(${(props: ISProps) => props.theme.searchFontSize} * 1.3);
`;

const Desc = styled.p`
  font-size: calc(${(props: ISProps) => props.theme.searchFontSize} * 1.3);
`;

const SCarousel = styled(Carousel)`
  background-color: red;
`;

const Img = styled.img`
  max-width: 150px;
  height: auto;
`;

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

  const categoryChanger = (cate: string) => {
    switch (cate) {
      case "DIGITAL":
        return "디지털/가전";
      case "FASHION":
        return "패션";
      case "SPORTS":
        return "스포츠/레저";
      case "CHILD":
        return "유아동";
      case "HOUSEHOLD":
        return "생활용품";
      default:
        return "기타";
    }
  };

  return (
    <Container>
      <SDescriptions title={<Title>{title}</Title>} bordered column={1}>
        <SCarousel autoplay>
          {/* {files && files.map(file => <Img src={file?.url} alt="상품 사진" />)} */}
          <div>
            <Img src={files![0]!.url} alt="상품 사진" />
          </div>
          <div>
            <Img src={files![0]!.url} alt="상품 사진" />
          </div>
        </SCarousel>
        <Descriptions.Item label={<Label>{"지역"}</Label>}>
          <Text>{location}</Text>
        </Descriptions.Item>
        <Descriptions.Item label={<Label>{"카테고리"}</Label>}>
          <Text>{categoryChanger(category!)}</Text>
        </Descriptions.Item>
        <SDescriptionsItem label={<Label>{"설명"}</Label>}>
          <Desc>
            {desc}
            {desc}
            {desc}
            {desc}
            {desc}
            {desc}
            {desc}
            {desc}
            {desc}
            {desc}
            {desc}
            {desc}
            {desc}
            {desc}
          </Desc>
        </SDescriptionsItem>
      </SDescriptions>
    </Container>
  );
};

export default PostCard;
