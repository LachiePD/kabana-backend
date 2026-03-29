export const createPayload = (override = {}) => {
  const payload = {
    params: { domainId: 1, contextId: 2 },
    body: { name: "Lachlan" },
    query: { status: "open" },
    ...override,
  };
  return payload;
};
