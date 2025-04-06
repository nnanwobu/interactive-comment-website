"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";

import { revalidatePath } from "next/cache";
import {
  replyComment,
  updateComment,
  updateReply,
  deleteComment,
  deleteReply,
  createComment,
} from "../_lib/data-service";
import { redirect } from "next/navigation";

export async function postComment(formData) {
  const session = await auth();
  const content = formData.get("content");
  const obj = { content, user: session.user.id };

  try {
    await createComment(obj);
  } catch (error) {
    throw new Error("comment could not be posted");
  }

  revalidatePath("/");
}

export async function replycomment(formData) {
  const session = await auth();
  const content = formData.get("content");
  const commentID = formData.get("commentID");

  const obj = {
    content,
    user: session.user.id,
    comment: commentID,
  };
  console.log(obj);
  try {
    await replyComment(obj);
  } catch (error) {
    throw new Error("reply could not be posted");
  }

  revalidatePath("/");
  // redirect("/cabins/thankyou");
}

export async function updatecomment(formData) {
  const content = formData.get("content");
  const commentID = formData.get("commentID");
  const mode = formData.get("mode");
  const obj = { content, commentID };

  try {
    if (mode === "comment") await updateComment(obj);
    if (mode === "reply") await updateReply(obj);
  } catch (error) {
    throw new Error("reply could not be updated");
  }
  revalidatePath("/");
  // redirect("/cabins/thankyou");
}

export async function deletecomment(id, mode) {
  try {
    if (mode === "comment") await deleteComment(id);
    if (mode === "reply") await deleteReply(id);
  } catch (error) {
    throw new Error(`reply could not be deleted: ${error.message}`);
  }
  revalidatePath("/");
  // redirect("/cabins/thankyou");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}
export async function signInActionGithub() {
  await signIn("github", { redirectTo: "/" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
