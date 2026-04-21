// Messages d'erreur et de succès centralisés pour cohérence

export const ERROR_MESSAGES = {
  // Auth
  UNAUTHORIZED: "Non autorisé.",
  
  // Projects
  PROJECT_NOT_FOUND: "Projet introuvable.",
  PROJECT_FETCH_ERROR: "Impossible de récupérer le projet.",
  PROJECTS_FETCH_ERROR: "Impossible de récupérer les projets.",
  PROJECT_CREATE_ERROR: "Impossible de créer le projet.",
  PROJECT_UPDATE_ERROR: "Impossible de modifier le projet.",
  PROJECT_DELETE_ERROR: "Impossible de supprimer le projet.",
  PROJECT_TITLE_REQUIRED: "Le titre et la description sont obligatoires.",
  
  // Testimonials
  TESTIMONIAL_NOT_FOUND: "Témoignage introuvable.",
  TESTIMONIAL_FETCH_ERROR: "Impossible de récupérer le témoignage.",
  TESTIMONIALS_FETCH_ERROR: "Impossible de récupérer les témoignages.",
  TESTIMONIAL_CREATE_ERROR: "Impossible de créer le témoignage.",
  TESTIMONIAL_UPDATE_ERROR: "Impossible de modifier le témoignage.",
  TESTIMONIAL_DELETE_ERROR: "Impossible de supprimer le témoignage.",
  TESTIMONIAL_STATUS_UPDATE_ERROR: "Impossible de modifier le statut.",
  TESTIMONIAL_CONTENT_REQUIRED: "Le contenu du témoignage est obligatoire.",
  TESTIMONIAL_PROJECT_REQUIRED: "Le projet est obligatoire.",
  TESTIMONIAL_MIN_LENGTH: "Le témoignage doit contenir au moins 20 caractères.",
  TESTIMONIAL_MAX_LENGTH: "Le témoignage ne peut pas dépasser 500 caractères.",
  TESTIMONIAL_STATUS_INVALID: "Statut invalide. Doit être: pending, approved ou rejected.",
  
  // Upload
  UPLOAD_ERROR: "Erreur lors de l'upload.",
  UPLOAD_NO_FILE: "Aucun fichier fourni.",
  UPLOAD_INVALID_TYPE: "Type de fichier non autorisé. Utilisez JPG, PNG, WebP ou GIF.",
  UPLOAD_FILE_TOO_LARGE: "Fichier trop volumineux. Maximum 5MB.",
  
  // Contact
  CONTACT_FETCH_ERROR: "Impossible de récupérer les messages.",
  CONTACT_SEND_ERROR: "Impossible d'envoyer le message.",
  
  // Generic
  INVALID_ID: "ID invalide.",
  LOADING_ERROR: "Erreur lors du chargement.",
  NETWORK_ERROR: "Erreur réseau.",
  UNKNOWN_ERROR: "Erreur inconnue.",
};

export const SUCCESS_MESSAGES = {
  // Projects
  PROJECT_CREATED: "Projet créé avec succès.",
  PROJECT_UPDATED: "Projet modifié avec succès.",
  PROJECT_DELETED: "Projet supprimé avec succès.",
  
  // Testimonials
  TESTIMONIAL_CREATED: "Témoignage envoyé avec succès.",
  TESTIMONIAL_UPDATED: "Témoignage modifié avec succès.",
  TESTIMONIAL_DELETED: "Témoignage supprimé avec succès.",
  TESTIMONIAL_APPROVED: "Témoignage approuvé.",
  TESTIMONIAL_REJECTED: "Témoignage rejeté.",
  
  // Upload
  UPLOAD_SUCCESS: "Fichier uploadé avec succès.",
  
  // Contact
  CONTACT_SENT: "Message envoyé avec succès.",
};

export const INFO_MESSAGES = {
  TESTIMONIAL_PENDING: "Votre témoignage est en attente de validation. Il sera visible une fois approuvé.",
  LOGIN_REQUIRED: "Vous devez être connecté pour effectuer cette action.",
  ADMIN_REQUIRED: "Cette action nécessite des droits administrateur.",
};
