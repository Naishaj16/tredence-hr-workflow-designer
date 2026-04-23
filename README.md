# HR Workflow Designer – Tredence Case Study

A recruiter-ready submission for the **Full Stack Engineering Intern (AI Agentic Platforms)** case study shared by Tredence. The brief asked for a mini HR Workflow Designer that lets an HR admin visually create, configure, and simulate workflows using **React + React Flow**. This project directly targets those requirements, including custom nodes, editable node forms, a mock API layer, and a workflow sandbox. Based on the uploaded brief and case-study requirements. fileciteturn0file0

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

### Design decisions
- Clear separation between canvas, node form, simulation, and API logic
- Strong typing for node data models
- Reusable key-value field array for extensible forms
- Validation logic separated into utility functions
- Local mock API kept independent from UI components
- Easy to add more node types in the future

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

## Submission note
This prototype was built to match the case study’s core evaluation criteria: React Flow proficiency, modular React architecture, dynamic form handling, mock API integration, scalability, and communication through a clear README. The original brief also emphasized architectural clarity over pixel-perfect UI, which guided the implementation choices here. fileciteturn0file0
