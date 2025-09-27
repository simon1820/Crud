const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

export const authService = {
  login: async (username: string, password: string) => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error("Credenciales inválidas");

    const data = await res.json();

    // Guardar token en localStorage
    localStorage.setItem("token", data.token);

    return data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },
};
