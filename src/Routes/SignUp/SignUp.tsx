import React from "react";
import styled from "styled-components";
import { Form, Input, Tooltip, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { TTheme } from "../../Styles/theme";
import useInput from "../../Hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import { VERIFY_START, VERIFY_COMPLETE, SIGN_UP } from "./SignUp.queries";
import {
  VerifyStart,
  VerifyStartVariables,
  VerifyComplete,
  VerifyCompleteVariables
} from "../../types/api";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  }
};

interface ISProps {
  theme: TTheme;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  flex-direction: column;
  padding: 0px;
`;

const SFromItem = styled(Form.Item)`
  width: 50vw;
  height: auto;
  margin: 0.5vw 0vw;
`;

const Label = styled.div`
  font-size: ${(props: ISProps) => props.theme.searchFontSize};
`;

const SInput = styled(Input)`
  max-width: 35vw;
  width: 70%
  height: auto;
  font-size: ${(props: ISProps) => props.theme.searchFontSize};
`;

const BtnFormItem = styled(SFromItem)`
  width: 20vw;
  height: auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SButton = styled(Button)`
  &:hover {
    color: ${(props: ISProps) => props.theme.pinkColor};
  }
`;

interface IProps {
  setSignupModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDrawVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<IProps> = ({ setSignupModal, setDrawVisible }) => {
  const phoneInput = useInput("");
  const [verifyPhoneMutation] = useMutation<VerifyStart, VerifyStartVariables>(
    VERIFY_START
  );

  const [verfiyCompleteMutation] = useMutation<
    VerifyComplete,
    VerifyCompleteVariables
  >(VERIFY_COMPLETE);

  const onFinish = values => {
    const { nickname, id, password, phone, secretKey } = values;
    console.log("phone", phone);
    // try {

    // } catch (error) {

    // }

    console.log("Received values of form: ", values);
  };

  const onVerify = async () => {
    // 인증문자 발생
    const realPhoneNum = `+82${phoneInput.value.slice(1)}`;
    await verifyPhoneMutation({
      variables: {
        phoneNumber: realPhoneNum
      }
    });
  };

  return (
    <Container>
      <SForm {...formItemLayout} onFinish={onFinish} scrollToFirstError>
        <SFromItem
          name="nickname"
          label={
            <Label>
              닉네임&nbsp;
              <Tooltip title="상점이름을 입력해 주세요">
                <QuestionCircleOutlined />
              </Tooltip>
            </Label>
          }
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true
            }
          ]}
        >
          <SInput />
        </SFromItem>
        <SFromItem
          name="id"
          label={<Label>아이디</Label>}
          rules={[
            {
              required: true,
              message: "아이디를 입력해주세요",
              whitespace: true
            }
          ]}
        >
          <SInput />
        </SFromItem>

        <SFromItem
          name="password"
          label={<Label>비밀번호</Label>}
          rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}
          hasFeedback
        >
          <Input.Password />
        </SFromItem>
        <SFromItem
          name="confirm"
          label={<Label>비밀번호 확인</Label>}
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!"
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("비밀번호가 같은지 확인 해주세요");
              }
            })
          ]}
        >
          <Input.Password />
        </SFromItem>

        <SFromItem
          name="phone"
          label={<Label>휴대전화</Label>}
          rules={[
            { required: true, message: "Please input your phone number!" }
          ]}
        >
          <SInput
            placeholder="숫자만 입력해주세요"
            onChange={phoneInput.onChange}
            value={phoneInput.value}
          />
        </SFromItem>
        <BtnFormItem>
          <SButton onClick={onVerify}>인증문자 전송</SButton>
        </BtnFormItem>
        <SFromItem
          name="secretKey"
          label={<Label>인증문자</Label>}
          rules={[
            {
              required: true,
              message: "해당 번호로 발송된 인증 문자열을 입력해 주세요",
              whitespace: true
            }
          ]}
        >
          <SInput />
        </SFromItem>
        <BtnFormItem>
          <SButton type="link" htmlType="submit">
            회원가입
          </SButton>
        </BtnFormItem>
      </SForm>
    </Container>
  );
};

export default SignUp;
