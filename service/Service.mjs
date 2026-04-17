export class Service {
  constructor(repo, type) {
    this.repo = repo;
    this.type = type;
  }

  getAllByEntity() {
    return this.repo.getAllByEntity(this.type);
  }

  getByEntity(id) {
    return this.repo.getByEntity(this.type, id);
  }

  deleteEntity(id) {
    return this.repo.deleteEntity(this.type, id);
  }
}
