import React, { useState } from "react";
import styled from "styled-components";
import { Modal, Button, List, notification, Spin } from "antd";
import { Link } from "react-router-dom";

import { GetMe_GetMe_user_posts } from "../types/api";
import { ISProps } from "../types/custom";

interface ISPropsE extends ISProps {
  status?: string;
}

const Item = styled(List.Item)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: calc(${(props: ISProps) => props.theme.searchFontSize} * 1.5);
`;

const Header = styled(Link)``;

const ItemMain = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;
const Rent = styled.div`
  color: ${(props: ISPropsE) => {
    return props.status && props.status !== "대여 가능"
      ? props.theme.pinkColor
      : props.theme.blueColor;
  }};
`;

const StatusBtn = styled(Button)`
  font-size: calc(${(props: ISProps) => props.theme.searchFontSize} * 1.2);
  height: auto;
  margin: 5px 0px 0px 5px;
  border-radius: 10px;
  padding: 5px;
  align-self: flex-end;
`;

const Message = styled.p`
  font-size: calc(${(props: ISProps) => props.theme.searchFontSize} * 1.5);
`;

const Wrapper = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const ModalBtnWrapper = styled(Wrapper)`
  flex-direction: row;
  margin-top: 5px;
  justify-content: flex-end;
`;

interface IListItem {
  post: GetMe_GetMe_user_posts;
  mutationFunc: (rentId: string, status: string) => void;
  loading: boolean;
}

const ListViewItem: React.FC<IListItem> = ({ post, mutationFunc, loading }) => {
  const [modalBool, setModalBool] = useState<boolean>(false);

  const statusTransformer = (status: string) => {
    // 상품 상태값을 한글로 변경
    switch (status) {
      case "REQUEST":
        return "대여 요청";
      case "RENT":
        return "대여중";
      default:
        return "대여 가능";
    }
  };

  const [status, setStatus] = useState<string>(
    statusTransformer(
      post.rents && post.rents.length !== 0 ? post!.rents![0]!.status : ""
    )
  );

  const showModal = () => {
    setModalBool(true);
  };

  const handleOk = (rentId: string, status: string) => async () => {
    try {
      await mutationFunc(rentId, status);
      notification.success({ message: "대여 상품의 상태가 변경 되었습니다." });
      if (status === "RENT") {
        setStatus("대여중");
      } else {
        setStatus("대여 가능");
      }
    } catch (error) {
      notification.error({ message: error });
    }
    setModalBool(false);
  };

  const handleCancel = () => {
    setModalBool(false);
  };

  return (
    <Item>
      <ItemMain>
        {post.rents && post.rents.length !== 0 ? (
          post.rents.map(rent => (
            <Rent status={status} key={rent?.id}>
              {status}
            </Rent>
          ))
        ) : (
          <Rent>대여 가능</Rent>
        )}
      </ItemMain>
      <Header to={`/post/${post.id}`}>{post.title}</Header>
      {post.rents && post.rents.length !== 0 && status !== "대여 가능" && (
        <StatusBtn type="ghost" onClick={showModal}>
          대여 정보 보기
        </StatusBtn>
      )}
      <Modal
        title="신청된 대여"
        visible={modalBool}
        footer={false}
        onCancel={handleCancel}
      >
        <Message>{post?.rents![0]?.message}</Message>
        <ModalBtnWrapper>
          {!loading ? (
            <>
              <StatusBtn
                onClick={handleOk(
                  post.rents && post.rents.length !== 0
                    ? post!.rents![0]!.id
                    : "",
                  "RENT"
                )}
              >
                요청 수락
              </StatusBtn>
              <StatusBtn
                onClick={handleOk(
                  post.rents && post.rents.length !== 0
                    ? post!.rents![0]!.id
                    : "",
                  "DONE"
                )}
              >
                대여 종료
              </StatusBtn>
            </>
          ) : (
            <Spin />
          )}
        </ModalBtnWrapper>
      </Modal>
    </Item>
  );
};

export default ListViewItem;
