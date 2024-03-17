const Publishkey = 'pk_test_51OnD5DSHKuOJ2OzwK75MUOL0gh3uRoE1bZcBAtUwHfNutdDO82rga092Oh38PgDgZWS3v3gGqSKUM8BUrll0Ln6800rCwKR3jc'

const Secretkey = 'sk_test_51OnD5DSHKuOJ2Ozwfov2PAvt9eVPFPNr1OW69TbjybEKQigT7xG4ecDE78yGUj2bzmJdswdhDXfRyE6yYutcUZXR00rtZOBiAj'


const Express = require('express')

const App = Express()

const Workers = require('worker_threads')

const CORS = require('cors')

const BCRYPT = require('bcryptjs')

const Mongoose = require('mongoose')

const Stripe = require('stripe')(Secretkey)

const Cookieparser = require('cookie-parser')

const JWT = require('jsonwebtoken')



App.use(Cookieparser())



App.use(Express.urlencoded())

App.use(CORS({
    origin: 'https://frontend-6lrd.onrender.com', // Allow requests from this origin
    credentials: true,
}))

App.use(Express.json())



Mongoose.connect('mongodb+srv://Phani2612:2612@cluster0.nxfzz84.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0')




const Addreschema = new Mongoose.Schema({

     id:{
         
         type : Number
     },

      Firstname:{
          type:String
      },

      Lastname : {
        type : String
      },

      Address : {
         type:String
      },

      City : {
           
          type : String
      },

      State : {
           
           type : String
      },

      Zip : {

         type : String
      }

})


const Addressmodel = Mongoose.model("Address" , Addreschema)



const Registrationschema = new Mongoose.Schema({
      
      name:{

        type : String,

        

      },
      email:{
          type:String,
          
          
      },

      password : {

          type : String,
          
          
      }
})


const Registermodel = Mongoose.model("Register" , Registrationschema)




const ProductSchema = new Mongoose.Schema({
     
     id:{
          
        type:Number,
        unique : true
     },

     title : {

        type : String,
        
     },

     price:{
         type:Number
     },

     description : {
        type : String
     },

     category : {

         type : String
     },

     image : {
           type : String
     }
})

const ProductModel = Mongoose.model("Products" , ProductSchema)


const Cartschema = new Mongoose.Schema({
    id:{
          
        type:Number,
        unique : true
     },

     title : {

        type : String,
        
     },

     price:{
         type:Number
     },

     description : {
        type : String
     },

     category : {

         type : String
     },

     image : {
           type : String
     },

     quantity : {

        type : Number
     },

     final: {
        type: Number,
        validate: {
            validator: Number.isFinite,
            message: '{VALUE} is not a valid number'
        }
    }
})

const CartModel = Mongoose.model("Cart" , Cartschema)






const OrderSchema = new Mongoose.Schema({
    id:{
          
        type:Number,
        unique : true
     },

     title : {

        type : String,
        
     },

     price:{
         type:Number
     },

     description : {
        type : String
     },

     category : {

         type : String
     },

     image : {
           type : String
     },

     quantity : {

        type : Number
     },

     final: {
        type: Number,
        validate: {
            validator: Number.isFinite,
            message: '{VALUE} is not a valid number'
        }
    }
})

const OrderModel = Mongoose.model("Orders" , OrderSchema)






const Orderhistoryschema = new Mongoose.Schema({
    id:{
          
        type:Number,
        unique : true
     },

     title : {

        type : String,
        
     },

     price:{
         type:Number
     },

     description : {
        type : String
     },

     category : {

         type : String
     },

     image : {
           type : String
     },

     quantity : {

        type : Number
     },

     final: {
        type: Number,
        validate: {
            validator: Number.isFinite,
            message: '{VALUE} is not a valid number'
        }
    }
})

const OrderhistoryModel = Mongoose.model("Orderhistory" , Orderhistoryschema)






