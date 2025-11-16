import { writeFileSync } from 'fs';
import { sapTables } from '../src/data/sap-tables-data.ts';

const baseUrl = 'https://mchoivillage88.github.io/sap_database_explorer';
const currentDate = new Date().toISOString().split('T')[0];

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
  sapTables.forEach(table => {
    sitemap += `  <!-- ${table.name} - ${table.description} -->
  <url>
    <loc>${baseUrl}/${encodeURIComponent(table.name)}</loc>
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
console.log(`✅ Sitemap generated with ${sapTables.length + 1} URLs`);
