import Order from "../../../models/Order";
import dbConnect from "../../../util/mongodb";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "PUT") {
    try {
      const newOrder = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(newOrder);
      res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");

    } catch (error) {
      res.status(500).json(error);
    }
  }
}
