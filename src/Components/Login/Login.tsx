import React from "react";
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
import useInput from "../../Hooks/useInput";

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
`;

const SLink = styled(Link)`
  font-size: ${(props: ISProps) => props.theme.searchFontSize};
  color: ${(props: ISProps) => props.theme.pinkColor};
  border-bottom: 1px solid ${(props: ISProps) => props.theme.pinkColor};
  margin-top: 10px;
  &:hover {
    color: ${(props: ISProps) => props.theme.blueColor};
    border-bottom: 1px solid ${(props: ISProps) => props.theme.blueColor};
  }
`;

const SItem = styled(Form.Item)`
  font-size: ${(props: ISProps) => props.theme.searchFontSize};
`;

interface IProps {
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDrawVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFormValue {
  username?: string;
  password?: string;
}

const Login: React.FC<IProps> = ({ setLoginModal, setDrawVisible }) => {
  const history = useHistory();
  const iDInput = useInput("");
  const PWInput = useInput("");

  const [userLogInMutation] = useMutation(LOG_USER_IN);
  const [loginMutaion, { loading }] = useMutation<login, loginVariables>(
    LOGIN,
    {
      onCompleted: async data => {
        const { Login } = data;
        if (Login.ok) {
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
          setLoginModal(false);
          setDrawVisible(false);
        } else {
          message.error(Login.error);
        }
        iDInput.setValue("");
        PWInput.setValue("");
      },
      variables: {
        userId: iDInput.value,
        password: PWInput.value
      }
    }
  );

  const onFinish = async (values: IFormValue) => {
    await loginMutaion();
    history.push(routes.HOME);
  };

  return (
    <Container>
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <SItem
          name="username"
          rules={[{ required: true, message: "아이디를 작성해 주세요" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="아이디"
            value={iDInput.value}
            onChange={iDInput.onChange}
          />
        </SItem>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "비밀번호를 작성해 주세요" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="비밀번호"
            value={PWInput.value}
            onChange={PWInput.onChange}
          />
        </Form.Item>
        <Form.Item>
          <BtnWrapper>
            <BasicBtn loading={loading} htmlType="submit">
              로그인
            </BasicBtn>
            <SLink to={routes.SIGNUP}>회원가입으로 이동</SLink>
          </BtnWrapper>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default Login;
