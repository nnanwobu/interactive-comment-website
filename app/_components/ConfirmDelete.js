"use client";
import styled from "styled-components";
import Heading from "./Heading";
import Btn from "./Btn";
import toast from "react-hot-toast";
import { deletecomment } from "../serverActions/actions";

import SpinnerMini from "./SpinnerMini";
import { useTransition } from "react";

const StyledConfirmDelete = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: #6b7280;
    margin-bottom: 1.2rem;
    overflow-wrap: break-word;
    justify-self: center;
    width: 50vw;
  }

  & div {
    display: flex;
    /* flex-wrap: wrap; */
    align-items: center;
    justify-self: center;
    justify-content: space-between;
    gap: 1.2rem;
    width: 50vw;
  }
`;

function ConfirmDelete({ onCloseModal, resourceName, disabled, id, mode }) {
  const [isPending, startTransition] = useTransition();
  async function handleDelete() {
    startTransition(async () => {
      const result = await deletecomment(id, mode);
      if (result?.err) {
        toast.error(result.err);
      } else {
        toast.success("record deleted successfully");
        onCloseModal();
      }
    });
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
          {isPending ? (
            <span className="flex gap-1">
              <SpinnerMini />
              <span>del..</span>
            </span>
          ) : (
            <span>Delete</span>
          )}
        </Btn>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
