import React from "react";
import styled from "styled-components";
import {
  GetMe_GetMe_user_posts,
  RentStatusUpdate,
  RentStatusUpdateVariables
} from "../types/api";
import { List } from "antd";
import { ISProps } from "../types/custom";
import { useMutation } from "@apollo/react-hooks";
import { RENT_STAUTS } from "../shared.queries";
import ListViewItem from "./ListViewItem";

const Container = styled.div`
  width: ${(props: ISProps) => props.theme.basciWidth};
`;

interface IProps {
  posts?: GetMe_GetMe_user_posts[] | null;
}

const PostListView: React.FC<IProps> = ({ posts }) => {
  const [statusMutation, { loading }] = useMutation<
    RentStatusUpdate,
    RentStatusUpdateVariables
  >(RENT_STAUTS);

  const mutationFunc = (rentId: string, status: string) => {
    return statusMutation({
      variables: {
        rentId,
        status
      }
    });
  };

  return (
    <Container>
      <List
        size="default"
        bordered
        dataSource={posts!}
        renderItem={(item, index) => (
          <ListViewItem
            key={index}
            post={item}
            mutationFunc={mutationFunc}
            loading={loading}
          />
        )}
      />
    </Container>
  );
};

export default PostListView;
