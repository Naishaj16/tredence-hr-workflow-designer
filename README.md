# HR Workflow Designer – Tredence Case Study

Hi! This is my submission for the **Full Stack Engineering Intern (AI Agentic Platforms)** case study at Tredence. 

I’ve built a mini HR Workflow Designer that helps HR admins visually create and test workflows. It’s built with **React and React Flow**, focusing on making the experience of building complex flows as intuitive as possible. Whether it's setting up a simple task or a multi-step approval process with automated actions, this tool handles the heavy lifting through custom nodes, dynamic forms, and a built-in simulation sandbox.

## What is implemented

### 1. Workflow Canvas
- React Flow canvas with multiple node types
- Start, Task, Approval, Automated, and End nodes
- Edge creation and deletion support through React Flow controls
- Node selection and editing
- Basic workflow validation rules

### 2. Node Configuration Panel
Each selected node opens a configurable side panel.

**Start Node**
- Start title
- Optional metadata key-value pairs

**Task Node**
- Title
- Description
- Assignee
- Due date
- Custom key-value fields

**Approval Node**
- Title
- Approver role
- Auto-approve threshold

**Automated Step Node**
- Title
- Action selection from a mock API list
- Dynamic action parameter fields

**End Node**
- End message
- Summary toggle

### 3. Mock API Layer
- `GET /automations` equivalent local mock
- `POST /simulate` equivalent local mock
- Async abstraction included in `src/services/mockApi.ts`

### 4. Workflow Test Sandbox
- Serializes current workflow graph
- Runs validation
- Returns step-by-step execution log
- Surfaces validation errors for missing flow integrity

## Tech Stack
- React
- TypeScript
- Vite
- React Flow
- Tailwind CSS

## Architecture Approach
The solution is intentionally structured for extensibility:

```bash
src/
├── components/
│   ├── canvas/
│   ├── forms/
│   ├── nodes/
│   ├── sidebar/
│   └── simulation/
├── hooks/
├── services/
├── types/
└── utils/
```

### My Design Decisions
- **Separation of Concerns**: I kept the canvas logic, form handling, and simulation engine separate. This made debugging a lot easier and makes the code much cleaner to read.
- **Strict Typing**: I used TypeScript throughout to ensure that node data models are consistent. It saved me from a lot of "undefined" headaches!
- **Extensible Forms**: The node configuration panel uses a reusable field array system. If we want to add more fields to a node later, it's just a one-line change.
- **Simulation First**: I prioritized the "Run Simulation" feature. It’s one thing to draw a graph, but seeing how it actually executes step-by-step is where the real value is for an admin.

## How to run

```bash
npm install
npm run dev
```

## Suggested demo flow
1. Start Node → Task Node → Approval Node → Automated Step → End Node
2. Select each node and configure its fields
3. Choose an automated action such as “Send Email” or “Generate Document”
4. Click **Run Simulation**
5. Show validation logs or successful execution steps

## What I prioritized
- Working functionality over pixel-perfect styling
- Clean, modular React architecture
- Dynamic and type-safe node forms
- Easy recruiter review and quick local setup

## What I would add with more time
- Undo / Redo
- Import / Export workflow JSON
- Better drag-and-drop sidebar experience
- Node-level validation indicators
- Auto-layout
- Persistent backend storage
- Playwright / Cypress tests

## A Note on the Submission
I really enjoyed working on this! It was a great exercise in balancing visual complexity with architectural simplicity. I focused on meeting the core requirements—React Flow proficiency, modular code, and dynamic form handling—while ensuring the app feels "ready to use." 

The original brief mentioned that architectural clarity is more important than pixel-perfect CSS, so I spent my time making sure the "engine" under the hood is solid and scalable. Thanks for checking it out!
