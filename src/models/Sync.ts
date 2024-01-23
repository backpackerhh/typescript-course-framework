export class Sync<T> {
  constructor(private apiUrl: string = "http://localhost:3000") {}

  async fetch(id: string): Promise<Response> {
    const response = await fetch(`${this.apiUrl}/users/${id}`);

    return await response.json();
  }

  async save(id: string, data: T): Promise<void> {
    let response: Response;

    if (id) {
      response = await fetch(`${this.apiUrl}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    } else {
      response = await fetch(`${this.apiUrl}/users`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    }

    await response.json();
  }
}
