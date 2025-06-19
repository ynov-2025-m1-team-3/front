import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";
import { browser } from "k6/browser";

const sentryErrorRate = new Rate("sentry_errors_detected");
const consoleErrorRate = new Rate("console_errors");

export const options = {
  scenarios: {
    sentry_monitoring: {
      executor: "constant-vus",
      vus: 3,
      duration: "3m",
      options: {
        browser: {
          type: "chromium",
        },
      },
    },
  },
  thresholds: {
    sentry_errors_detected: ["rate<0.05"],
    console_errors: ["rate<0.1"],
  },
};

const FRONTEND_URL = "http://localhost:5173";

export default function() {
  const page = browser.newPage();
  
  try {
    // Intercepter les erreurs console
    const consoleErrors = [];
    const sentryEvents = [];
    
    page.on("console", msg => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
        console.log(`Console error: ${msg.text()}`);
      }
    });
    
    // Intercepter les requêtes Sentry
    page.on("request", request => {
      if (request.url().includes("sentry.io") || request.url().includes("sentry")) {
        sentryEvents.push({
          url: request.url(),
          method: request.method(),
          timestamp: Date.now()
        });
        console.log(`Sentry event: ${request.method()} ${request.url()}`);
      }
    });
    
    // Naviguer et tester différentes pages
    testPageForErrors(page, `${FRONTEND_URL}`, "home");
    testPageForErrors(page, `${FRONTEND_URL}/login`, "login");
    
    // Simuler des erreurs potentielles
    simulateErrorScenarios(page);
    
    // Vérifier les métriques
    const hasConsoleErrors = consoleErrors.length > 0;
    const hasSentryEvents = sentryEvents.length > 0;
    
    consoleErrorRate.add(hasConsoleErrors ? 1 : 0);
    sentryErrorRate.add(hasSentryEvents ? 1 : 0);
    
    if (hasConsoleErrors) {
      console.log(`❌ Found ${consoleErrors.length} console errors`);
    }
    
    if (hasSentryEvents) {
      console.log(`📊 Detected ${sentryEvents.length} Sentry events`);
    }
    
  } catch (error) {
    console.error("Sentry monitoring error:", error);
    sentryErrorRate.add(1);
  } finally {
    page.close();
  }
  
  sleep(2);
}

function testPageForErrors(page, url, pageName) {
  try {
    page.goto(url, { waitUntil: "networkidle" });
    
    // Attendre un peu pour que les erreurs potentielles se manifestent
    sleep(1);
    
    check(page, {
      [`${pageName} page loads without crashing`]: () => !page.isClosed(),
    });
    
  } catch (error) {
    console.error(`Error testing ${pageName} page:`, error);
  }
}

function simulateErrorScenarios(page) {
  try {
    // Simuler une action qui pourrait causer une erreur
    page.evaluate(() => {
      // Tenter d'accéder à une propriété undefined (erreur courante)
      try {
        window.testErrorScenario = window.someUndefinedProperty.someProperty;
      } catch (e) {
        // Cette erreur devrait être capturée par Sentry
        console.error("Simulated error:", e);
      }
    });
    
    sleep(1);
  } catch (error) {
    console.error("Error simulating error scenarios:", error);
    sentryErrorRate.add(1);
  }
}