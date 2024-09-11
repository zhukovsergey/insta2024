import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import { User } from "../model/user.model.js";
import { Post } from "../model/post.model.js";
import { Comment } from "../model/comment.model.js";
import fs from "fs";

export const addNewPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;
    if (!image) {
      return res.status(401).json({
        message: "Необходимо загрузить изображение",
        success: false,
      });
    }

    const newFileName = `${Date.now()}-${image.originalname}`;
    const resizedImg = await sharp(image.buffer)
      .resize({
        width: 800,
        height: 800,
        fit: "inside",
      })
      .toFormat("webp")
      .toFile(`./uploads/${newFileName}`);

    const post = await Post.create({
      caption,
      image: "/uploads/" + newFileName,
      author: authorId,
    });
    const user = await User.findById(authorId);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }
    await post.populate({
      path: "author",
      select: "-password",
    });
    return res.status(200).json({
      success: true,
      message: "Пост успешно добавлен",
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPost = async (req, res) => {
  try {
    const post = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "username profilePicture",
      })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username profilePicture",
        },
      });

    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserPost = async (req, res) => {
  try {
    const authorId = req.id;
    const post = await Post.find({ author: authorId })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "username profilePicture",
      })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username profilePicture",
        },
      });

    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const likeKrneWalaUserKiId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Пост не найден",
        success: false,
      });
    }
    await post.updateOne({
      $addToSet: { likes: likeKrneWalaUserKiId },
    });
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Пост успешно лайкнут",
      post,
    });
  } catch (error) {}
};

export const dislikePost = async (req, res) => {
  try {
    const likeKrneWalaUserKiId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Пост не найден",
        success: false,
      });
    }
    await post.updateOne({
      $pull: { likes: likeKrneWalaUserKiId },
    });
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Пост успешно дизлайкнут",
      post,
    });
  } catch (error) {}
};

export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { text } = req.body;
    const authorId = req.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Пост не найден",
        success: false,
      });
    }
    if (!text) {
      return res.status(400).json({
        message: "Текст комментария не может быть пустым",
        success: false,
      });
    }
    const newComment = await Comment.create({
      text,
      author: authorId,
      post: postId,
    });
    await newComment.populate({
      path: "author",
      select: "username profilePicture",
    });
    post.comments.push(newComment._id);
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Комментарий успешно добавлен",
      newComment,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCommentsOfPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ post: postId }).populate({
      path: "author",
      select: "username profilePicture",
    });
    if (!comments) {
      return res.status(404).json({
        message: "Комментарий не найдены",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);

    fs.unlink(`.${post.image}`, (err) => {
      if (err) console.log(err);
    });
    const authorId = req.id;
    if (!post) {
      return res.status(404).json({
        message: "Пост не найден",
        success: false,
      });
    }
    if (post.author.toString() !== authorId) {
      return res.status(401).json({
        message: "Вы не можете удалить этот пост т.к вы не автор этого поста",
        success: false,
      });
    }
    await Post.findByIdAndDelete(postId);
    let user = await User.findById(authorId);
    user.posts = user.posts.filter((id) => id.toString() !== postId);
    await user.save();

    await Comment.deleteMany({ post: postId });
    return res.status(200).json({
      success: true,
      message: "Пост успешно удален",
    });
  } catch (error) {}
};

export const bookmarkPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Пост не найден",
        success: false,
      });
    }
    const user = await User.findById(authorId);
    if (user.bookmarks.includes(post._id)) {
      // already  bookmarked
      await user.updateOne({
        $pull: { bookmarks: post._id },
      });
      return res.status(200).json({
        type: "unsaved",
        message: "Пост успешно удален из закладок",
        success: true,
      });
    } else {
      await user.updateOne({
        $push: { bookmarks: post._id },
      });
      return res.status(200).json({
        type: "saved",
        message: "Пост успешно добавлен в закладки",
        success: true,
      });
    }
  } catch (error) {}
};
