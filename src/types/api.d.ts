/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateComment
// ====================================================

export interface CreateComment_CreateComment {
  __typename: "CreateCommentResponse";
  ok: boolean;
  error: string | null;
}

export interface CreateComment {
  CreateComment: CreateComment_CreateComment;
}

export interface CreateCommentVariables {
  text: string;
  postId: string;
}

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
// GraphQL query operation: CategoryPost
// ====================================================

export interface CategoryPost_CategoryPost_posts_files {
  __typename: "File";
  url: string;
}

export interface CategoryPost_CategoryPost_posts {
  __typename: "Post";
  id: string;
  title: string;
  /**
   * category: CategoryOptions!
   */
  category: string;
  files: (CategoryPost_CategoryPost_posts_files | null)[] | null;
}

export interface CategoryPost_CategoryPost {
  __typename: "CategoryPostResponse";
  ok: boolean;
  error: string | null;
  posts: (CategoryPost_CategoryPost_posts | null)[] | null;
}

export interface CategoryPost {
  CategoryPost: CategoryPost_CategoryPost | null;
}

export interface CategoryPostVariables {
  category?: string | null;
  pageNumber: number;
  items: number;
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
// GraphQL mutation operation: ReqRent
// ====================================================

export interface ReqRent_ReqRent {
  __typename: "ReqRentResponse";
  ok: boolean;
  error: string | null;
}

export interface ReqRent {
  ReqRent: ReqRent_ReqRent;
}

export interface ReqRentVariables {
  postId: string;
  message: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Search
// ====================================================

export interface Search_SearchPost_posts_files {
  __typename: "File";
  url: string;
}

export interface Search_SearchPost_posts {
  __typename: "Post";
  id: string;
  title: string;
  files: (Search_SearchPost_posts_files | null)[] | null;
}

export interface Search_SearchPost {
  __typename: "SearchPostResponse";
  error: string | null;
  posts: (Search_SearchPost_posts | null)[] | null;
}

export interface Search {
  SearchPost: Search_SearchPost;
}

export interface SearchVariables {
  term: string;
  pageNumber: number;
  items: number;
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

// ====================================================
// GraphQL query operation: GetMe
// ====================================================

export interface GetMe_GetMe_user_posts_rents {
  __typename: "Rent";
  id: string;
  status: RentStatus;
  message: string;
}

export interface GetMe_GetMe_user_posts_files {
  __typename: "File";
  id: string;
  url: string;
}

export interface GetMe_GetMe_user_posts {
  __typename: "Post";
  id: string;
  rents: (GetMe_GetMe_user_posts_rents | null)[] | null;
  title: string;
  files: (GetMe_GetMe_user_posts_files | null)[] | null;
}

export interface GetMe_GetMe_user_rents_post {
  __typename: "Post";
  id: string;
  title: string;
}

export interface GetMe_GetMe_user_rents {
  __typename: "Rent";
  post: GetMe_GetMe_user_rents_post;
}

export interface GetMe_GetMe_user {
  __typename: "User";
  username: string;
  posts: GetMe_GetMe_user_posts[] | null;
  rents: GetMe_GetMe_user_rents[] | null;
}

export interface GetMe_GetMe {
  __typename: "GetMeResponse";
  error: string | null;
  user: GetMe_GetMe_user | null;
}

export interface GetMe {
  GetMe: GetMe_GetMe | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RentStatusUpdate
// ====================================================

export interface RentStatusUpdate_RentStatusUpdate {
  __typename: "RentStatusResponse";
  ok: boolean;
  error: string | null;
}

export interface RentStatusUpdate {
  RentStatusUpdate: RentStatusUpdate_RentStatusUpdate;
}

export interface RentStatusUpdateVariables {
  status: string;
  rentId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMyRents
// ====================================================

export interface GetMyRents_GetMe_user_rents_post_files {
  __typename: "File";
  url: string;
}

export interface GetMyRents_GetMe_user_rents_post {
  __typename: "Post";
  id: string;
  title: string;
  files: (GetMyRents_GetMe_user_rents_post_files | null)[] | null;
}

export interface GetMyRents_GetMe_user_rents {
  __typename: "Rent";
  id: string;
  status: RentStatus;
  post: GetMyRents_GetMe_user_rents_post;
}

export interface GetMyRents_GetMe_user {
  __typename: "User";
  rents: GetMyRents_GetMe_user_rents[] | null;
}

export interface GetMyRents_GetMe {
  __typename: "GetMeResponse";
  error: string | null;
  user: GetMyRents_GetMe_user | null;
}

export interface GetMyRents {
  GetMe: GetMyRents_GetMe | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum RentStatus {
  DONE = "DONE",
  RENT = "RENT",
  REQUEST = "REQUEST",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
