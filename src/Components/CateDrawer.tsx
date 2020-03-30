import React, { useState } from "react";
import styled from "styled-components";
import { Drawer, Button } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ISProps } from "../types/custom";

const MenuBtn = styled(Button)`
  width: ${(props: ISProps) => props.theme.iconSize};
  height: auto;
`;

const BtnIcon = styled(MenuUnfoldOutlined)`
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

const CateDrawer: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false); // drawer 보일지 말지

  const onClose = () => {
    setVisible(false);
  };

  const drawerToggle = () => {
    if (visible) {
      return setVisible(false);
    }
    return setVisible(true);
  };

  const onClick = () => {
    // 개별 카테고리 링크 클릭시 drawer 닫기
    setVisible(false);
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
        <CategoryColumn onClick={onClick}>
          <Link to="/category/digital">디지털/가전</Link>
        </CategoryColumn>
        <CategoryColumn onClick={onClick}>
          <Link to="/category/fashion">패션</Link>
        </CategoryColumn>
        <CategoryColumn onClick={onClick}>
          <Link to="/category/sports">스포츠/레저</Link>
        </CategoryColumn>
        <CategoryColumn onClick={onClick}>
          <Link to="/category/child">유아동</Link>
        </CategoryColumn>
        <CategoryColumn onClick={onClick}>
          <Link to="/category/household">생활용품</Link>
        </CategoryColumn>
        <CategoryColumn onClick={onClick}>
          <Link to="/category/etc">기타</Link>
        </CategoryColumn>
      </Drawer>
    </>
  );
};

export default CateDrawer;
