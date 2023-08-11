const express = require("express");
const router = express.Router()
const Product = require("../models/product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function convertToSlug(str) {
  // Replace spaces with hyphens
  const slug = str.replace(/\s+/g, '-');

  // Convert to lowercase
  const lowercaseSlug = slug.toLowerCase();

  return lowercaseSlug;
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
 
    const product = convertToSlug(req.headers.title)
    const destinationPath = path.join("imgs", product); // Combine the "imgs" folder with the product name

    // Use fs.mkdirSync to create the folder if it doesn't exist
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    cb(null, destinationPath);

  },
  filename: (req,file,cb) => {
    // console.log(file);
    let pathName = Date.now() + path.extname(file.originalname)
    cb(null, pathName);
    req.imageNameArray = [...req.imageNameArray, pathName]

  }
})

const setEmptyImageNameArray = (req, res, next) => {
  req.imageNameArray = [];
  next();
};
  

const upload = multer({storage: storage});

router.post("/",setEmptyImageNameArray, upload.any('files'), async (req, res) => {

  try {

    const product = JSON.parse(req.body.data)
   
    const isProduct = await Product.findOne({title: product.title});

    if (isProduct){
        return res.status(401).json({success: false, msg: "Product already Exists"});
    }
    
    await new Product({...product, slug: convertToSlug(product.title), details: {...product.details, imgs: req.imageNameArray}, category: {...product.category, slug: convertToSlug(product.category.broad_category)}}).save();
    console.log(`Product '${product.title}' Listed Successfully`.blue.bold);
    return res.status(200).json({success: true, msg: "Product Listed Successfully"});
    
  } catch (error) {
    console.log(`${error.message} (error)`.red);
    console.log(`${error.stack} (stack)`.red);
    return res.status(400).json({success: false, msg: error.message});
  }
   
});


router.delete("/delete/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, msg: "Product doesn't Exist" });
    }
    await Product.deleteOne({ _id: productId });

    console.log(`Product with _id '${productId}' has been deleted successfully`.blue.bold);
    return res.status(200).json({ success: true, msg: "Product deleted successfully" });

  } catch (error) {
    console.log(`${error.message} (error)`.red);
    console.log(`${error.stack} (stack)`.red);
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});

module.exports = router;


