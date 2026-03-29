export const assert = (entity) => {
  const validEntities = ["project", "developer", "issue", "account"];
  if (!validEntities.includes(entity)) throw new Error("invalid entity");
};
