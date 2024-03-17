const worker = require('worker_threads')

const CartInfo = async function Cart()
{

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

            return Cartdata
        }
    }
}

worker.parentPort.postMessage(CartInfo)