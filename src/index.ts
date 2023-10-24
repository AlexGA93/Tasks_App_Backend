import { connectMongo } from "./db/config.db";
import app from "./app";

const port: string | number = process.env.PORT || 5000;

connectMongo();

app.listen(port, () => console.log(`Server running at port: ${port}`));