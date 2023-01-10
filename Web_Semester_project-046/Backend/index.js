const express = require("express");
const cors = require("cors");
const Product = require("./db/Product");
require("./db/config");
const User = require("./db/User");
const { findOne } = require("./db/User");
const Jwt = require("jsonwebtoken");
const jwtkey = "e-comm";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send({ result: "Something went wrong, Try again after sometime.." });
    }
    resp.send({ result, auth: token });
  });
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({
            result: "Something went wrong, Try again after sometime..",
          });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send({ result: "User not Found" });
    }
  } else {
    resp.send({ result: "User not Found" });
  }
  console.log(req.body.password)
});

app.post("/add-product", async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products", async (req, resp) => {
  let products = await Product.find();

  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "Products not Found" });
  }
});

app.delete("/product/:id", async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/product/:id", async (req, resp) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No record found" });
  }
});

app.put("/product/:id", async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.get("/search/:key", async (req, resp) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

// // Another Midlleware
// function verifyToken(req, resp, next) {
//   let token = req.headers["authorization"];
//   if (token) {
//     token = token.split(' ')[1];
//     Jwt.verify(token, jwtkey, (err, valid) => {
//       if (err) {
//         resp.status("401").send({ result: "Please provide valid token" });
//       } else {
//         next();
//       }
//     });
//   } else {
//     resp.status("403").send({ result: "Please add token with header" });
//   }
//   next();
// }




app.listen(5000);