const OrderSaveschema = new Mongoose.Schema({
    id:{
          
        type:Number,
        unique : true
     },

     title : {

        type : String,
        
     },

     price:{
         type:Number
     },

     description : {
        type : String
     },

     category : {

         type : String
     },

     image : {
           type : String
     },

     quantity : {

        type : Number
     },

     final: {
        type: Number,
        validate: {
            validator: Number.isFinite,
            message: '{VALUE} is not a valid number'
        }
    }
})

const OrderSaveModel = Mongoose.model("OrderSave" , OrderSaveschema)





const Contactschema = new Mongoose.Schema({


       Name : {
           
          type : String
       },

       Email : {

           type : String
       },

       Subject : {

           type : String
       },

       Message : {

          type : String
       }


})


const Contactmodel = Mongoose.model("Contact" , Contactschema)














function Verifytoken(req,res,next)
{



      let FetchedJWT = req.cookies.token

     

      if(!FetchedJWT)
      {
        //   console.log(FetchedJWT)
          
          return res.redirect('http://localhost:3000')
      }

      else{

    
        JWT.verify(FetchedJWT , "WelcomeBro" , function(error)
        {
            if(error)
            {
                  console.log(error)

                  return res.redirect('http://localhost:3000')
            }

            else{

                next()
            }
        })




      }


}








App.post('/register' , async function(req,res)
{
    

    const Name = req.body.name

    const Email = req.body.email

    const Password = req.body.password

    const Confirm = req.body.confirmpassword

    const HashedPassword = await BCRYPT.hash(Password,12)

    // console.log(HashedPassword)

    if(Password === Confirm)
    {
        new Registermodel({

            name : Name,
  
            email : Email,
  
            password : HashedPassword
  
      }).save().then(function(output)
      {
          console.log(output)
      }).catch(function(error)
      {
          console.error(error)
      })

      res.send("Login")
    }

    else{

             res.send("Register")
    }
    
    

})


App.post('/login' , async function(req,res)
{
       const MyEmail = req.body.email

       const Entereddata = req.body

      
       

       const check = await Registermodel.findOne({email:MyEmail})

       
       

       if(check != null)
       { 
        const ActualPassword = check.password

        const MyPassword = req.body.password

        const confirmation = await BCRYPT.compare(MyPassword , ActualPassword )

        if(confirmation === true)
        {


           const JWTtoken =  await JWT.sign( Entereddata , "WelcomeBro" , {expiresIn:'3hr'})

        //    console.log(JWTtoken)

           res.cookie("token" , JWTtoken)

        // res.cookie("token", JWTtoken, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production', // Set to true in production
        // });

           
            res.send("home")
        }

        else{

            res.send("login")
        }

           
       }

       else{

            res.send("register")
       }

       
})



App.post('/contact' , async function(req,res)
{
        

         const Data = req.body


         new Contactmodel({


               Name : Data.name,

               Email : Data.email,

               Subject : Data.subject,

               Message : Data.message
         }).save().then(function(output)
         {
            res.send("Successfully saved")
         }).catch(function(error)
         {
            console.error(error)
         })
  
}) 




App.get('/getproduct'  , Verifytoken ,  async function(req,res)
{
       
    
       
            const Productdetails = await ProductModel.find()

     

            res.send(Productdetails)
       
})


App.post('/add'     ,async function(req,res)
{
      const fetcheddata = req.body

    

      fetcheddata.map(async function(i)
      {

         const checktheproduct = await ProductModel.findOne({id : i.id}) 

        //  console.log(checktheproduct)


          if(checktheproduct != null)
          {
                 return
          }
          
          else{

               new ProductModel({
 
                id : i.id,

                title : i.title,

                price : i.price,

                description : i.description,

                category : i.category,

                image : i.image

            }).save().then(function(output)
            {
              console.log(output)
              res.send()
            }).catch(function(error)
            {
              console.error(error)
            })
          }
      })
})


