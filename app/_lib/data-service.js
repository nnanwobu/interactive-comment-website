import { eachDayOfInterval } from "date-fns";
import { notFound } from "next/navigation";
import axios from "axios";

/////////////
// GET

// "https://restcountries.com/v2/all?fields=name,flag"

export async function getComments() {
  try {
    const res = await fetch(
      "https://interactive-comment-backend.vercel.app/api/v2/comments"
    );
    // const res = await fetch(
    //   "https://interactive-comment.onrender.com/api/v2/comments"
    // );

    const data = await res.json();

    const comments = data.data.comments;
    return comments;
  } catch {
    throw new Error("Could not fetch comments");
  }
}

export async function createUser(obj) {
  try {
    const user = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(obj),
      url: "https://interactive-comment-backend.vercel.app/api/v2/users",
    });

    return user;
  } catch {
    throw new Error("user could not be created");
  }
}

export async function getUserByEmail(email) {
  try {
    const res = await fetch(
      `https://interactive-comment-backend.vercel.app/api/v2/users/user/${email}`
    );
    const user = res.json();

    return user;
  } catch {
    throw new Error("user could not be found");
  }
}

export async function createComment(obj) {
  try {
    const comment = await axios.post(
      "https://interactive-comment-backend.vercel.app/api/v2/comments",
      obj
    );

    return comment;
  } catch {
    throw new Error("comment could not be created");
  }
}
// export async function createComment(obj) {
//   console.log(obj.content);
//   try {
//     const comment = await axios({
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: JSON.stringify(obj),
//       url: "https://interactive-comment-backend.vercel.app/api/v2/comments",
//     });

//     return comment;
//   } catch {
//     throw new Error("comment could not be created");
//   }
// }

export async function replyComment(obj) {
  try {
    const reply = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(obj),
      url: `https://interactive-comment-backend.vercel.app/api/v2/comments/${obj.commentID}/replies`,
    });
    return reply;
  } catch {
    throw new Error("reply could not be created");
  }
}

export async function updateComment(obj) {
  try {
    const comment = await axios.patch(
      `https://interactive-comment-backend.vercel.app/api/v2/comments/${obj.commentID}`,
      { content: obj.content }
    );

    return comment;
  } catch {
    throw new Error("comment could not be updated");
  }
}

export async function updateReply(obj) {
  try {
    const reply = await axios.patch(
      `https://interactive-comment-backend.vercel.app/api/v2/replies/${obj.commentID}`,
      { content: obj.content }
    );

    return reply;
  } catch {
    throw new Error("comment could not be updated");
  }
}

export async function deleteComment(id) {
  console.log(id);
  try {
    const comment = await axios.delete(
      `https://interactive-comment-backend.vercel.app/api/v2/comments/${id}`
    );

    return comment;
  } catch {
    throw new Error("check your route");
  }
}

export async function deleteReply(id) {
  console.log(id);
  try {
    const reply = await axios.delete(
      `https://interactive-comment-backend.vercel.app/api/v2/replies/${id}`
    );

    return reply;
  } catch {
    throw new Error("check your route");
  }
}
