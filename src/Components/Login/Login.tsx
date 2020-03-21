import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory, Link } from "react-router-dom";

import routes from "../../Routes/routes";
import { TTheme } from "../../Styles/theme";
import { LOG_USER_IN } from "../../LocalQueries";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "./Login.queries";
import { loginVariables, login } from "../../types/api";

interface ISProps {
  theme: TTheme;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BasicBtn = styled(Button)`
  font-size: ${(props: ISProps) => props.theme.searchFontSize};
  max-width: cals(${(props: ISProps) => props.theme.searchFontSize} * 3);
  height: auto;
`;

const SLink = styled(Link)`
  font-size: ${(props: ISProps) => props.theme.searchFontSize};
  color: ${(props: ISProps) => props.theme.blueColor};
  border-bottom: 1px solid ${(props: ISProps) => props.theme.blueColor};
  margin-top: 10px;
  &:hover {
    color: ${(props: ISProps) => props.theme.pinkColor};
    border-bottom: 1px solid ${(props: ISProps) => props.theme.pinkColor};
  }
`;

const SItem = styled(Form.Item)`
  font-size: ${(props: ISProps) => props.theme.searchFontSize};
`;

interface IProps {
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDrawVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSignupModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFormValue {
  userId: string;
  password: string;
}

const Login: React.FC<IProps> = ({
  setLoginModal,
  setDrawVisible,
  setSignupModal
}) => {
  const [form] = Form.useForm();

  const history = useHistory();

  const [oks, setOks] = useState<boolean>(false);

  const [userLogInMutation] = useMutation(LOG_USER_IN);
  const [loginMutaion, { loading }] = useMutation<login, loginVariables>(
    LOGIN,
    {
      onCompleted: async data => {
        const { Login } = data;
        if (Login.ok) {
          setOks(!oks);
          if (Login.token) {
            try {
              await userLogInMutation({
                variables: {
                  token: Login.token
                }
              });
            } catch (error) {
              console.log("로그인 오류", error);
            }
          }
          message.success(`${Login.username} 님 환영합니다.`);
          form.resetFields();
          setLoginModal(false);
          setDrawVisible(false);
        } else {
          message.error(Login.error);
        }
      }
    }
  );

  const onFinish = async values => {
    const { userId, password } = values;
    await loginMutaion({
      variables: {
        userId,
        password
      }
    });
    form.resetFields();
    history.push(routes.HOME);
  };

  const onSignup = () => {
    setLoginModal(false);
    setSignupModal(true);
  };

  useEffect(() => {
    form.resetFields();
  });
  return (
    <Container>
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <SItem
          name="userId"
          rules={[{ required: true, message: "아이디를 작성해 주세요" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="아이디" />
        </SItem>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "비밀번호를 작성해 주세요" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="비밀번호"
          />
        </Form.Item>
        <Form.Item>
          <BtnWrapper>
            <BasicBtn loading={loading} htmlType="submit">
              로그인
            </BasicBtn>
            <SLink to="" onClick={onSignup}>
              회원가입으로 이동
            </SLink>
          </BtnWrapper>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default Login;
