export const buildInsertQuery = (entity, data) => {
  const columns = buildColumns(data);
  const values = extractValues(data);
  const placeholders = buildPlaceholders(values);

  return {
    query: `
      INSERT INTO "${entity}" (${columns})
      VALUES (${placeholders})
      RETURNING *;
    `,
    values,
  };
};

const buildColumns = (data) => {
  return Object.keys(data)
    .map((col) => `"${col}"`)
    .join(", ");
};

const extractValues = (data) => {
  return Object.values(data);
};

const buildPlaceholders = (values) => {
  return values.map((_, i) => `$${i + 1}`).join(", ");
};
