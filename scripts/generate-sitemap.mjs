import { writeFileSync, readFileSync } from 'fs';

const baseUrl = 'https://mchoivillage88.github.io/sap_database_explorer';
const currentDate = new Date().toISOString().split('T')[0];

// Read the data file and extract table names
const dataFile = readFileSync('src/data/sap-tables-data.ts', 'utf-8');

// Extract table names - looking for main table objects (not field objects)
// Pattern: starts with 2 spaces, {, newline, 4 spaces, name: 'TABLENAME', newline, description:
const tableMatches = dataFile.match(/^\s{2}\{\s*\n\s{4}name:\s*'([^']+)',\s*\n\s{4}description:\s*'([^']+)',\s*\n\s{4}detailedDescription:/gm);
const tableNames = tableMatches ? tableMatches.map(match => {
  const nameMatch = match.match(/name:\s*'([^']+)'/);
  return nameMatch ? nameMatch[1] : null;
}).filter(Boolean) : [];

console.log(`Found ${tableNames.length} tables`);

const generateSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Home Page -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;

  // Add all table pages
  tableNames.forEach(tableName => {
    sitemap += `  <url>
    <loc>${baseUrl}/${encodeURIComponent(tableName)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;

  return sitemap;
};

const sitemap = generateSitemap();
writeFileSync('public/sitemap.xml', sitemap, 'utf-8');
console.log(`✅ Sitemap generated with ${tableNames.length + 1} URLs`);
console.log(`📝 Saved to public/sitemap.xml`);
