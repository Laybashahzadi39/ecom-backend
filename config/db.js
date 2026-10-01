import mongoose from "mongoose";
function Connectdb () {

  mongoose.connect('mongodb://127.0.0.1:27017/ecomdb')
    .then(() => console.log('MongoDB Connected Successfully!'))
    .catch((err) => console.log(err));
}
export default Connectdb