'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken');
// const jwksClient = require('jwks-rsa');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
app.use(express.json())
mongoose.connect(`${process.env.MONGODB}`, { useNewUrlParser: true, useUnifiedTopology: true });


const booksSchema=new mongoose.Schema({
  name:String,
  description:String,
  status:String,
  img:String
});

const clientSchema= new mongoose.Schema({
  name: String,
  books: [booksSchema],
  email:String
})

const userBooks = mongoose.model('Book', ownerSchema);

function seedClientCollection() {
  
  const taima = new userModel({email: 'taima.hajaj@gmail.com', books: [
    { name: 'The Growth Mindset', description: 'Dweck coined the terms fixed mindset and growth mindset to describe the underlying beliefs people have about learning and intelligence. When students believe they can get smarter, they understand that effort makes them stronger. Therefore they put in extra time and effort, and that leads to higher achievement.', status: 'FAVORITE FIVE', img: 'https://m.media-amazon.com/images/I/61bDwfLudLL._AC_UL640_QL65_.jpg' },
    { name: 'The Momnt of Lift', description: 'Melinda Gates shares her how her exposure to the poor around the world has established the objectives of her foundation.', status: 'RECOMMENDED TO ME', img: 'https://m.media-amazon.com/images/I/71LESEKiazL._AC_UY436_QL65_.jpg'}
  ]})
  // taima.save();
}

// seedClientCollection();

app.get('/', homePageHandler);

function homePageHandler(req, res) {
  res.send('all good')
}

app.get('/books',booksHandler);
function booksHandler(req,req){
  let userEmail=req.query.userEmail;
  userModel.find(
    {email:userEmail},function(error,ownerData){
    if(error){
        res.send(error,'did not work')
      }
    else{
        res.send(ownerData[0].books)
    }
    
})

server.post('/addbook',addingBook);
server.delete('/deletebook/:bookIndex',deletingBook);

function addingBook(req,res){
    let {email,name,description,status,img}=req.body
    myModal.find({email:email},function(error,bookData){
         if(error){
             res.send('did not work')
         }else{
             bookData[0].books.push({
                name: name,
                description: description,
                status: status,
                img: img,
             })
             bookData[0].save();
             res.send( bookData[0].books)
         }
    })
}

function deletingBook(req,res){
    let emailReq=req.query.email;
    let index=Number(req.params.bookIndex);

    bookModle.find({email:emailReq},function(error,bookData){
        if(error){
            res.send('did not work')
        }else{
            let newBooksArr = bookData[0].books.filter((book,idx)=>{
                if(idx !== index) {return book}
             
            })
            bookData[0].books=newBooksArr
            
            bookData[0].save();
            res.send(bookData[0].books)
         }
        
    })
}

server.put('/updatebook',updateBook)
function updateBook(req,res){
  let {email,name,description,status,img}=req.body;
  let index=Number(req.params.bookIndex);

  myModal.findOne({email:email},function(error,bookData){
       if(error){
           res.send('did not work')
       }else{
           bookData[0].books.splice(index,1,{
              name: name,
              description: description,
              status: status,
              img: img,
           })
           bookData[0].save();
           res.send( bookData[0].books)
       }
  })

}


}
  

app.listen(PORT, () => console.log(`listening on ${PORT}`));
