import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Drawer, Modal, Button, message, Popconfirm } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { IS_LOGGED_IN, LOG_USER_OUT } from "../LocalQueries";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import routes from "../Routes/routes";
import { ISProps } from "../types/custom";

const MenuBtn = styled(Button)`
  width: ${(props: ISProps) => props.theme.iconSize};
  height: auto;
`;

const BtnIcon = styled(UserOutlined)`
  color: ${(props: ISProps) => props.theme.bgColor};
  font-size: ${(props: ISProps) => props.theme.iconSize};
  @media screen and (max-width: 400px) {
    font-size: calc(${(props: ISProps) => props.theme.iconSize} * 2);
  }
`;

const CategoryColumn = styled.div`
  font-size: ${(props: ISProps) => props.theme.searchFontSize};
  &:not(:first-child) {
    margin-top: 10px;
  }
`;

const SModal = styled(Modal)`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 40vw;
  height: auto;
`;

const UserDrawer: React.FC = () => {
  const [drawerVisible, setDrawVisible] = useState<boolean>(false);
  const [loginModalBool, setLoginModal] = useState<boolean>(false);
  const [signupModalBool, setSignupModal] = useState<boolean>(false);

  // 위치 변경시 drawer 닫기
  const location = useLocation();

  const [userLogoutMutation] = useMutation(LOG_USER_OUT);

  // drawer 열기/닫기
  const drawerToggle = () => {
    if (drawerVisible) {
      return setDrawVisible(false);
    }
    return setDrawVisible(true);
  };

  // 로그인 여부 확인
  const { data: { auth: { isLoggedIn = null } = {} } = {} } = useQuery(
    IS_LOGGED_IN
  );

  // modal 열기/닫기
  const onLoginClick = () => {
    return setLoginModal(true);
  };

  const loginHandle = () => {
    return setLoginModal(false);
  };

  // 로그아웃
  const onLogoutClick = async () => {
    await userLogoutMutation();
    message.success("로그아웃 되었습니다.");
    return setDrawVisible(false);
  };

  // 로그아웃 중도 취소
  const onLogoutCancel = () => {
    return;
  };

  // 회원가입
  const signupHandle = () => {
    return setSignupModal(false);
  };

  const onSignupClick = () => {
    return setSignupModal(true);
  };

  useEffect(() => {
    setDrawVisible(false);
  }, [location]);

  return (
    <>
      <MenuBtn
        onClick={drawerToggle}
        ghost={true}
        icon={<BtnIcon />}
        type="link"
      />
      <Drawer
        title="내정보"
        placement="right"
        closable={false}
        onClose={drawerToggle}
        visible={drawerVisible}
        width={"150px"}
      >
        {isLoggedIn ? (
          <>
            <CategoryColumn>
              <Link to={routes.MYSHOP}>나의 상점</Link>
            </CategoryColumn>
            <CategoryColumn>
              <Link to={routes.MYLOG}>나의 내역</Link>
            </CategoryColumn>
            <CategoryColumn>
              <Link to={routes.UPLOAD}>상품 올리기</Link>
            </CategoryColumn>
            <CategoryColumn>
              <Popconfirm
                title="로그아웃 하시겠습니까?"
                onConfirm={onLogoutClick}
                onCancel={onLogoutCancel}
                okText="네"
                cancelText="아니요"
              >
                <Link to="">로그아웃</Link>
              </Popconfirm>
            </CategoryColumn>
          </>
        ) : (
          <>
            <CategoryColumn>
              <Link to="" onClick={onLoginClick}>
                로그인
              </Link>
            </CategoryColumn>
            <CategoryColumn>
              <Link to="" onClick={onSignupClick}>
                회원가입
              </Link>
            </CategoryColumn>
          </>
        )}
      </Drawer>
      <Modal
        title="로그인"
        visible={loginModalBool}
        footer={null}
        onOk={loginHandle}
        onCancel={loginHandle}
      >
        <Login
          setLoginModal={setLoginModal}
          setDrawVisible={setDrawVisible}
          setSignupModal={setSignupModal}
          loginModalBool={loginModalBool}
        />
      </Modal>
      <SModal
        title="회원가입"
        visible={signupModalBool}
        footer={null}
        onOk={signupHandle}
        onCancel={signupHandle}
      >
        <SignUp setSignupModal={setSignupModal} setLoginModal={setLoginModal} />
      </SModal>
    </>
  );
};

export default UserDrawer;
