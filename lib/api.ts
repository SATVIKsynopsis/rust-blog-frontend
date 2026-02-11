const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
}


export async function login(email: string, password: string) {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register(
  name: string,
  username: string,
  email: string,
  password: string,
  passwordConfirm: string
) {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      username,
      email,
      password,
      password_confirm: passwordConfirm,
    }),
  });
}

export async function getCurrentUser() {
  return apiFetch("/api/me", {
    method: "GET",
  });
}

export async function logout() {
  return apiFetch("/api/auth/logout", {
    method: "POST",
  });
}

export async function createPost(title: string, content: string) {
  return apiFetch("/api/posts/post", {
    method: "POST",
    body: JSON.stringify({ title, content }),
  });
}

export async function getPostById(postId: string) {
  return apiFetch(`/api/posts/post/${postId}`, {
    method: "GET",
  });
}

export async function getAllPosts(page = 1, limit = 10) {
  return apiFetch(`/api/posts/posts?page=${page}&limit=${limit}`, {
    method: "GET",
  });
}

export async function getMyPosts() {
  return apiFetch("/api/posts/my", {
    method: "GET",
  });
}

export async function updatePost(
  postId: string,
  title: string,
  content: string
) {
  return apiFetch(`/api/posts/post/${postId}`, {
    method: "PUT",
    body: JSON.stringify({ title, content }),
  });
}

export async function deletePost(postId: string) {
  return apiFetch(`/api/posts/post/${postId}`, {
    method: "DELETE",
  });
}
