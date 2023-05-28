import Order from "../models/Order.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Car from "../models/Car.js";

export const create = async (req, res) => {
  try {
    const { title, description, price, category, datetime, car, img } = req.body;

    console.log(car)

    const document = new Order({
      title,
      description,
      category,
      datetime,
      clientPrice: price,
      car: car,
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
      .populate("car")
      .populate("owner")
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
      .populate("car")
      .populate("owner")
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

    const { id, title, description, price, category, datetime, car, img } = req.body;


    await Order.updateOne(
      {
        _id: id,
      },
      {
        title,
        description,
        category,
        datetime,
        clientPrice: price,
        car,
        img,
        owner: req.userId,
      }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const selectOtherDriver = async (req, res) => {
  try {
    const { id, price, car } = req.body;


    await Order.updateOne(
      {
        _id: id,
      },
      {
        clientPrice: price,
        car,
      }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const setDriverPrice = async (req, res) => {
  try {
    const { id, price } = req.body;


    await Order.updateOne(
      {
        _id: id,
      },
      {
        driverPrice: price,
      }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const setStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    const userId = req.userId;

    const employee = await User.findById(userId);

    // if (employee.role != "employee") {
    //   return res.status(404).json({
    //     message: "Сіздің дәрежеңіз қызметкер емес",
    //   });
    // }

    await Order.updateOne(
      {
        _id: id,
      },
      {
        status,
        // employee: employee._id,
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

export const comment = async (req, res) => {
  try {
    const userId = req.userId

    const {car, rating, comment} = req.body

    const document = new Comment({
      car,
      rating,
      comment,
      creator: userId
    })

    await document.save()

    res.status(200).json()

  } catch (error) {
    res.status(500).json(error.message );
  }
}

export const getAllComments = async (req, res) => {
  try {
    
    const comments = await Comment.find().populate('car').populate('creator').exec()

    console.log('comments')

    res.status(200).json(comments)

  } catch (error) {
    res.status(500).json({ message:  error.message });
  }
}