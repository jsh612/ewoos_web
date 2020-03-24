import React, { useState } from "react";
import { Upload, Modal, Button, message, Form, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import reqwest from "reqwest";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";

import { TTheme } from "../Styles/theme";
import { UploadPost, UploadPostVariables } from "../types/api";
import { UPLOAD } from "../Routes/Upload/Uplaod.queries";
import { useHistory } from "react-router-dom";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

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
  margin-top: 2vw;
  box-shadow: 1px 1px 5px black;
`;

const Tittle = styled.div`
  font-size: calc(${(props: ISProps) => props.theme.searchFontSize} * 2);
  font-weight: 800;
  margin: 5px 0px;
`;

const SForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 55vw;
  flex-direction: column;
  padding: 15px;
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

const SInputTextArea = styled(Input.TextArea)`
  min-width: 180px;
  max-width: 35vw;
  height: auto;
  font-size: ${(props: ISProps) => props.theme.searchFontSize};
  resize: none;
`;

const ImgWrapper = styled.div``;

const BtnFormItem = styled(SFromItem)`
  width: 20vw;
  min-width: 0px;
  height: auto;
`;

const PostUploader: React.FC = () => {
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploadList, setUploadList] = useState<any[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  const history = useHistory();

  // form 접근
  const [form] = Form.useForm();

  // post 업로드 mutation
  const [uploadMutation, { loading }] = useMutation<
    UploadPost,
    UploadPostVariables
  >(UPLOAD, {
    onCompleted: data => {
      const {
        UploadPost: { ok, error, post }
      } = data;
      if (ok && post) {
        form.resetFields();
        message.success("해당 게시물이 등록되었습니다.");
        history.push(`post/${post.id}`);
        return;
      }
      message.error(error);
    }
  });

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const beforeUpload = file => {
    setUploadList([...uploadList, file]);
    return false;
  };

  const onRemove = file => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);

    const uploadListIndex = uploadList.indexOf(file);
    const newUploadList = uploadList.slice();
    newUploadList.splice(uploadListIndex, 1);
    setUploadList(newUploadList);
  };

  const handleUpload = async values => {
    const { title, location, desc, category } = values;

    const formData = new FormData();
    uploadList.forEach(file => {
      formData.append("files", file);
    });
    setUploading(true);

    // You can use any AJAX library you like
    // console.log("form 데이터", formData.getAll("file"));
    // await axios({
    //   url: "http://localhost:4000/api/upload",
    //   method: "post",
    //   data: formData
    // });
    try {
      const data = await reqwest({
        url: "http://localhost:4000/api/upload",
        method: "post",
        processData: false,
        data: formData,
        success: () => {
          setFileList([]);
          setUploadList([]);
          setUploading(false);
          message.success("upload successfully.");
        },
        error: () => {
          setUploading(false);
          message.error("upload failed.");
        },
        contentType: "multipart/form-data"
      });
      await uploadMutation({
        variables: {
          title,
          location,
          desc,
          category,
          files: data
        }
      });
    } catch (error) {
      message.error(error);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Container>
      <Tittle>상품 등록하기</Tittle>
      <SForm
        {...formItemLayout}
        onFinish={handleUpload}
        form={form}
        scrollToFirstError
        labelAlign="left"
        colon={false}
      >
        <SFromItem
          name="title"
          label={<Label>제목</Label>}
          rules={[
            {
              required: true,
              message: "제목을 입력해 주세요",
              whitespace: true
            }
          ]}
        >
          <SInput placeholder="예시: 플스4 대여합니다." />
        </SFromItem>
        <SFromItem
          name="location"
          label={<Label>지역</Label>}
          rules={[
            {
              required: true,
              message: "지역을 입력해 주세요",
              whitespace: true
            }
          ]}
        >
          <SInput placeholder="예시: 서울특별시" />
        </SFromItem>
        <SFromItem
          name="desc"
          label={<Label>상품 설명</Label>}
          rules={[
            {
              required: true,
              message: "상품 설명을 작성해 주세요",
              whitespace: true
            }
          ]}
        >
          <SInputTextArea autoSize={true} />
        </SFromItem>
        <SFromItem
          name="category"
          label={<Label>카테고리</Label>}
          rules={[
            {
              required: true,
              message: "카테고리를 선택해 주세요",
              whitespace: true
            }
          ]}
        >
          <Select placeholder="카테고리 선택">
            <Select.Option value="DIGITAL">디지털/가전</Select.Option>
            <Select.Option value="FASHION">패션</Select.Option>
            <Select.Option value="SPORTS">스포츠/레저</Select.Option>
            <Select.Option value="CHILD">유아동</Select.Option>
            <Select.Option value="HOUSEHOLD">생활용품</Select.Option>
            <Select.Option value="ETC">기타</Select.Option>
          </Select>
        </SFromItem>
        <SFromItem
          name="image"
          label={<Label>상품사진</Label>}
          rules={[
            {
              required: true,
              message: "상품 사진을 등록해 주세요",
              whitespace: true
            }
          ]}
        >
          <ImgWrapper>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={beforeUpload}
              onRemove={onRemove}
            >
              {fileList.length >= 5 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="상품 사진 미리보기"
                style={{ width: "100%" }}
                src={previewImage}
              />
            </Modal>
          </ImgWrapper>
        </SFromItem>
        <BtnFormItem>
          <Button
            type="primary"
            disabled={fileList.length === 0}
            loading={uploading || loading}
            htmlType="submit"
          >
            상품 등록
          </Button>
        </BtnFormItem>
      </SForm>
    </Container>
  );
};

export default PostUploader;
