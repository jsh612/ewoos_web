import React, { useState } from "react";
import { Comment, Form, Button, List, Input, notification } from "antd";
import styled from "styled-components";

import { IComment } from "../PostCard";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { CREATE_COMMENT } from "./Comments.queries";
import { CreateComment, CreateCommentVariables, GetMe } from "../../types/api";
import { useParams } from "react-router-dom";
import { GET_ME } from "../../shared.queries";
import { ISProps } from "../../types/custom";

const { TextArea } = Input;

interface IEditor {
  onChange: React.ChangeEventHandler;
  onSubmit: React.FormEventHandler;
  submitting: boolean;
  value: string;
}

interface IDBComments {
  comments?: (IComment | any)[] | null;
}

const CommentBtn = styled(Button)`
  background-color: ${(props: ISProps) => props.theme.pinkColor};
  font-size: calc(${(props: ISProps) => props.theme.searchFontSize} * 1);
  min-width: calc(${(props: ISProps) => props.theme.searchFontSize} * 3);
  padding: 2px 5px;
  height: auto;
  text-align: center;
  align-self: flex-end;
`;

// 댓글 목록
const CommentList: React.FC<IDBComments> = ({ comments }) => (
  <List
    dataSource={comments && comments!.length ? comments : undefined}
    header={`${comments!.length} ${
      comments && comments.length > 1 ? "replies" : "reply"
    }`}
    itemLayout="horizontal"
    renderItem={(props: IComment) => (
      <Comment content={<p>{props.text}</p>} author={props.user.username} />
    )}
  />
);

// 댓글 작성란
const Editor: React.FC<IEditor> = ({
  onChange,
  onSubmit,
  submitting,
  value
}) => (
  <>
    <Form.Item>
      <TextArea
        rows={4}
        onChange={onChange}
        value={value}
        placeholder="댓글을 작성해 주세요"
      />
    </Form.Item>
    <Form.Item>
      <CommentBtn
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        댓글 추가
      </CommentBtn>
    </Form.Item>
  </>
);

// 메인
const Comments: React.FC<IDBComments> = ({ comments }) => {
  const { postId } = useParams();

  const [commentsArr, setCommentsArr] = useState<IComment[]>(
    comments ? comments : []
  );
  const [value, setValue] = useState<string>("");

  const { data: getMeData, loading: meLoading } = useQuery<GetMe>(GET_ME);

  const [commentMutation, { loading: addLoading }] = useMutation<
    CreateComment,
    CreateCommentVariables
  >(CREATE_COMMENT, {
    onCompleted: () => {
      setCommentsArr([
        ...commentsArr,
        {
          user: { username: getMeData!.GetMe!.user!.username },
          text: value
        }
      ]);
    },
    onError: () => {
      notification.error({
        message: "로그인 해주세요",
        description: "댓글 작성을 위해서 로그인이 필요합니다."
      });
    }
  });

  const handleSubmit = async () => {
    if (!value) {
      return;
    }
    try {
      await commentMutation({
        variables: {
          postId: postId ? postId : "",
          text: value
        }
      });
      setValue("");
    } catch (error) {}
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const {
      target: { value }
    } = e;
    setValue(value);
  };

  return (
    <>
      {commentsArr!.length > 0 && <CommentList comments={commentsArr} />}
      <Comment
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={addLoading || meLoading}
            value={value}
          />
        }
      />
    </>
  );
};

export default Comments;