App.post('/cart',  async function(req, res) {

        
        const i = req.body;

        const checktheproduct = await CartModel.findOne({ id: i.id });
    
        const quantity = parseInt(i.quantity);
    
        if (isNaN(quantity)) {
            // Handle invalid quantity
           
            const Cartdata = await CartModel.find();
            
            res.send(Cartdata);
        } else {
            // Use parsed quantity
            
    
            if (checktheproduct != null) {
                await CartModel.findOneAndUpdate({ id: checktheproduct.id }, { $set: { quantity: checktheproduct.quantity + 1 } });
    
                await CartModel.findOneAndUpdate({ id: checktheproduct.id }, { $set: { final: checktheproduct.price * (checktheproduct.quantity + 1) } });
    
                const Cartdata = await CartModel.find();
    
                res.send(Cartdata);
            } else {
                const InitialCartdata = new CartModel({
                    id: i.id,
                    title: i.title,
                    price: i.price,
                    description: i.description,
                    category: i.category,
                    image: i.image,
                    quantity: quantity,
                    final: i.price
                });
    
                InitialCartdata.save().then(function(output) {
                    console.log(output);
                }).catch(function(error) {
                    console.error(error);
                });
    
                const Cartdata = await CartModel.find();
    
                res.send(Cartdata);
            }
        }
    
});







App.post('/Particular'  , async function(req,res)
{
      const i = req.body
      
      const Orderdata =  await OrderModel.findOne({id:i.id})

      const Cartdata = await CartModel.findOne({id:i.id})

    
      if(!Orderdata)
      {
           if(Cartdata)
           {
            new OrderModel({

                id: i.id,
                title: i.title,
                price: i.price,
                description: i.description,
                category: i.category,
                image: i.image,
                quantity: Cartdata.quantity,
                final: Cartdata.final
        
        
        
        
              }).save().then(function(output)
              {
                  console.log(output)
                  
              }).catch(function(error)
              {
                console.error(error)
              })
           }

           else{

            new OrderModel({

                id: i.id,
                title: i.title,
                price: i.price,
                description: i.description,
                category: i.category,
                image: i.image
        
        
        
        
              }).save().then(function(output)
              {
                  console.log(output)
              }).catch(function(error)
              {
                console.error(error)
              })


           }
      }

      else{

          return
      }
})





App.post('/all' , async function(req,res)
{
    const Allproducts = req.body
      
    

    Allproducts.map(async function(i)
    {
        const Orderdata =  await OrderModel.findOne({id:i.id})

        const Cartdata = await CartModel.findOne({id:i.id})

        
      if(!Orderdata)
      {
        new OrderModel({

            id: i.id,
            title: i.title,
            price: i.price,
            description: i.description,
            category: i.category,
            image: i.image,
            quantity: Cartdata.quantity,
            final: Cartdata.final
    
    
    
    
          }).save().then(function(output)
          {
              console.log(output)
          }).catch(function(error)
          {
            console.error(error)
          })
      }

      else{

        await OrderModel.findOneAndUpdate({ id: Cartdata.id }, { $set: { quantity: Cartdata.quantity + 1 } });

        await OrderModel.findOneAndUpdate({ id:Cartdata.id }, { $set: { final: Cartdata.price * (Cartdata.quantity ) } });
          
      }

        
    })
})








App.delete('/delete/:id' , async function(req,res)
{
      const productid = req.params.id
    //   console.log(id)

      await CartModel.deleteOne({id:productid})



      await OrderModel.deleteOne({id:productid})

      const Cartdata = await CartModel.find();

      res.send(Cartdata);
})


App.patch('/update/:id'  ,async function(req,res)
{
        const ProductID = req.params.id

        const checktheproduct = await CartModel.findOne({ id:ProductID });

        console.log(checktheproduct)

        await CartModel.findOneAndUpdate({id:ProductID} , { $set: { quantity: checktheproduct.quantity + 1 } })

        await CartModel.findOneAndUpdate({ id: checktheproduct.id }, { $set: { final: checktheproduct.price * (checktheproduct.quantity + 1) } });

        const Cartdata = await CartModel.find();

        res.send(Cartdata);

        
})




