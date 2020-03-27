import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Modal, Button, List, notification, Spin } from "antd";
import { Link } from "react-router-dom";

import { GetMe_GetMe_user_posts } from "../types/api";
import { ISProps } from "../types/custom";
import { useReducerState } from "./MainContext";

interface ISPropsE extends ISProps {
  pinkBool?: boolean;
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
  color: ${(props: ISPropsE) =>
    props.pinkBool ? props.theme.pinkColor : props.theme.blueColor};
`;

const StatusBtn = styled(Button)`
  font-size: calc(${(props: ISProps) => props.theme.searchFontSize} * 1.2);
  height: auto;
  margin: 5px 0px 0px 5px;
  border-radius: 10px;
  padding: 5px;
  align-self: center;
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
  const { getMeRefetch } = useReducerState();
  const [test, setTest] = useState<boolean>(false);

  const statusTransformer = (status: string) => {
    switch (status) {
      case "REQUEST":
        return "대여 요청";
      case "RENT":
        return "대여중";
      default:
        return "대여 가능";
    }
  };

  const showModal = () => {
    setModalBool(true);
  };

  const handleOk = (rentId: string, status: string) => async () => {
    console.log("status", status);
    try {
      await mutationFunc(rentId, status);
      notification.success({ message: "대여 상품의 상태가 변경 되었습니다." });
    } catch (error) {
      notification.error({ message: error });
    }
    setModalBool(false);
  };

  const handleCancel = () => {
    setModalBool(false);
  };

  useEffect(() => {
    if (getMeRefetch) {
      getMeRefetch();
      setTest(!test);
    }
  }, [loading, getMeRefetch]);

  useEffect(() => {
    setTest(!test);
  }, [test]);

  return (
    <Item>
      <ItemMain>
        {post.rents && post.rents.length !== 0 ? (
          post.rents.map(rent => (
            <Rent key={rent?.id} pinkBool>
              {statusTransformer(rent?.status!)}
            </Rent>
          ))
        ) : (
          <Rent>대여 가능</Rent>
        )}
      </ItemMain>
      <Header to={`/post/${post.id}`}>{post.title}</Header>
      {post.rents && post.rents.length !== 0 && (
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
