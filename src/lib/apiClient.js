/**
 * Client API avec gestion automatique de l'authentification
 */

/**
 * Récupère le token JWT depuis localStorage
 */
function getAuthToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token"); // Utiliser la bonne clé
}

/**
 * Effectue une requête API avec authentification automatique
 * @param {string} url - URL de l'API
 * @param {object} options - Options fetch
 * @returns {Promise<Response>}
 */
export async function fetchWithAuth(url, options = {}) {
  const token = getAuthToken();
  
  const headers = {
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  return fetch(url, {
    ...options,
    headers,
  });
}

/**
 * Effectue une requête GET
 */
export async function apiGet(url) {
  return fetchWithAuth(url, {
    method: "GET",
  });
}

/**
 * Effectue une requête POST avec JSON
 */
export async function apiPost(url, data) {
  return fetchWithAuth(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

/**
 * Effectue une requête PUT avec JSON
 */
export async function apiPut(url, data) {
  return fetchWithAuth(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

/**
 * Effectue une requête DELETE
 */
export async function apiDelete(url) {
  return fetchWithAuth(url, {
    method: "DELETE",
  });
}
