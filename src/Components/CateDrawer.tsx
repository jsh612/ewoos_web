import React, { useState } from "react";
import styled from "styled-components";
import { Drawer, Button } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { TTheme } from "../Styles/theme";
import { Link } from "react-router-dom";

interface ISProps {
  theme: TTheme;
}

const MenuBtn = styled(Button)`
  width: ${(props: ISProps) => props.theme.iconSize};
  height: auto;
`;

const BtnIcon = styled(MenuUnfoldOutlined)`
  color: ${(props: ISProps) => props.theme.bgColor};
  font-size: ${(props: ISProps) => props.theme.iconSize};
`;

const CategoryColumn = styled.div`
  font-size: ${(props: ISProps) => props.theme.searchFontSize};
  &:not(:first-child) {
    margin-top: 10px;
  }
`;

const CateDrawer: React.FC = () => {
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

  return (
    <>
      <MenuBtn
        onClick={drawerToggle}
        ghost={true}
        icon={<BtnIcon />}
        type="link"
      />
      <Drawer
        title="카테고리"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={"200px"}
      >
        <CategoryColumn>
          <Link to="">디지털/가전</Link>
        </CategoryColumn>
        <CategoryColumn>
          <Link to="">패션</Link>
        </CategoryColumn>
        <CategoryColumn>
          <Link to="">스포츠/레저</Link>
        </CategoryColumn>
        <CategoryColumn>
          <Link to="">유아동</Link>
        </CategoryColumn>
        <CategoryColumn>
          <Link to="">생활용품</Link>
        </CategoryColumn>
        <CategoryColumn>
          <Link to="">기타</Link>
        </CategoryColumn>
      </Drawer>
    </>
  );
};

export default CateDrawer;
