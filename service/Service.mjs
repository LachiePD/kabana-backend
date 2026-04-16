class Service {
  constructor(repo) {
    this.repo = repo;
  }
  getAllByEntity(entityType) {}
  getByDomain(domainId) {}
  createByDomain(data, domain) {}
  deleteByDomain(domainId) {}
  updateByDomain(domainId, data) {}
  getByContext(contextId, domain) {}
}
