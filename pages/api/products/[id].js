import { GiCarnivoreMouth } from "react-icons/gi";
import Product from "../../../models/Product";
import dbConnect from "../../../util/mongodb.js";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "PUT") {
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    try {
      await Product.findByIdAndDelete(id);
      res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");
      res.status(200).json("product has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
