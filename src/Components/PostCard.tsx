import React from "react";
import styled from "styled-components";
import { Descriptions, Carousel, Button } from "antd";
import { ISProps } from "../types/custom";

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

const Container = styled.div`
  min-width: 300px;
  width: 50vw;
  box-shadow: 1px 1px 5px black;
  padding: 10px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: calc(${(props: ISProps) => props.theme.searchFontSize} * 2);
  font-weight: 900;
  margin: 15px 0px;
  padding-left: 10px;
`;

const RentBtn = styled(Button)`
  background-color: ${(props: ISProps) => props.theme.pinkColor};
`;

const SDescriptions = styled(Descriptions)`
  font-size: calc(${(props: ISProps) => props.theme.searchFontSize} * 2);
`;

const SDescriptionsItem = styled(Descriptions.Item)`
  width: 30vw;
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
  min-width: 300px;
  width: 50vw;
  height: 300px;
  > .slick-dots li.slick-active button {
    background-color: red;
    cursor: default;
  }
  > .slick-dots li button {
    background-color: green;
  }
`;

const ImgWrapper = styled.div`
  height: 250px;
  width: auto;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  height: 250px;
  width: auto;
  max-width: 100%;
  margin: 0px auto;
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

  const onRent = () => {
    console.log("렌트 신청");
  };

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <RentBtn type="primary" onClick={onRent}>
          대여 신청
        </RentBtn>
      </Header>
      <SCarousel>
        {files &&
          files.map((file, idx) => (
            <ImgWrapper key={idx}>
              <Img src={file?.url} alt="상품 사진" />
            </ImgWrapper>
          ))}
      </SCarousel>
      <SDescriptions bordered column={1}>
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
        <Descriptions.Item label={<Label>{"작성일"}</Label>}>
          <Text>{timestamp}</Text>
        </Descriptions.Item>
      </SDescriptions>
    </Container>
  );
};

export default PostCard;
