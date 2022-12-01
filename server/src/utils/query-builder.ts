const mapFromDb = (rows: any[], props: { name: string; dbName: string }[]) =>
  rows.map((row) => {
    const object: any = {};

    Object.keys(row).forEach((key) => {
      const dbProp: any = props.find((p) => p.dbName === key);
      object[dbProp.name] = row[dbProp.dbName];
    });

    return object;
  });

const mapToDb = (payload: any, props: { name: string; dbName: string }[]) => {
  const object: any = {};

  Object.keys(payload).forEach((key) => {
    const prop: any = props.find((p) => p.name === key);
    object[prop.dbName] = payload[key];
  });

  return object;
};

const getKeysToCreate = (payload: any) => {
  return Object.keys(payload)
    .filter((key) => !!payload[key])
    .map((key) => key)
    .join(",");
};

const getWhereFilters = (payload: any) => {
  return Object.keys(payload)
    .filter((key) => !!payload[key])
    .map((key, index) => key + " = $" + (index + 1))
    .join(" AND ");
};

const getValues = (payload: any) => {
  return Object.keys(payload)
    .filter((key) => !!payload[key])
    .map((key) => payload[key]);
};

const getUpdateFields = (payload: any, startIndex: number) => {
  return Object.keys(payload)
    .filter((key) => !!payload[key])
    .map((key, index) => key + " = $" + (index + 1 + startIndex))
    .join(",");
};

const selectBySpec = async (client: any, tableName: string, payload: any) => {
  const whereFilters = getWhereFilters(payload);
  const values = getValues(payload);

  const { rows } = await client.query(`SELECT * from ${tableName} WHERE ${whereFilters}`, values);

  return rows;
};

const selectAll = async (client: any, tableName: string) => {
  const { rows } = await client.query(`SELECT * from ${tableName}`);

  return rows;
};

const insertOne = async (client: any, tableName: string, payload: any) => {
  const keys = getKeysToCreate(payload);
  const values = getValues(payload);
  const valuesExpression = values.map((_v, n) => `$${n + 1}`).join(",");

  const { rows } = await client.query(
    `INSERT INTO ${tableName} (${keys}) VALUES (${valuesExpression}) RETURNING *`,
    values
  );

  return rows;
};

const updateOneBySpec = async (client: any, tableName: string, payload: any, conditionsPayload: any) => {
  const whereFilters = getWhereFilters(conditionsPayload);
  const whereValues = getValues(conditionsPayload);
  const updateFields = getUpdateFields(payload, whereValues.length);
  const updateValues = getValues(payload);

  const { rows } = await client.query(
    `UPDATE ${tableName} SET ${updateFields} WHERE ${whereFilters} RETURNING *;`,
    [...whereValues, ...updateValues]
  );

  return rows;
};

const removeOneBySpec = async (client: any, tableName: string, payload: any) => {
  const whereFilters = getWhereFilters(payload);
  const values = getValues(payload);

  const { rows } = await client.query(`DELETE FROM ${tableName} WHERE ${whereFilters}  RETURNING *;`, values);

  return rows;
};

export default {
  selectAll,
  selectBySpec,
  insertOne,
  updateOneBySpec,
  removeOneBySpec,
  mapFromDb,
  mapToDb,
};
