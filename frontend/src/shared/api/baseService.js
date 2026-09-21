import httpClient from './httpClient';

/**
 * Base Service providing standardized CRUD operations
 */
export class BaseService {
  constructor(baseEndpoint) {
    this.baseEndpoint = baseEndpoint;
    this.http = httpClient;
  }

  /**
   * Fetch all records with optional query parameters
   */
  async getAll(params = {}) {
    return this.http.get(this.baseEndpoint, { params });
  }

  /**
   * Fetch a single record by ID
   */
  async getById(id, params = {}) {
    return this.http.get(`${this.baseEndpoint}/${id}`, { params });
  }

  /**
   * Create a new record
   */
  async create(data) {
    return this.http.post(this.baseEndpoint, data);
  }

  /**
   * Update an existing record completely (PUT)
   */
  async update(id, data) {
    return this.http.put(`${this.baseEndpoint}/${id}`, data);
  }

  /**
   * Partially update a record (PATCH)
   */
  async patch(id, data) {
    return this.http.patch(`${this.baseEndpoint}/${id}`, data);
  }

  /**
   * Delete a record by ID
   */
  async delete(id) {
    return this.http.delete(`${this.baseEndpoint}/${id}`);
  }
}

export default BaseService;
