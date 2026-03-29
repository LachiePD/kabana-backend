export const assert = (dep) => {
  if (!dep.service) {
    throw new Error("missing service");
  }
  if (!dep.method) {
    throw new Error("missing method");
  }
  if (!dep.path) throw new Error("missing path");
  if (!dep.middleware) throw new Error("missing middleware");
};
