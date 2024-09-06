import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({
        message: "Одно из обязательных полей не заполнено",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "Пользователь с таким email уже существует",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
    return res.status(201).json({
      message: "Регистрация прошла успешно",
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Одно из обязательных полей не заполнено",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Пользователь с таким email не существует",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Неверный пароль",
        success: false,
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const populatedPosts = await Promise.all(
      user.posts.map(async (postId) => {
        const post = await Post.findById(postId);
        if (post.author.equals(user._id)) return post;
        return null;
      })
    );
    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
      gender: user.gender,
      followers: user.followers,
      following: user.following,
      posts: populatedPosts,
      bookmarks: user.bookmarks,
    };
    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
        secure: true,
      })
      .json({
        message: `Аутентификация прошла успешно ${user.username}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Вы вышли из аккаунта",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId).select("-password");
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { bio, gender } = req.body;
    const profilePicture = req.file;
    let cloudResponse;
    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
        success: false,
      });
    }
    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (profilePicture) user.profilePicture = cloudResponse.secure_url;
    await user.save();
    return res.status(200).json({
      message: "Профиль успешно обновлен",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select(
      "-password"
    );
    if (!suggestedUsers) {
      return res.status(404).json({
        message: "В настоящее время для вас нет рекомендуемых пользователей",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      suggestedUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

export const followOrUnfollow = async (req, res) => {
  try {
    const followKrneWala = req.id; // current user
    const jiskoFollowKrunga = req.params.id; // profile user
    if (followKrneWala === jiskoFollowKrunga) {
      return res.status(401).json({
        message: "Вы не можете подписаться на себя",
        success: false,
      });
    }
    const user = await User.findById(followKrneWala);
    const targetUser = await User.findById(jiskoFollowKrunga);
    if (!user || !targetUser) {
      return res.status(404).json({
        message: "Пользователь не найден",
        success: false,
      });
    }
    const idFollowing = user.following.includes(jiskoFollowKrunga);
    if (idFollowing) {
      await Promise.all([
        User.updateOne(
          { _id: followKrneWala },
          { $pull: { following: jiskoFollowKrunga } }
        ),
        User.updateOne(
          { _id: jiskoFollowKrunga },
          { $pull: { followers: followKrneWala } }
        ),
      ]);
      return res.status(200).json({
        message: "Вы отписались от этого пользователя",
        success: true,
      });
    } else {
      await Promise.all([
        User.updateOne(
          { _id: followKrnWala },
          { $push: { following: jiskoFollowKrunga } }
        ),
        User.updateOne(
          { _id: jiskoFollowKrunga },
          { $push: { followers: followKrnWala } }
        ),
      ]);
      return res.status(200).json({
        message: "Вы подписались на этого пользователя",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
