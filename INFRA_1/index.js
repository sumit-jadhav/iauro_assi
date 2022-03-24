const { response } = require("express")
const express = require("express")
const { ServerApiVersion, Db } = require("mongodb")
const MongoClient = require("mongodb").MongoClient

const app = express()
app.use(express.json())
var database

app.get("/", (req, resp) => {
  resp.send("welcome to mangodb connction for shop")
})

app.get("/shop", (req, resp) => {
  console.log("entered into get shop")
  database
    .collection("products")
    .find({})
    .toArray((err, result) => {
      if (err) throw err
      resp.send(result)
    })
})

app.post("/shop/addproduct", (req, resp) => {
  let repo = database.collection("products").find({})
  let pro = {
    product: req.body.product,
    price: req.body.price,
  }
  database.collection("products").insertOne(pro, (err, result) => {
    if (err) {
      return resp.status(500).send(err)
    }
    resp.send("added succesfuly!!")
  })
})

app.delete("/shop/:name", (req, resp) => {
  database
    .collection("products")
    .deleteOne({ product: req.params.name }, (err, result) => {
      if (err) throw err
      resp.send("product is deleted")
    })
})

app.put("/shop/:name", (req, resp) => {
  let query = { product: req.params.name }
  let book = {
    product: req.body.product,
    price: req.body.price,
  }
  let dataset = {
    $set: book,
  }
  database.collection("products").updateOne(query, dataset, (err, result) => {
    if (err) throw err
    resp.send(book)
  })
})

// app.put("/shop/:id", (req, resp) => {
//   let repo = {
//     id: parseInt(req.params.id),
//     product: req.body.product,
//     price: parseInt(req.body.price),
//   }
//   database
//     .collection("products")
//     .updateMany(
//       { id: parseInt(req.params.id) },
//       { $set: repo },
//       (err, result) => {
//         if (err) throw err
//         resp.send(repo)
//       }
//     )
// })

app.listen(9080, () => {
  var url = "mongodb://mongo:27017/Shop"

  MongoClient.connect(url, function (err, db) {
    if (err) throw err
    console.log("Database created!")
    database = db.db("Shop")
    // database.createCollection("products", (err, res) => {
    //   if (err) throw err
    //   console.log("collection created")
    // })
  })

  // MongoClient.connect(
  //   "mongodb://mongo:27017/",
  //   { useNewUrlParser: true },
  //   (error, result) => {
  //     if (error) throw error
  //     database = result.db("Shop")
  //     console.log("connection succesfulllll")
  //   }
  // )
  //  console.log("listning on port 9080")
})
