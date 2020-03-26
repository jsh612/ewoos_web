import React, { useState } from "react";
import styled from "styled-components";
import {
  Descriptions,
  Carousel,
  Button,
  Modal,
  notification,
  Input,
  Form,
  message,
  Spin
} from "antd";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";

import { ISProps } from "../types/custom";
import Comments from "./Comments/Comments";
import { ReqRent, ReqRentVariables } from "../types/api";
import { RENT } from "../Routes/PostDetail/PostDetail.queries";
import { IS_LOGGED_IN } from "../LocalQueries";

const Container = styled.div`
  min-width: 300px;
  width: 50vw;
  box-shadow: 1px 1px 5px black;
  padding: 10px;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 10px;
  margin: 15px 0px;
  border-bottom: 2px solid black;
`;

const Title = styled.div`
  font-size: calc(${(props: ISProps) => props.theme.searchFontSize} * 2.5);
  font-weight: 900;
  padding-left: 10px;
`;

const RentBtn = styled(Button)`
  background-color: ${(props: ISProps) => props.theme.pinkColor};
  font-size: calc(${(props: ISProps) => props.theme.searchFontSize} * 2);
  min-width: calc(${(props: ISProps) => props.theme.searchFontSize} * 3);
  padding: 2px 5px;
  height: auto;
  text-align: center;
  align-self: flex-end;
  margin: 7px 0px;
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

const CommentLabel = styled(Label)`
  border-top: 2px solid black;
  padding-top: 5px;
  margin-top: 15px;
  font-weight: 700;
`;

const SInputTextArea = styled(Input.TextArea)`
  font-size: ${(props: ISProps) => props.theme.searchFontSize};
  resize: none;
`;

interface IFiles {
  url: string;
}

interface IUser {
  username: string;
}

export interface IComment {
  text: string;
  user: IUser;
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
  comments?: (IComment | null)[] | null;
}

const PostCard: React.FC<IProps> = ({
  title,
  user,
  location,
  desc,
  category,
  createdAt,
  updatadAt,
  files,
  comments
}) => {
  const [rentModalBool, setRentModalBool] = useState<boolean>(false);

  const timestamp = new Date(
    Date.parse(updatadAt ? updatadAt : createdAt!)
  ).toString();

  const { postId } = useParams();

  const [form] = Form.useForm();

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

  const [rentMutation, { loading }] = useMutation<ReqRent, ReqRentVariables>(
    RENT,
    {
      onCompleted: data => {
        const {
          ReqRent: { ok, error }
        } = data;
        if (ok) {
          form.resetFields();
          message.success("대여 신청이 완료되었습니다.");
          setRentModalBool(false);
        } else {
          message.error(error);
        }
      }
    }
  );

  const { data: { auth: { isLoggedIn = false } = {} } = {} } = useQuery(
    IS_LOGGED_IN
  );

  const onRent = () => {
    if (!isLoggedIn) {
      notification.error({
        message: "로그인 해주세요",
        description: "대여 신청을 위해선는 로그인이 필요합니다."
      });
      return;
    }
    return setRentModalBool(true);
  };

  const modalHandleOk = async () => {
    const message = form.getFieldValue("message");
    await rentMutation({
      variables: {
        postId: postId!,
        message
      }
    });
  };

  const modalHandleCancel = () => {
    form.resetFields();
    setRentModalBool(false);
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
        <Descriptions.Item label={<Label>{"작성자"}</Label>}>
          <Text>{user!.username}</Text>
        </Descriptions.Item>
        <Descriptions.Item label={<Label>{"지역"}</Label>}>
          <Text>{location}</Text>
        </Descriptions.Item>
        <Descriptions.Item label={<Label>{"카테고리"}</Label>}>
          <Text>{categoryChanger(category!)}</Text>
        </Descriptions.Item>
        <SDescriptionsItem label={<Label>{"설명"}</Label>}>
          <Desc>{desc}</Desc>
        </SDescriptionsItem>
        <Descriptions.Item label={<Label>{"작성일"}</Label>}>
          <Text>{timestamp}</Text>
        </Descriptions.Item>
      </SDescriptions>
      <CommentLabel>댓글</CommentLabel>
      <Comments comments={comments} />
      <Modal
        title="대여 신청"
        visible={rentModalBool}
        onOk={modalHandleOk}
        onCancel={modalHandleCancel}
        okType="default"
        okText={loading ? <Spin /> : "신청"}
        cancelText="취소"
      >
        <Form name="messageForm" form={form}>
          <Form.Item
            name="message"
            rules={[{ required: true, message: "메시지를 작성해 주세요" }]}
          >
            <SInputTextArea placeholder="1월 1일부터 2일간 대여 , 연락처 : XXX-XXXX-XXXX " />
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
};

export default PostCard;
