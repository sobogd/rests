import PG from "pg";
import dotenv from "dotenv";

dotenv.config();

export default new PG.Pool({
  host: process.env.S3_HOST,
  user: process.env.S3_USER,
  password: process.env.S3_PASSWORD,
  database: process.env.S3_DATABASE,
  min: Number(process.env.S3_MIN),
  max: Number(process.env.S3_MAX),
  idleTimeoutMillis: Number(process.env.S3_IDLE_TIMEOUT),
  connectionTimeoutMillis: Number(process.env.S3_CONN_TIMEOUT),
});
