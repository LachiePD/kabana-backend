import { expect, it, vi, beforeEach } from "vitest";
import { AccountRepository } from "#/repository/index.mjs";

let mockDb;
let repo;

beforeEach(() => {
  mockDb = {
    query: vi.fn(),
  };

  repo = new Repository(mockDb);
});

});

it("getAllByType runs SELECT * query for type", async () => {
  mockDb.query.mockResolvedValue({ rows: [] });

  await repo.getAllByType("accounts");

  expect(mockDb.query).toHaveBeenCalledWith('SELECT * FROM "accounts"');
});

it("getByEntity fetches record by id", async () => {
  mockDb.query.mockResolvedValue({ rows: [] });

  await repo.getByEntity("accounts", 42);

  expect(mockDb.query).toHaveBeenCalledWith(
    'SELECT * FROM "accounts" WHERE id = $1',
    [42],
  );
});

it("createByEntity builds insert query and passes values", async () => {
  mockDb.query.mockResolvedValue({ rows: [{ id: 1 }] });

  const data = {
    name: "Lachie",
    password: "example123",
  };

  await repo.createByEntity("accounts", data);

  expect(mockDb.query).toHaveBeenCalled();

  const [query, values] = mockDb.query.mock.calls[0];

  expect(query).toContain("INSERT INTO");
  expect(query).toContain('"accounts"');
  expect(values).toEqual(expect.any(Array));
});

it("deleteEntity deletes record by id", async () => {
  mockDb.query.mockResolvedValue({ rows: [] });

  await repo.deleteEntity("accounts", 7);

  expect(mockDb.query).toHaveBeenCalledWith(
    'DELETE FROM "accounts" WHERE id = $1',
    [7],
  );
});

it("updateByEntity builds update query with correct values order", async () => {
  mockDb.query.mockResolvedValue({ rows: [] });

  await repo.updateByEntity("accounts", 3, {
    name: "Lachie",
    password: "newpass123",
  });

  const [query, values] = mockDb.query.mock.calls[0];

  expect(query).toContain("UPDATE");
  expect(query).toContain("SET");
  expect(query).toContain("WHERE id");

  expect(values).toEqual(["Lachie", "newpass123", 3]);
});

it("updateByEntity appends id as last parameter", async () => {
  mockDb.query.mockResolvedValue({ rows: [] });

  await repo.updateByEntity("accounts", 99, {
    name: "Test",
  });

  const [, values] = mockDb.query.mock.calls[0];

  expect(values[values.length - 1]).toBe(99);
});
it("getByName returns object", async () => {
  mockDb.query.mockResolvedValue({
    rows: [{ id: 1, name: "Lachie" }],
  });
  const account = { name: "Lachie" };
  const response = await repo.getByName("accounts", account.name);
  expect(response).toHaveProperties("id", "name");
  expect(mockDb.query).toHaveBeenCalledWith(
    "SELECT * from accounts where name = $1",
    ["Lachie"],
  );
});
