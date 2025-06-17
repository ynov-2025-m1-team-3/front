import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
    // Sentry.httpIntegration({
    //   failedRequestStatusCodes: [400, 500],
    // }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api\//, /^http:\/\/localhost:3000\/api\//],
  environment: import.meta.env.VITE_MODE || "development",
  
  // Amélioration du beforeSend pour plus de contexte
  beforeSend(event, hint) {
    console.log("Sentry event:", event);
    
    // Ajouter des tags personnalisés
    event.tags = {
      ...event.tags,
      component: event.extra?.component || "unknown",
      user_action: event.extra?.user_action || "unknown"
    };
    
    return event;
  },

  // Filtrer les erreurs non critiques
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "Non-Error promise rejection captured",
  ],
});