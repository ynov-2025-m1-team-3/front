import * as Sentry from "@sentry/react";

export const SentryLogger = {
  // Log d'erreur avec contexte
  logError(error, context = {}) {
    Sentry.withScope((scope) => {
      // Ajouter des données contextuelles
      Object.keys(context).forEach(key => {
        scope.setExtra(key, context[key]);
      });
      
      scope.setTag("log_type", "error");
      Sentry.captureException(error);
    });
  },

  // Log d'information
  logInfo(message, data = {}) {
    Sentry.withScope((scope) => {
      Object.keys(data).forEach(key => {
        scope.setExtra(key, data[key]);
      });
      
      scope.setTag("log_type", "info");
      scope.setLevel("info");
      Sentry.captureMessage(message, "info");
    });
  },

  // Log d'avertissement
  logWarning(message, data = {}) {
    Sentry.withScope((scope) => {
      Object.keys(data).forEach(key => {
        scope.setExtra(key, data[key]);
      });
      
      scope.setTag("log_type", "warning");
      scope.setLevel("warning");
      Sentry.captureMessage(message, "warning");
    });
  },

  // Log d'action utilisateur
  logUserAction(action, component, data = {}) {
    Sentry.withScope((scope) => {
      scope.setTag("log_type", "user_action");
      scope.setTag("component", component);
      scope.setExtra("action", action);
      
      Object.keys(data).forEach(key => {
        scope.setExtra(key, data[key]);
      });
      
      Sentry.captureMessage(`User action: ${action} in ${component}`, "info");
    });
  },

  logApiError(endpoint, error, requestData = {}) {
    Sentry.withScope((scope) => {
      scope.setTag("log_type", "api_error");
      scope.setTag("service", "frontend");
      scope.setTag("endpoint", endpoint);
      scope.setTag("api_integration", "frontend_to_backend");
      
      scope.setExtra("request_data", requestData);
      scope.setExtra("error_details", {
        message: error.message,
        status: error.status || "unknown",
        response: error.response?.data || "no response data"
      });
      
      // Ajouter des breadcrumbs pour tracer les appels API
      Sentry.addBreadcrumb({
        category: "api",
        message: `API call to ${endpoint}`,
        level: "info",
        data: {
          endpoint,
          method: requestData.method || "GET",
          status: error.status
        }
      });
      
      Sentry.captureException(error);
    });
  },
  
  // Nouvelle méthode pour tracer les appels API réussis
  logApiSuccess(endpoint, responseData = {}, duration = 0) {
    Sentry.withScope((scope) => {
      scope.setTag("log_type", "api_success");
      scope.setTag("service", "frontend");
      scope.setTag("endpoint", endpoint);
      
      scope.setExtra("response_summary", {
        data_length: Array.isArray(responseData) ? responseData.length : "single_object",
        duration_ms: duration
      });
      
      Sentry.addBreadcrumb({
        category: "api",
        message: `Successful API call to ${endpoint}`,
        level: "info",
        data: {
          endpoint,
          duration_ms: duration,
          data_type: typeof responseData
        }
      });
      
      if (duration > 2000) {
        Sentry.captureMessage(`Slow API response: ${endpoint} took ${duration}ms`, "warning");
      }
    });
  }
};