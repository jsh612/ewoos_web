/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_Login {
  __typename: "LoginResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
  username: string | null;
}

export interface login {
  Login: login_Login;
}

export interface loginVariables {
  userId: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignUp
// ====================================================

export interface SignUp_SignUp {
  __typename: "SignUpResponse";
  ok: boolean;
  error: string | null;
}

export interface SignUp {
  SignUp: SignUp_SignUp;
}

export interface SignUpVariables {
  userId: string;
  username: string;
  password: string;
  info: string;
  phoneNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VerifyStart
// ====================================================

export interface VerifyStart_VerifyStart {
  __typename: "VerifyStartResponse";
  ok: boolean;
  error: string | null;
}

export interface VerifyStart {
  VerifyStart: VerifyStart_VerifyStart;
}

export interface VerifyStartVariables {
  phoneNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VerifyComplete
// ====================================================

export interface VerifyComplete_VerifyComplete {
  __typename: "VerifyCompleteResponse";
  ok: boolean;
  error: string | null;
}

export interface VerifyComplete {
  VerifyComplete: VerifyComplete_VerifyComplete;
}

export interface VerifyCompleteVariables {
  phoneNumber: string;
  secretKey: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostDetail
// ====================================================

export interface PostDetail_PostDetail_post_user {
  __typename: "User";
  id: string;
  username: string;
}

export interface PostDetail_PostDetail_post_files {
  __typename: "File";
  url: string;
}

export interface PostDetail_PostDetail_post_comments_user {
  __typename: "User";
  id: string;
  username: string;
}

export interface PostDetail_PostDetail_post_comments {
  __typename: "Comment";
  text: string;
  user: PostDetail_PostDetail_post_comments_user;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface PostDetail_PostDetail_post {
  __typename: "Post";
  id: string;
  user: PostDetail_PostDetail_post_user;
  title: string;
  location: string;
  desc: string;
  /**
   * category: CategoryOptions!
   */
  category: string;
  files: (PostDetail_PostDetail_post_files | null)[] | null;
  comments: (PostDetail_PostDetail_post_comments | null)[] | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface PostDetail_PostDetail {
  __typename: "PostDetailResponse";
  ok: boolean;
  error: string | null;
  post: PostDetail_PostDetail_post | null;
}

export interface PostDetail {
  PostDetail: PostDetail_PostDetail | null;
}

export interface PostDetailVariables {
  postId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UploadPost
// ====================================================

export interface UploadPost_UploadPost_post {
  __typename: "Post";
  id: string;
}

export interface UploadPost_UploadPost {
  __typename: "UploadPostResponse";
  ok: boolean;
  error: string | null;
  post: UploadPost_UploadPost_post | null;
}

export interface UploadPost {
  UploadPost: UploadPost_UploadPost;
}

export interface UploadPostVariables {
  title: string;
  location: string;
  desc: string;
  category: string;
  files?: string[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
