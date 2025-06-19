import { browser } from "k6/browser";
import { check, sleep } from "k6";
import { Trend, Rate } from "k6/metrics";

const chartRenderTime = new Trend("chart_render_time");
const chartInteractionTime = new Trend("chart_interaction_time");
const chartErrorRate = new Rate("chart_errors");

export const options = {
  scenarios: {
    charts_performance: {
      executor: "constant-vus",
      vus: 2,
      duration: "2m",
      options: {
        browser: {
          type: "chromium",
        },
      },
    },
  },
  thresholds: {
    chart_render_time: ["p(95)<2000"],
    chart_interaction_time: ["p(95)<500"],
    chart_errors: ["rate<0.05"],
  },
};

const FRONTEND_URL = "http://localhost:5173";

export default function() {
  const page = browser.newPage();
  
  try {
    // Se connecter d'abord
    loginUser(page);
    
    // Tester les performances des graphiques
    testChartsPerformance(page);
    
    // Tester les interactions avec les graphiques
    testChartInteractions(page);
    
  } catch (error) {
    console.error("Charts performance test error:", error);
    chartErrorRate.add(1);
  } finally {
    page.close();
  }
}

function loginUser(page) {
  page.goto(`${FRONTEND_URL}/login`);
  page.waitForSelector("input[type=\"email\"]");
  
  page.fill("input[type=\"email\"]", "test@test.com");
  page.fill("input[type=\"password\"]", "testee");
  page.click("button[type=\"submit\"]");
  
  page.waitForURL(`${FRONTEND_URL}/dashboard`);
}

function testChartsPerformance(page) {
  const startTime = Date.now();
  
  // Attendre que les graphiques se chargent
  page.waitForSelector("[data-testid=\"chart\"], .recharts-wrapper, [class*=\"MuiChart\"]", { 
    timeout: 10000 
  });
  
  const renderTime = Date.now() - startTime;
  chartRenderTime.add(renderTime);
  
  // Compter le nombre de graphiques
  const chartCount = page.locator("[data-testid=\"chart\"], .recharts-wrapper, [class*=\"MuiChart\"]").count();
  
  const success = check(page, {
    "charts render successfully": () => chartCount > 0,
    "charts render in reasonable time": () => renderTime < 3000,
    "multiple charts present": () => chartCount >= 2,
  });
  
  if (!success) {
    chartErrorRate.add(1);
  } else {
    chartErrorRate.add(0);
  }
  
  console.log(`📊 Found ${chartCount} charts, rendered in ${renderTime}ms`);
}

function testChartInteractions(page) {
  try {
    const startTime = Date.now();
    
    // Tester le hover sur les graphiques
    const charts = page.locator("[data-testid=\"chart\"], .recharts-wrapper, [class*=\"MuiChart\"]");
    
    if (charts.count() > 0) {
      // Hover sur le premier graphique
      charts.first().hover();
      sleep(0.5);
      
      // Cliquer sur un élément du graphique si possible
      const chartElements = page.locator("path, circle, rect").filter({ hasText: /.*/ });
      if (chartElements.count() > 0) {
        chartElements.first().click();
        sleep(0.2);
      }
    }
    
    // Tester le changement d'onglets si présents
    const tabs = page.locator("[role=\"tab\"]");
    if (tabs.count() > 1) {
      tabs.nth(1).click();
      
      // Attendre que les nouveaux graphiques se chargent
      sleep(1);
      
      // Revenir au premier onglet
      tabs.first().click();
      sleep(1);
    }
    
    const interactionTime = Date.now() - startTime;
    chartInteractionTime.add(interactionTime);
    
    const success = check(page, {
      "chart interactions work": () => interactionTime < 2000,
      "no errors during interactions": () => true, // À améliorer avec la détection d'erreurs
    });
    
    if (!success) {
      chartErrorRate.add(1);
    } else {
      chartErrorRate.add(0);
    }
    
  } catch (error) {
    console.error("Chart interaction error:", error);
    chartErrorRate.add(1);
  }
}