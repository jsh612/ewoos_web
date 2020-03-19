import React, { useState } from "react";
import styled from "styled-components";
import { Drawer, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { TTheme } from "../Styles/theme";
import { IS_LOGGED_IN } from "../LocalQueries";

interface ISprops {
  theme: TTheme;
}

const MenuBtn = styled(Button)`
  width: 3rem;
  height: auto;
`;

const BtnIcon = styled(UserOutlined)`
  color: ${(props: ISprops) => props.theme.bgColor};
  font-size: 3rem;
`;

const CategoryColumn = styled.div`
  font-size: 1.5rem;
`;

const UserDrawer: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const onClose = () => {
    setVisible(false);
  };
  const drawerToggle = () => {
    if (visible) {
      return setVisible(false);
    }
    return setVisible(true);
  };

  const { data: { auth: { isLoggedIn = null } = {} } = {} } = useQuery(
    IS_LOGGED_IN
  );

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
        onClose={onClose}
        visible={visible}
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
              <Link to="">기타</Link>
            </CategoryColumn>
          </>
        ) : (
          <>
            <CategoryColumn>
              <Link to="">로그인</Link>
            </CategoryColumn>
            <CategoryColumn>
              <Link to="">회원가입</Link>
            </CategoryColumn>
          </>
        )}
      </Drawer>
    </>
  );
};

export default UserDrawer;
