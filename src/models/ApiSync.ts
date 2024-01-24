interface Identity {
  id?: string;
}

export class ApiSync<T extends Identity> {
  constructor(private apiUrl: string = "http://localhost:3000") {}

  async fetch(id: string): Promise<Response> {
    const response = await fetch(`${this.apiUrl}/users/${id}`);

    return await response.json();
  }

  async save(data: T): Promise<void> {
    let response: Response;

    if (data.id) {
      response = await fetch(`${this.apiUrl}/users/${data.id}`, {
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
