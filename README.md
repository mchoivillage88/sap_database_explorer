# Interactive SAP Database Explorer

An interactive web application for exploring SAP S/4HANA database tables, their relationships, and structure. This tool helps developers and analysts understand SAP ERP database schemas through an intuitive visual interface.

## Features

- **Browse SAP Tables**: Search and filter through key SAP S/4HANA database tables organized by category
- **Detailed Table Information**: View field definitions, data types, and descriptions
- **Visual ER Diagrams**: Interactive entity relationship diagrams showing table connections
- **Sample Data & Queries**: Example records and common SQL queries for each table
- **Business Context**: Understand how tables fit into SAP business processes
- **SAP Glossary**: Built-in glossary of SAP terminology and abbreviations
- **URL-Based Navigation**: Share direct links to specific tables
- **Smart Filtering**: Toggle between most important tables or view all tables

## Tech Stack

- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js 20+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mchoivillage88/sap_database_explorer.git
cd sap_database_explorer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3001`

### Building for Production

Build the application for production:
```bash
npm run build
```

The built files will be in the `build/` directory, ready to be deployed to any static hosting service.

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `build/` folder to [Netlify Drop](https://app.netlify.com/drop)

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### Deploy to GitHub Pages

1. Install the `gh-pages` package:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://mchoivillage88.github.io/sap_database_explorer",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

### Deploy to AWS S3 + CloudFront

1. Build the project:
```bash
npm run build
```

2. Upload to S3 bucket configured for static website hosting
3. Set up CloudFront distribution pointing to your S3 bucket
4. Configure CloudFront error pages to redirect 404s to `index.html` for client-side routing

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── TableList.tsx   # Table navigation sidebar
│   ├── TableDetails.tsx # Table detail view
│   ├── ERDiagram.tsx   # Entity relationship diagram
│   └── GlossaryModal.tsx # SAP glossary
├── data/               # SAP table data and configurations
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx            # Main application component
```

## Usage

1. **Browse Tables**: Use the left sidebar to browse tables by category
2. **Search**: Type in the search box to filter tables by name or description
3. **Filter**: Toggle "Show most important tables only" to focus on tier-1 tables
4. **View Details**: Click any table to see fields, relationships, and ER diagram
5. **Navigate Related Tables**: Click on related table names to jump to their details
6. **Access Glossary**: Click the "SAP Glossary" button in the header

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
