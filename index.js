const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path')
const { createProduct } = require('./controller/Product');
const productsRouter = require('./routes/Products');
const categoriesRouter = require('./routes/Categories');
const brandsRouter = require('./routes/Brands');
const usersRouter = require('./routes/Users');
const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Cart');
const ordersRouter = require('./routes/Order');


//middlewares

// server.use(express.static(path.join(__dirname, "./client/build")));
// server.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./client/build/index.html"),
//     function (err) {
//       res.status(500).send(err);
//     }
//   );
// });
server.use(cors({
    exposedHeaders:['X-Total-Count']
}))
server.use(express.json()); // to parse req.body
server.use('/api/products', productsRouter.router);
server.use('/api/categories', categoriesRouter.router)
server.use('/api/brands', brandsRouter.router)
server.use('/api/users', usersRouter.router)
server.use('/api/auth', authRouter.router)
server.use('/api/cart', cartRouter.router)
server.use('/api/orders', ordersRouter.router)

main().catch(err=> console.log(err));

async function main(){
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.sbdt3nn.mongodb.net/?retryWrites=true&w=majority');
    console.log('database connected')
}

server.get('/',(req, res)=>{
    res.json({status:'success'})
})



server.listen(8080, ()=>{
    console.log('server started')
})
