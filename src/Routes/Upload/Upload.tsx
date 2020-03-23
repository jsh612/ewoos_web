import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Upload, Modal as orginModal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";

const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const Modal = styled(orginModal)`
  width: 35vw;
  min-height: 40vw;
`;

const UploadPost: React.FC = () => {
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>("");
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  const [useEffectTrigger, setTrigger] = useState<boolean>(false);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: UploadFile<any>) => {
    if (!file.url && !file.preview) {
      const preview = await getBase64(file.originFileObj);
      const priviewStr = preview as string;
      file.preview = priviewStr;
    }
    setPreviewVisible(true);

    setPreviewImage(file.url || file.preview);
  };

  const handleChange = ({ fileList }) => {
    setTrigger(true);
    setFileList(fileList);
  };

  const submitFnc = () => {
    console.log("파일리스트", fileList);
  };

  const onRemove = () => {
    setTrigger(false);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  useEffect(() => {
    console.log("use effect");
    if (false) {
      fileList.forEach(file => handlePreview(file));
    }
  }, [fileList]);
  return (
    <div className="clearfix">
      <Upload
        accept="image/*"
        action="http://localhost:4000/api/upload"
        listType="picture-card"
        fileList={fileList ? fileList : undefined}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={onRemove}
        data={file => console.log("data file:", file)}
        multiple={true}
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img
          alt="상품 사진"
          style={{ width: "30vw", height: "auto" }}
          src={previewImage}
        />
      </Modal>
      <Button onClick={submitFnc}>제출버튼입니다.</Button>
    </div>
  );
};

export default UploadPost;

// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// }

// class PicturesWall extends React.Component {
//   state = {
//     previewVisible: false,
//     previewImage: "",
//     fileList: []
//   };

//   handleCancel = () => this.setState({ previewVisible: false });

//   handlePreview = async file => {
//     if (!file.url && !file.preview) {
//       console.log("내부", "ok");
//       file.preview = await getBase64(file.originFileObj);
//     }
//     console.log("외부", "ok");
//     this.setState({
//       previewImage: file.url || file.preview,
//       previewVisible: true
//     });
//   };

//   handleChange = ({ fileList }) => this.setState({ fileList });

//   render() {
//     const { previewVisible, previewImage, fileList } = this.state;
//     const uploadButton = (
//       <div>
//         <PlusOutlined />
//         <div className="ant-upload-text">Upload</div>
//       </div>
//     );
//     return (
//       <div className="clearfix">
//         <Upload
//           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//           listType="picture-card"
//           fileList={fileList}
//           onPreview={this.handlePreview}
//           onChange={this.handleChange}
//         >
//           {fileList.length >= 8 ? null : uploadButton}
//         </Upload>
//         <Modal
//           visible={previewVisible}
//           footer={null}
//           onCancel={this.handleCancel}
//         >
//           <img alt="example" style={{ width: "100%" }} src={previewImage} />
//         </Modal>
//       </div>
//     );
//   }
// }

// export default PicturesWall;
