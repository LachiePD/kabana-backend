const createSafeHydrator = (assert) => (payload) => {
  assert(payload);
  return {
    domainId: payload.params.domainId,
    contextId: payload.params.contextId,
    filter: payload.query,
    data: payload.body,
  };
};

const assert = (p) => {
  const types = {
    number: (v) => typeof v === "number" || v === undefined,
    object: (v) => (typeof v === "object" && v !== null) || v === undefined,
  };
  if (!types.number(p.params.domainId)) throw new Error("invalid domainId");
  if (!types.number(p.params.contextId)) throw new Error("invalid contextId");
  if (!types.object(p.body)) throw new Error("invalid body");
  if (!types.object(p.query)) throw new Error("invalid query");
};
//TODO doesnt really make sense to have a HOF here, unless I merge all the assertion functions into one file....could be a good idea, would actually remove a lot of code that way;
export const requestHydrator = createSafeHydrator(assert);
