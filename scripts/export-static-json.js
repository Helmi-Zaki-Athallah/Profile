import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { personalInfo, experiences, projectCaseStudies, skillsCategories, certificates } from '../src/data/portfolioData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const output = {
  personalInfo,
  experiences,
  projectCaseStudies,
  skillsCategories,
  certificates,
  generatedAt: new Date().toISOString()
};

const outputDir = path.resolve(__dirname, '../public/data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'portfolio.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');

console.log(`✅ Static JSON exported successfully to: ${outputPath}`);
