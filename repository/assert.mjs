export const assert = (entity) => {
  const validEntities = ["projects", "developers", "issues", "accounts"];
  if (!validEntities.includes(entity))
    throw new Error(`invalid entity :    ${entity}`);
};
