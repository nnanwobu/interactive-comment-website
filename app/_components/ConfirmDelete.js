"use client";
import styled from "styled-components";
import Heading from "./Heading";
import Btn from "./Btn";
import toast from "react-hot-toast";
import { deletecomment } from "../serverActions/actions";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: #6b7280;
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ onCloseModal, resourceName, disabled, id, mode }) {
  async function handleDelete() {
    const result = await deletecomment(id, mode);
    if (result?.err) {
      toast.error(result.err);
    } else {
      toast.success("record deleted successfully");
      onCloseModal();
    }
  }
  return (
    <StyledConfirmDelete>
      <Heading as="h6">Delete {resourceName}</Heading>
      <p>Are you sure you want to delete this {resourceName}</p>

      <div style={{ display: "flex", justifyContent: "start" }}>
        <Btn
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
          sizes="small"
        >
          Cancel
        </Btn>
        <Btn
          variation="danger"
          sizes="small"
          disabled={disabled}
          onClick={handleDelete}
        >
          Delete
        </Btn>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
