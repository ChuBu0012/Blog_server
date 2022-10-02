//ติดต่อกับฐานข้อมูล //ดำเนินการกับฐานข้อมูล
const Blogs = require("../models/Blogs");
const slugify = require("slugify");
const { v4: uuidv4 } = require("uuid");
//บันทึกข้อมูล
exports.create = (req, res) => {
  const { title, content } = req.body;
  let { author } = req.body;
  let slug = slugify(title);
  if (!slug) slug = uuidv4();
  if (!author) author = "Admin";
  switch (true) {
    case !title:
      return res.status(400).json({ error: "กรุณาป้อนชื่อบทความ" });
      break;
    case !content:
      return res.status(400).json({ error: "กรุณาป้อนเนื้อหาบทความ" });
      break;
  }
  Blogs.create({ title, content, author, slug }, (err, blog) => {
    if (err) {
      res.status(400).json({ error: err });
    }
    res.json(blog);
  });
};

exports.getAllBlogs = (req, res) => {
  Blogs.find({}).exec((err, blogs) => {
    if (err) console.log(err);
    res.json(blogs);
  });
};

exports.getBlog = (req, res) => {
  const { slug } = req.params;
  Blogs.findOne({ slug }).exec((err, blog) => {
    if (err) console.log(err);
    res.json(blog);
  });
};

exports.remove = (req, res) => {
  const { slug } = req.params;
  Blogs.findOneAndDelete({ slug }).exec((err, blog) => {
    if(err) console.log(err);
    res.json({
      message:"ลบบทความเรียบร้อย"
    })
  });
};

exports.update = (req,res) =>{
  const { slug } = req.params;
  const {title,content,author} = req.body
  Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,blog)=>{
    if (err) console.log(err);
    res.json(blog)
  })
}