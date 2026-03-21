type UserInfo = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export const authService = {
  async signup(data: { name: string; email: string; password: string }): Promise<void> {
    const res = await fetch('/api/auth/email_signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create user');
  },

  async getUser(id: string): Promise<UserInfo> {
    const res = await fetch(`/api/auth/user/${id}`);
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  },

  async updateUser(id: string, data: Partial<UserInfo>): Promise<UserInfo> {
    const res = await fetch(`/api/auth/user/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return res.json();
  },
};
