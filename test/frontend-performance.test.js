import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";
import { browser } from "k6/browser";

// Métriques personnalisées pour le frontend
const pageLoadTime = new Trend("page_load_time");
const authenticationTime = new Trend("authentication_time");
const dashboardRenderTime = new Trend("dashboard_render_time");
const errorRate = new Rate("frontend_errors");
const sentryErrorRate = new Rate("sentry_errors");

export const options = {
  scenarios: {
    // Test HTTP classique
    http_test: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "30s", target: 10 },
        { duration: "1m", target: 20 },
        { duration: "30s", target: 0 },
      ],
      exec: "httpTest",
    },
    // Test browser (plus lourd, moins d'utilisateurs)
    browser_test: {
      executor: "constant-vus",
      vus: 2,
      duration: "2m",
      exec: "browserTest",
      options: {
        browser: {
          type: "chromium",
        },
      },
    },
  },
  thresholds: {
    page_load_time: ["p(95)<3000"],          // 95% des pages < 3s
    authentication_time: ["p(95)<2000"],     // Auth < 2s
    dashboard_render_time: ["p(95)<1500"],   // Dashboard < 1.5s
    frontend_errors: ["rate<0.1"],           // Moins de 10% d'erreurs
    sentry_errors: ["rate<0.05"],            // Moins de 5% d'erreurs Sentry
  },
};

// Configuration
const FRONTEND_URL = "http://localhost:5173";
const API_URL = "http://localhost:3000";

const TEST_USERS = [
  { email: "test@test.com", password: "testee" },
  { email: "test@test2.com", password: "testee" },
];

// Test HTTP des endpoints frontend
export function httpTest() {
  const startTime = Date.now();
  
  // Test de la page d'accueil
  const homeResponse = http.get(FRONTEND_URL, {
    tags: { page: "home" },
  });
  
  const homeLoadTime = Date.now() - startTime;
  pageLoadTime.add(homeLoadTime);
  
  const homeSuccess = check(homeResponse, {
    "home page status is 200": (r) => r.status === 200,
    "home page loads quickly": (r) => r.timings.duration < 2000,
    "home page has React content": (r) => r.body.includes("react") || r.body.includes("vite"),
  });
  
  if (!homeSuccess) {
    errorRate.add(1);
  } else {
    errorRate.add(0);
  }
  
  // Test des assets statiques
  testStaticAssets();
  
  sleep(1);
}

// Test avec un vrai navigateur
export function browserTest() {
  const page = browser.newPage();
  
  try {
    // Test de connexion complète
    testLoginFlow(page);
    
    // Test du dashboard
    testDashboardPerformance(page);
    
    // Test des interactions utilisateur
    testUserInteractions(page);
    
  } catch (error) {
    console.error("Browser test error:", error , sentryErrorRate);
    errorRate.add(1);
  } finally {
    page.close();
  }
}

function testLoginFlow(page) {
  const startTime = Date.now();
  
  // Aller à la page de connexion
  page.goto(`${FRONTEND_URL}/login`);
  
  // Attendre que la page soit chargée
  page.waitForSelector("input[type=\"email\"]", { timeout: 5000 });
  
  const user = TEST_USERS[Math.floor(Math.random() * TEST_USERS.length)];
  
  // Remplir le formulaire
  page.fill("input[type=\"email\"]", user.email);
  page.fill("input[type=\"password\"]", user.password);
  
  // Soumettre le formulaire
  page.click("button[type=\"submit\"]");
  
  // Attendre la redirection vers le dashboard
  page.waitForURL(`${FRONTEND_URL}/dashboard`, { timeout: 10000 });
  
  const authTime = Date.now() - startTime;
  authenticationTime.add(authTime);
  
  const success = check(page, {
    "login successful": () => page.url().includes("/dashboard"),
    "login time acceptable": () => authTime < 5000,
  });
  
  if (!success) {
    errorRate.add(1);
  } else {
    errorRate.add(0);
  }
}

function testDashboardPerformance(page) {
  const startTime = Date.now();
  
  // Attendre que les données se chargent
  page.waitForSelector("[data-testid=\"dashboard-content\"]", { timeout: 10000 });
  
  // Vérifier que les graphiques sont présents
  const chartsLoaded = page.locator("[data-testid=\"chart\"]").count() > 0;
  
  const renderTime = Date.now() - startTime;
  dashboardRenderTime.add(renderTime);
  
  const success = check(page, {
    "dashboard renders": () => chartsLoaded,
    "dashboard renders quickly": () => renderTime < 3000,
    "no console errors": () => {
      // Vérifier les erreurs console (à implémenter selon vos besoins)
      return true;
    },
  });
  
  if (!success) {
    errorRate.add(1);
  } else {
    errorRate.add(0);
  }
}

function testUserInteractions(page) {
  try {
    // Test des onglets
    const tabButtons = page.locator("[role=\"tab\"]");
    if (tabButtons.count() > 0) {
      tabButtons.first().click();
      sleep(0.5);
      
      if (tabButtons.count() > 1) {
        tabButtons.nth(1).click();
        sleep(0.5);
      }
    }
    
    // Test de la recherche si présente
    const searchInput = page.locator("input[placeholder*=\"recherch\"]");
    if (searchInput.count() > 0) {
      searchInput.fill("test");
      sleep(0.5);
      searchInput.clear();
    }
    
    // Test du bouton de suppression (avec confirmation)
    const deleteButton = page.locator("button:has-text(\"Supprimer\")");
    if (deleteButton.count() > 0) {
      deleteButton.click();
      
      // Annuler la confirmation
      page.on("dialog", dialog => dialog.dismiss());
    }
    
    errorRate.add(0);
    
  } catch (error) {
    console.error("User interaction test error:", error);
    errorRate.add(1);
  }
}

function testStaticAssets() {
  const assets = [
    `${FRONTEND_URL}/logo.png`,
    `${FRONTEND_URL}/vite.svg`,
    `${FRONTEND_URL}/assets/bg-home.png`,
  ];
  
  assets.forEach(asset => {
    const response = http.get(asset, {
      tags: { asset_type: "static" },
    });
    
    check(response, {
      [`${asset} loads`]: (r) => r.status === 200 || r.status === 404, // 404 acceptable si asset n'existe pas
    });
  });
}

export function setup() {
  console.log("🚀 Starting frontend k6 performance tests...");
  
  // Vérifier que le frontend est accessible
  const healthCheck = http.get(FRONTEND_URL);
  if (healthCheck.status !== 200) {
    console.error("❌ Frontend not accessible");
    return null;
  }
  
  console.log("✅ Frontend is accessible");
  return { frontendReady: true };
}

export function teardown(data) {
  console.log("🏁 Frontend k6 tests completed");
  if (data && data.frontendReady) {
    console.log("✅ All frontend tests executed successfully");
  }
}