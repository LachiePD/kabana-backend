import { buildInsertQuery } from "#/repository/mjs.js";

describe("buildInsertQuery", () => {
  it("builds correct INSERT query with multiple fields", () => {
    const entity = "projects";
    const data = {
      name: "Test Project",
      status: "active",
    };

    const result = buildInsertQuery(entity, data);

    expect(result.values).toEqual(["Test Project", "active"]);

    expect(result.query).toContain('INSERT INTO "projects"');
    expect(result.query).toContain('("name", "status")');
    expect(result.query).toContain("VALUES ($1, $2)");
    expect(result.query).toContain("RETURNING *");
  });

  it("keeps values in correct order", () => {
    const result = buildInsertQuery("projects", {
      a: 1,
      b: 2,
      c: 3,
    });

    expect(result.values).toEqual([1, 2, 3]);
    expect(result.query).toContain("VALUES ($1, $2, $3)");
  });
});
