export async function fetchWithToken(url, options = {}) {
  let token = window.accessToken; // access token in memory

  let res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    // Access token expired → try refresh token
    const refreshRes = await fetch("/api/refresh");
    if (refreshRes.ok) {
      const data = await refreshRes.json();
      window.accessToken = data.accessToken; // update token
      return fetchWithToken(url, options); // retry original request
    } else {
      throw new Error("Login expired. Please login again.");
    }
  }

  return res;
}
