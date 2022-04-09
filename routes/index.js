var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/danhsach', function(req, res, next) {
  var da2=da;
  res.render('danhsach', { title: '',Da2:da2 });
});
var dbb = 'mongodb+srv://admin:k95rio6dQLn3pOd5sd@cluster0.7tjbc.mongodb.net/mydata?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(dbb).catch(error => {
  console.log("co loi xay ra" + error)
});
var MongoClient = require('mongodb').MongoClient;
var da={};
var url="mongodb+srv://admin:k95rio6dQLn3pOd5sd@cluster0.7tjbc.mongodb.net/mydata?retryWrites=true&w=majority"
var mogo = new MongoClient(url,{ useNewUrlParser:true});
mogo.connect((err,db)=>{
  if (err) throw err;
  console.log("ket noi thanh cong")
  var dbo= db.db("mydata")

  dbo.collection("cars").find().toArray((err,objs)=>{
    if (err) throw err;
    if (objs.length != 0) console.log("lay duu lieu ok ");
   da=objs
    db.close();
  })
})

router.get('/cars', function (req, res) {
  Car.find({}, function (err, data) {
    res.render('cars', {duLieu: data})
  })
})
//buoc 1 : khoi tao khung - Schema
var carSchema = new mongoose.Schema({
  maXe: 'string',
  noidung: 'string',
  linkxe:'String'

})
// buoc 2 : lien ket Schema vs mongoDB qua mongoose
var Car = mongoose.model('car', carSchema);

router.post('/addCar', function (req, res) {
  var maXe = req.body.maXe
  var noidung= req.body.noidung
  var linkxe= req.body.linkxe
  // b3 : khởi tạo Car vs giá trị lấy được
  const car = new Car({
    maXe: maXe,
    noidung: noidung,
    linkxe: linkxe
  })
  car.save(function (error) {
    var mess;
    if (error == null) {
      mess = 'Them thanh cong'
    } else {
      mess = error
    }

    res.render('index')
  })
})
router.post('/btn', function (req, res) {

    res.render('sua')
})

module.exports = router;
