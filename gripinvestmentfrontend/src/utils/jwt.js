// src/utils/jwt.js

export function jwtDecode(token) {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) throw new Error("Invalid JWT token");
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to decode JWT:", e);
    return null;
  }
}