App.patch('/decrease/:id' , async function(req,res)
{
    const ProductID = req.params.id

    const checktheproduct = await CartModel.findOne({ id:ProductID });

    console.log(checktheproduct)

    if(checktheproduct.quantity > 1)
    {
        await CartModel.findOneAndUpdate({id:ProductID} , { $set: { quantity: checktheproduct.quantity - 1 } })

        await CartModel.findOneAndUpdate({ id: checktheproduct.id }, { $set: { final: checktheproduct.price * (checktheproduct.quantity - 1) } });
    }

    const Cartdata = await CartModel.find();

    res.send(Cartdata);
})


App.get('/debit' , function(req,res)
{
    res.render("debit.ejs" , {Publish : Publishkey})
})




App.post('/address'  ,  async function(req,res)
{
    //   console.log(req.body)
      const ID = req.body.id
      const MyFirstname = req.body.firstname

      const MyLastname = req.body.lastname

      const MyAddress = req.body.address

      const Mycity = req.body.city 

      const Mystate = req.body.state 

      const MyZip = req.body.zip

     new Addressmodel({
          
        id : ID,
        Firstname : MyFirstname,

        Lastname : MyLastname,

        Address : MyAddress,

        City : Mycity,

        State : Mystate,

        Zip : MyZip

     }).save().then(function(output){

        return

     }).catch(function(error)
     {
        console.log(error)
     })




})



App.delete('/deladdress' ,async function(req,res)
{
     const Data = req.body

     const addressfromfront = Data.Address

     await Addressmodel.deleteOne({Address : addressfromfront})

     res.send("Successfully deleted")
})


App.get('/info'   , async function(req,res)
{   
 
  
        const address =  await Addressmodel.find()

        res.send(address)
   

})







App.post('/payment'  , async function(req,res)
{

    const Data = await OrderModel.find()

    

    

    
    
    
    Data.map(async function(i)
    {
        const Orderhistorydata = await OrderhistoryModel.findOne({id : i.id})
        
        const Ordersaveddata = await OrderSaveModel.findOne({id:i.id})

       

        if(!Orderhistorydata && !Ordersaveddata)
        {
            const MyID = i.id 

        const MyTitle = i.title 
    
        const Price = i.price 
    
        const Image = i.image


        const Description = i.description

        new OrderhistoryModel({

              id : MyID,

              title : MyTitle,

              price : Price,

              image : Image,

              description : Description
        }).save().then(async function(output)
        {
            
        }).catch(function(error)
        {
             console.error(error)
        })

        new OrderSaveModel({

            id : MyID,

            title : MyTitle,

            price : Price,

            image : Image,

            description : Description 
              
        }).save().then(async function(output)
        {

            await OrderModel.deleteOne({id:i.id})

        }).catch(function(error)
        {
             console.error(error)
        })






        }

        
        else{

              return
        }

    })



    Stripe.customers.create({

        email : req.body.stripeEmail,

        source : req.body.stripeToken,
        
        name : "Phani",

    }).then(function(output){

        // console.log(output)

        Stripe.paymentIntents.create({
             
            amount : 250000,

            description : "Samsung z45",

            currency : "INR",

            customer : output.id
        })
    }).then(function()
    {
        res.redirect("https://frontend-6lrd.onrender.com/success")
    }).catch(function()
    {
        res.send('<h3>Payment not successfull</h3>')
    })


    
    
})



App.get('/orders' ,async function(req,res)
{
   
        const data = await OrderModel.find()

        res.send(data)
})


App.get('/orderhistory' , async function(req,res)
{
       const data = await OrderhistoryModel.find()

       res.send(data)

       
})


App.get('/ordersave' , async function(req,res)
{
    const data = await OrderSaveModel.find()

    res.send(data)
})


App.delete('/reset' , async function(req,res)
{
     const Data = await OrderhistoryModel.find()

    //  console.log(Data)

     Data.map(async function(i)
     {
          await OrderSaveModel.deleteOne({id:i.id})
     })
})




App.listen(5000 , function()
{
    console.log("Port is running at 5000")
})
