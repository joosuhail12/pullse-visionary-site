import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

/**
 * Run detailed Lighthouse audits on specific pages
 * This generates full audit reports to identify exact failures
 */

interface AuditResult {
  id: string;
  title: string;
  description: string;
  score: number | null;
  scoreDisplayMode: string;
  displayValue?: string;
  details?: any;
}

async function runDetailedAudit(url: string, pageName: string) {
  const chromePath = puppeteer.executablePath();

  const chrome = await chromeLauncher.launch({
    chromePath,
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage'],
  });

  const options = {
    port: chrome.port,
    output: 'json' as const,
    onlyCategories: ['accessibility', 'seo'],
    formFactor: 'mobile' as const,
    screenEmulation: {
      mobile: true,
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      disabled: false,
    },
  };

  console.log(`\n🔍 Auditing ${pageName}: ${url}`);

  const runnerResult = await lighthouse(url, options);

  await chrome.kill();

  if (!runnerResult) {
    console.error(`❌ Failed to audit ${pageName}`);
    return;
  }

  const { lhr } = runnerResult;
  const accessibility = lhr.categories.accessibility;
  const seo = lhr.categories.seo;

  console.log(`\n📊 ${pageName} Scores:`);
  console.log(`   Accessibility: ${Math.round((accessibility?.score ?? 0) * 100)}%`);
  console.log(`   SEO: ${Math.round((seo?.score ?? 0) * 100)}%`);

  // Extract failing audits
  const failingAccessibilityAudits: AuditResult[] = [];
  const failingSEOAudits: AuditResult[] = [];

  // Get all accessibility audits
  if (accessibility?.auditRefs) {
    for (const auditRef of accessibility.auditRefs) {
      const audit = lhr.audits[auditRef.id];
      if (audit && (audit.score === null || audit.score < 1)) {
        failingAccessibilityAudits.push({
          id: audit.id,
          title: audit.title,
          description: audit.description,
          score: audit.score,
          scoreDisplayMode: audit.scoreDisplayMode,
          displayValue: audit.displayValue,
          details: audit.details,
        });
      }
    }
  }

  // Get all SEO audits
  if (seo?.auditRefs) {
    for (const auditRef of seo.auditRefs) {
      const audit = lhr.audits[auditRef.id];
      if (audit && (audit.score === null || audit.score < 1)) {
        failingSEOAudits.push({
          id: audit.id,
          title: audit.title,
          description: audit.description,
          score: audit.score,
          scoreDisplayMode: audit.scoreDisplayMode,
          displayValue: audit.displayValue,
          details: audit.details,
        });
      }
    }
  }

  console.log(`\n❌ Failing Accessibility Audits (${failingAccessibilityAudits.length}):`);
  failingAccessibilityAudits.forEach((audit) => {
    console.log(`   • [${audit.id}] ${audit.title}`);
    if (audit.displayValue) {
      console.log(`     ${audit.displayValue}`);
    }
  });

  if (failingSEOAudits.length > 0) {
    console.log(`\n❌ Failing SEO Audits (${failingSEOAudits.length}):`);
    failingSEOAudits.forEach((audit) => {
      console.log(`   • [${audit.id}] ${audit.title}`);
      if (audit.displayValue) {
        console.log(`     ${audit.displayValue}`);
      }
    });
  }

  // Save full report to file
  const reportPath = path.join(process.cwd(), 'docs', `lighthouse-${pageName}.json`);
  fs.writeFileSync(reportPath, JSON.stringify({
    url,
    pageName,
    timestamp: new Date().toISOString(),
    scores: {
      accessibility: Math.round((accessibility?.score ?? 0) * 100),
      seo: Math.round((seo?.score ?? 0) * 100),
    },
    failingAccessibilityAudits,
    failingSEOAudits,
  }, null, 2));

  console.log(`\n💾 Full report saved to: docs/lighthouse-${pageName}.json`);
}

async function main() {
  const baseUrl = process.env.LIGHTHOUSE_BASE_URL || 'http://localhost:3000';

  console.log('🚀 Starting detailed Lighthouse accessibility analysis...');
  console.log(`📍 Base URL: ${baseUrl}\n`);

  // Audit the worst performing pages
  const pages = [
    { url: `${baseUrl}`, name: 'homepage' },
    { url: `${baseUrl}/product/auto-qa`, name: 'product-auto-qa' },
    { url: `${baseUrl}/blog`, name: 'blog-listing' },
    { url: `${baseUrl}/pricing`, name: 'pricing' },
  ];

  for (const page of pages) {
    await runDetailedAudit(page.url, page.name);
  }

  console.log('\n✅ Analysis complete! Check docs/lighthouse-*.json for detailed reports.');
}

main().catch(console.error);
