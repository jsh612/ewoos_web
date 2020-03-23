import React from "react";
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
}

class PicturesWall extends React.Component {
  state: IState = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
    uploadList: []
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    console.log("변화 파일", this.state.fileList);
  };

  beforeUpload = file => {
    console.log("before");
    this.setState((state: any) => ({
      uploadList: [...state.uploadList, file]
    }));
    return false;
  };

  onRemove = file => {
    this.setState((state: any) => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);

      const uploadListIndex = state.uploadList.indexOf(file);
      const newUploadList = state.uploadList.slice();
      newUploadList.splice(uploadListIndex, 1);
      return {
        fileList: newFileList,
        uploadList: newUploadList
      };
    });
  };

  handleUpload = async () => {
    const { uploadList } = this.state;
    const formData = new FormData();
    uploadList.forEach(file => {
      console.log("file", file);
      formData.append("files", file);
    });

    this.setState({
      uploading: true
    });

    // You can use any AJAX library you like
    // console.log("form 데이터", formData.getAll("file"));
    // await axios({
    //   url: "http://localhost:4000/api/upload",
    //   method: "post",
    //   data: formData
    // });
    await reqwest({
      url: "http://localhost:4000/api/upload",
      method: "post",
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploadList: [],
          uploading: false
        });
        message.success("upload successfully.");
      },
      error: () => {
        this.setState({
          uploading: false
        });
        message.error("upload failed.");
      },
      contentType: "multipart/form-data"
    });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
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
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={this.beforeUpload}
          onRemove={this.onRemove}
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img
            alt="상품 사진 미리보기"
            style={{ width: "100%" }}
            src={previewImage}
          />
        </Modal>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          style={{ marginTop: 16 }}
        >
          "업로드"
        </Button>
      </div>
    );
  }
}

export default PicturesWall;

// import React, { useState } from "react";
// import styled from "styled-components";
// import { Upload, Modal as orginModal, Button } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import { UploadFile } from "antd/lib/upload/interface";

// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// }

// const Modal = styled(orginModal)`
//   width: 35vw;
//   min-height: 40vw;
// `;

// const UploadPost: React.FC = () => {
//   const [previewVisible, setPreviewVisible] = useState<boolean>(false);
//   const [previewImage, setPreviewImage] = useState<string | undefined>("");
//   const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

//   const handleCancel = () => setPreviewVisible(false);

//   const handlePreview = async (file: UploadFile<any>) => {
//     if (!file.url && !file.preview) {
//       const preview = await getBase64(file.originFileObj);
//       const priviewStr = preview as string;
//       file.preview = priviewStr;
//     }
//     setPreviewVisible(true);

//     setPreviewImage(file.url || file.preview);
//   };

//   const handleChange = ({ fileList }) => {
//     console.log("변화언제");
//     setFileList(fileList);
//   };

//   const submitFnc = () => {
//     console.log("파일리스트", fileList);
//   };

//   const onRemove = async () => {
//     console.log("삭제 ");
//   };

//   const uploadButton = (
//     <div>
//       <PlusOutlined />
//       <div className="ant-upload-text">Upload</div>
//     </div>
//   );

//   // useEffect(() => {
//   //   console.log("use effect");
//   //   if (useEffectTrigger) {
//   //     console.log("트리고", useEffectTrigger);
//   //     fileList.forEach(file => handlePreview(file));
//   //   }
//   // }, [fileList]);

//   return (
//     <div className="clearfix">
//       <Upload
//         accept="image/*"
//         action="http://localhost:4000/api/upload"
//         listType="picture-card"
//         fileList={fileList ? fileList : undefined}
//         onPreview={handlePreview}
//         onChange={handleChange}
//         onRemove={onRemove}
//         data={file => console.log("data file:", file)}
//         multiple={true}
//       >
//         {fileList.length >= 5 ? null : uploadButton}
//       </Upload>
//       <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
//         <img
//           alt="상품 사진"
//           style={{ width: "30vw", height: "auto" }}
//           src={previewImage}
//         />
//       </Modal>
//       <Button onClick={submitFnc}>제출버튼입니다.</Button>
//     </div>
//   );
// };

// export default UploadPost;
