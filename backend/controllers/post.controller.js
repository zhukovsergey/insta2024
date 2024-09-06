import sharp from "sharp";
import cloudinary from "../utils/cloudinary";
import { User } from "../model/user.model";
import { Post } from "../model/post.model";

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
    const optimizedImageBuffer = await sharp(image.buffer)
      .resize({
        width: 800,
        height: 800,
        fit: "inside",
      })
      .toFormat("webp")
      .toBuffer();
    const fileUri = `data:image/webp;base64,${optimizedImageBuffer.toString(
      "base64"
    )}`;

    const cloudResponse = await cloudinary.uploader.upload(fileUri);
    const post = await Post.create({
      caption,
      image: cloudResponse.secure_url,
      authorId,
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
