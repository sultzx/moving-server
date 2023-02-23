import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import User from "../models/User.js";

export const registration = async (req, res) => {
  try {
    const { username, email, company, password } = req.body;

    console.log(username, email, company, password);

    const isEmailExist = await User.findOne({
      email: email,
    });

    if (isEmailExist) {
      return res.status(400).json({
        message: "Қолданушы желіде тіркелген",
      });
    }

    const salt = await bcrypt.genSalt(6);
    const hash = await bcrypt.hash(password, salt);

    let document = "";

    if (company != undefined) {
      document = new User({
        username,
        email,
        company,
        hashedPassword: hash,
        role: "employee",
      });
    } else {
      document = new User({
        username,
        email,
        hashedPassword: hash,
      });
    }

    const user = await document.save();

    const { hashedPassword, ...userData } = user._doc;

    const token = jwt.sign(
      {
        _id: user._id,
      },
      config.get("jwt_key"),
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      userData,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const login = async (req, res) => {
  const { login, password } = req.body;

  console.log(login, password);

  try {
    let user = "";

    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };

    if (validateEmail(login)) {
      user = await User.findOne({ email: login });
      if (!user) {
        return res.status(404).json({
          message: `Қолданушы "${login}" желіде жоқ`,
        });
      }
    } else {
      user = await User.findOne({  username: login  });

      if (!user) {
        return res.status(404).json({
          message: `Қолданушы "${login}" желіде жоқ`,
        });
      }
    }

    const isPassValid = await bcrypt.compare(
      password,
      user._doc.hashedPassword
    );

    if (!isPassValid) {
      return res.status(400).json({
        message: "Құпия сөз қате терілген",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      config.get("jwt_key"),
      {
        expiresIn: "1h",
      }
    );

    const { hashedPassword, ...userData } = user._doc;

    res.status(200).json({
      ...userData,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    const userId = req.userId;

    await User.updateOne(
      {
        _id: userId,
      },
      {
        name,
        phone,
        address,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const me = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "Қолданушы желіде жоқ",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
