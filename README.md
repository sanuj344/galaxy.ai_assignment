# Weavy Workflow Builder Clone

A pixel-perfect clone of Weavy.ai workflow builder with LLM-only workflows, built with Next.js, React Flow, and Trigger.dev.

## 🚀 Features

- **Visual Workflow Builder**: Drag-and-drop interface powered by React Flow
- **6 Node Types**: Text, Upload Image, Upload Video, LLM, Crop Image, Extract Frame
- **DAG Validation**: Prevents cycles in workflow graphs
- **Parallel Execution**: Executes independent nodes concurrently
- **LLM Integration**: Google Gemini API for AI-powered nodes
- **Media Processing**: FFmpeg for image cropping and frame extraction
- **File Uploads**: Transloadit integration for image/video uploads
- **Authentication**: Clerk for secure user authentication
- **Workflow History**: Track execution history with node-level details
- **Export/Import**: Save and load workflows as JSON
- **Undo/Redo**: Full history management with keyboard shortcuts

## 🛠️ Tech Stack

- **Framework**: Next.js 16 App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Workflow Canvas**: React Flow
- **State Management**: Zustand
- **Database**: PostgreSQL + Prisma
- **Authentication**: Clerk
- **Background Jobs**: Trigger.dev
- **LLM**: Google Gemini API
- **File Uploads**: Transloadit
- **Icons**: Lucide React

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd galaxy.ai_assignment

# Install dependencies
npm install --legacy-peer-deps

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🔑 Environment Variables

See `.env.example` for required environment variables. You'll need:

- Clerk credentials for authentication
- PostgreSQL database URL
- Trigger.dev API key
- Google Gemini API key
- Transloadit credentials

## 📖 Usage

1. **Sign In**: Create an account or sign in with Clerk
2. **Add Nodes**: Click node type buttons in the left sidebar
3. **Connect Nodes**: Drag from output handles to input handles
4. **Configure**: Fill in node parameters (text, prompts, crop dimensions, etc.)
5. **Upload Files**: Click upload nodes to add images/videos
6. **Run Workflow**: Click the "Run" button to execute
7. **View History**: Check execution history in the right sidebar
8. **Export/Import**: Save workflows as JSON for later use

## 🎨 UI Features

- **Dot Grid Background**: Clean, professional canvas
- **Animated Edges**: Purple animated connections
- **Minimap**: Color-coded node overview
- **Collapsible Sidebars**: Maximize canvas space
- **Keyboard Shortcuts**:
  - `Ctrl+Z` / `Cmd+Z`: Undo
  - `Ctrl+Shift+Z` / `Ctrl+Y`: Redo
  - `Delete` / `Backspace`: Delete selected nodes

## 🏗️ Project Structure

```
/src
  /app
    /(auth)          # Sign in/up pages
    /(dashboard)     # Main dashboard
    /api             # API routes
  /components        # React components
  /nodes             # Custom node types
  /store             # Zustand state management
  /lib               # Utility functions
/prisma              # Database schema
/trigger             # Trigger.dev tasks
```

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

## 📝 License

MIT

## 🙏 Acknowledgments

- Inspired by Weavy.ai
- Built with modern web technologies
- Designed for scalability and performance
