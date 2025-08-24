import mongoose from "mongoose"

const connectDB = async function(dburl) {
  await mongoose.connect(dburl)
}
export default connectDB