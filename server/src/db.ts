import PG from "pg";

export default new PG.Pool({
  host: "rest-s.c1f3tolasjej.us-east-1.rds.amazonaws.com",
  user: "rests",
  password: "11021996.aS",
  database: "rests",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});
