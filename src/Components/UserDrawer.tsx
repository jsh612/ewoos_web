import React, { useState } from "react";
import styled from "styled-components";
import { Drawer, Modal, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { TTheme } from "../Styles/theme";
import { IS_LOGGED_IN, LOG_USER_OUT } from "../LocalQueries";
import routes from "../Routes/routes";
import Login from "./Login/Login";

interface ISProps {
  theme: TTheme;
}

const MenuBtn = styled(Button)`
  width: ${(props: ISProps) => props.theme.iconSize};
  height: auto;
`;

const BtnIcon = styled(UserOutlined)`
  color: ${(props: ISProps) => props.theme.bgColor};
  font-size: ${(props: ISProps) => props.theme.iconSize};
`;

const CategoryColumn = styled.div`
  font-size: ${(props: ISProps) => props.theme.searchFontSize};
  &:not(:first-child) {
    margin-top: 10px;
  }
`;

const UserDrawer: React.FC = () => {
  const [drawerVisible, setDrawVisible] = useState<boolean>(false);
  const [loginModalBool, setLoginModal] = useState<boolean>(false);

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

  const loginHandlOk = () => {
    return setLoginModal(false);
  };

  const loginHandlCancel = () => {
    return setLoginModal(false);
  };

  // 로그아웃
  const onLogoutClick = async () => {
    await userLogoutMutation();
    message.success("로그아웃 되었습니다.");
    return setDrawVisible(false);
  };
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
              <Link to="">내 상점</Link>
            </CategoryColumn>
            <CategoryColumn>
              <Link to="">상품 올리기</Link>
            </CategoryColumn>
            <CategoryColumn>
              <Link to="" onClick={onLogoutClick}>
                로그아웃
              </Link>
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
              <Link to={routes.SIGNUP}>회원가입</Link>
            </CategoryColumn>
          </>
        )}
      </Drawer>
      <Modal
        title="로그인"
        visible={loginModalBool}
        footer={null}
        onOk={loginHandlOk}
        onCancel={loginHandlCancel}
      >
        <Login setLoginModal={setLoginModal} setDrawVisible={setDrawVisible} />
      </Modal>
    </>
  );
};

export default UserDrawer;
