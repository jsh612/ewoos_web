import React, { useState } from "react";
import { Upload, Modal, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import reqwest from "reqwest";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

interface IState {
  previewVisible: boolean;
  previewImage: string;
  fileList: any[];
  uploadList: any[];
  data: any[];
}

const PostUploader: React.FC = () => {
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploadList, setUploadList] = useState<any[]>([]);
  const [resData, setResData] = useState<any[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

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

  const handleUpload = async () => {
    const formData = new FormData();
    uploadList.forEach(file => {
      formData.append("files", file);
    });
    setUploading(true);

    console.log("보이기 list", fileList);
    console.log("업로드 리스트", uploadList);
    // You can use any AJAX library you like
    // console.log("form 데이터", formData.getAll("file"));
    // await axios({
    //   url: "http://localhost:4000/api/upload",
    //   method: "post",
    //   data: formData
    // });
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
    setResData(data);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <div className="clearfix">
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
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img
          alt="상품 사진 미리보기"
          style={{ width: "100%" }}
          src={previewImage}
        />
      </Modal>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        style={{ marginTop: 16 }}
        loading={uploading}
      >
        업로드
      </Button>
    </div>
  );
};

export default PostUploader;
