import Order from "../models/Order.js";
import User from "../models/User.js";
import Carbody from "../models/Carbody.js";

export const create = async (req, res) => {
  try {
    const { title, description, category, datetime, carBody, img } = req.body;

    const car_body = await Carbody.findOne({
      title: carBody
    })

    const document = new Order({
      title,
      description,
      category,
      datetime,
      carBody: car_body._id,
      img,
      owner: req.userId,
    });

    const order = await document.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("carBody")
      .populate("owner")
      .populate("employee")
      .exec();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId)
      .populate("carBody")
      .populate("owner")
      .populate("employee")
      .exec();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const orderId = req.params.id;

    Order.findOneAndDelete(
      {
        _id: orderId,
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: "Тапсырыс өшіру кезінде қате шықты",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Тапсырыс жүйеде жоқ",
          });
        }
        res.status(200).json({
          success: true,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {

    const { id, title, description, category, datetime, carBody, img } = req.body;

    const selectedCarBody = await Carbody.findOne({
      title: carBody
    })

    await Order.updateOne(
      {
        _id: id,
      },
      {
        title,
        description,
        category,
        datetime,
        carBody: selectedCarBody,
        img,
        owner: req.userId,
      }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const setStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    const userId = req.userId;

    const employee = await User.findById(userId);

    if (employee.role != "employee") {
      return res.status(404).json({
        message: "Сіздің дәрежеңіз қызметкер емес",
      });
    }

    await Order.updateOne(
      {
        _id: id,
      },
      {
        status,
        employee: employee._id,
      }
    );

    res.status(200).json({ 
        success: true,
        status: status,
        userId,
        employee
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
