import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Tooltip, Button, message, notification } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { TTheme } from "../../Styles/theme";
import { useMutation } from "@apollo/react-hooks";
import { VERIFY_START, VERIFY_COMPLETE, SIGN_UP } from "./SignUp.queries";
import {
  VerifyStart,
  VerifyStartVariables,
  VerifyComplete,
  VerifyCompleteVariables,
  SignUp,
  SignUpVariables
} from "../../types/api";

const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 12 },
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
  width: 55vw;
  flex-direction: column;
  padding: 0px;
  flex-wrap: wrap;
`;

const SFromItem = styled(Form.Item)`
  min-width: 55vw;
  height: auto;
  margin: 0.5vw 0vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.div`
  font-size: ${(props: ISProps) => props.theme.searchFontSize};
`;

const SInput = styled(Input)`
  min-width: 180px;
  height: auto;
  font-size: ${(props: ISProps) => props.theme.searchFontSize};
  &::placeholder {
    font-size: 1vw;
  }
`;

const SInputPassword = styled(Input.Password)`
  min-width: 180px;
  max-width: 35vw;
  height: auto;
  font-size: ${(props: ISProps) => props.theme.searchFontSize};
`;

const SInputTextArea = styled(Input.TextArea)`
  min-width: 180px;
  max-width: 35vw;
  height: auto;
  font-size: ${(props: ISProps) => props.theme.searchFontSize};
  resize: none;
`;

const BtnFormItem = styled(SFromItem)`
  width: 20vw;
  min-width: 0px;
  height: auto;
`;

const SButton = styled(Button)`
  font-size: ${(props: ISProps) => props.theme.searchFontSize};
  padding: 0px 2px;
  &:hover {
    color: ${(props: ISProps) => props.theme.pinkColor};
  }
`;

interface IProps {
  setSignupModal: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpCompo: React.FC<IProps> = ({ setSignupModal, setLoginModal }) => {
  const [form] = Form.useForm();

  const [modifiedPhone, setModifiedPhone] = useState<string>("");

  // 휴대폰 비밀문자 인증 요청
  const [verifyPhoneMutation, { loading: verifyLoading }] = useMutation<
    VerifyStart,
    VerifyStartVariables
  >(VERIFY_START, {
    onCompleted: () =>
      message.success(
        `${form.getFieldValue("phone")}으로 인증번호가 전송되었습니다.`
      )
  });

  // 휴대폰 비밀문자 인증 확인
  const [verfiyCompleteMutation, { loading: completeLoading }] = useMutation<
    VerifyComplete,
    VerifyCompleteVariables
  >(VERIFY_COMPLETE);

  // 회원 가입
  const [signUpMutation, { loading: signupLoading }] = useMutation<
    SignUp,
    SignUpVariables
  >(SIGN_UP, {
    onCompleted: data => {
      const { SignUp: { ok = false, error = null } = {} } = data;
      if (ok) {
        notification.success({
          message: "회원가입이 완료되었습니다",
          description: "로그인 창으로 이동합니다."
        });
        form.resetFields();
        setSignupModal(false);
        setLoginModal(true);
      } else {
        notification.error({
          message: "회원가입이 오류",
          description: error
        });
      }
    },
    onError: error => {
      notification.error({
        message: "회원가입이 오류",
        description: error
      });
    }
  });

  const onFinish = async values => {
    const { nickname, id, password, secretKey, info } = values;
    try {
      await verfiyCompleteMutation({
        variables: {
          phoneNumber: modifiedPhone,
          secretKey
        }
      });
      await signUpMutation({
        variables: {
          userId: id,
          username: nickname,
          password,
          info,
          phoneNumber: modifiedPhone
        }
      });
    } catch (error) {
      message.error(error);
    }
  };

  const onVerify = async () => {
    // 인증문자 발생
    const phoneNum: string = form.getFieldValue("phone");
    console.log(phoneNum);
    const isValid = /^(?:(010-?\d{4})|(01[1|6|7|8|9]-?\d{3,4}))-?\d{4}$/.test(
      phoneNum
    );
    if (isValid) {
      const modifiedPhoneNum = `+82${phoneNum.slice(1)}`;
      setModifiedPhone(modifiedPhoneNum);
      console.log("realphone", modifiedPhoneNum);
      try {
        await verifyPhoneMutation({
          variables: {
            phoneNumber: modifiedPhoneNum
          }
        });
      } catch (error) {
        message.error(error);
      }
    } else {
      message.error("올바른 휴대전화 번호를 작성해주세요");
    }
  };

  return (
    <Container>
      <SForm
        {...formItemLayout}
        onFinish={onFinish}
        form={form}
        scrollToFirstError
        labelAlign="left"
        colon={false}
      >
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
              message: "상점이름을 입력해 주세요",
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
              message: "10자리 이상의 비밀번호를 작성해 주세요",
              min: 10
            }
          ]}
          hasFeedback
        >
          <SInputPassword placeholder="10자리 이상" />
        </SFromItem>
        <SFromItem
          name="confirm"
          label={<Label>비밀번호 확인</Label>}
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "비밀번호 확인란을 작성해주세요"
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
          <SInputPassword />
        </SFromItem>
        <SFromItem
          name="info"
          label={<Label>상점 소개글</Label>}
          rules={[
            {
              required: true,
              message: "상점 소개글을 작성해 주세요",
              whitespace: true
            }
          ]}
        >
          <SInputTextArea autoSize={true} />
        </SFromItem>

        <SFromItem
          name="phone"
          label={<Label>휴대전화</Label>}
          rules={[{ required: true, message: "휴대전화 번호를 작성해 주세요" }]}
        >
          <SInput />
        </SFromItem>
        <SFromItem
          name="secretKey"
          label={
            <SButton loading={verifyLoading} onClick={onVerify} type="dashed">
              인증번호 전송
            </SButton>
          }
          rules={[
            {
              required: true,
              message: "해당 번호로 발송된 인증 번호를 입력해 주세요",
              whitespace: true
            }
          ]}
        >
          <SInput placeholder="전송된 인증번호 입력" />
        </SFromItem>
        <BtnFormItem>
          <SButton
            loading={completeLoading || signupLoading}
            type="link"
            htmlType="submit"
          >
            회원가입
          </SButton>
        </BtnFormItem>
      </SForm>
    </Container>
  );
};

export default SignUpCompo;
