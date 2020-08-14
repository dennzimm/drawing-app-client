import React from "react";
import styled from "styled-components";
import DeleteButton from "../DeleteButton/DeleteButton";

const Wrapper = styled.div`
  position: absolute;
  left: 14px;
  bottom: 24px;
`;

const DeleteButtonWrapper: React.FC = () => {
  return (
    <Wrapper>
      <DeleteButton />
    </Wrapper>
  );
};

export default DeleteButtonWrapper;
