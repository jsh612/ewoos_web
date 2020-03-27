import React from "react";
import PostUploader from "../../Components/PostUploader";
import NeedLoginNotification from "../../Components/NeedLoginNotification";

const UploadPost: React.FC = () => {
  NeedLoginNotification();
  return <PostUploader />;
};

export default UploadPost;
