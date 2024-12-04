# Versioning Workflow

This project demonstrates a versioning workflow using a Node.js backend, MongoDB, and a Next.js frontend. GitHub Actions is utilized to automate the versioning process by detecting branch-specific pushes (`dev` for patch increments, `deploy` for minor increments) and calling the backend API to update and fetch the latest version.

## Features

- **Versioning System**: Tracks `major`, `minor`, and `patch` versions.
- **MongoDB Integration**: Stores and retrieves version data persistently.
- **API Integration**: A Node.js backend exposes endpoints to update and fetch version information.
- **Frontend**: A Next.js frontend allows interaction with the versioning system.
- **GitHub Actions Workflow**: Automates version updates on branch-specific pushes.

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: Next.js, Axios
- **Automation**: GitHub Actions

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git installed on your machine

### Clone the Repository

```bash
git clone https://github.com/<your-username>/versioning-workflow.git
cd versioning-workflow

```
### Backend Setup
Navigate to the backend folder:
bash
Copy code
cd backend
Install dependencies:
bash
```bash
npm install
```
Start Nodejs locally or provide a MongoDB URI in backend/index.js:
javascript

```bash
const mongoURI = "mongodb://localhost:27017/versioning";
```
Run the backend:
```bash
node index.js
```
The backend runs on http://localhost:3001.

GitHub Actions Workflow
The repository includes a GitHub Actions workflow (.github/workflows/versioning.yml) to automate version updates:

On dev branch push: Increments the patch version.
On deploy branch push: Increments the minor version and resets the patch.
Workflow Trigger
Push changes to the dev or deploy branch:

```bash
git push origin dev  # Increment patch version
git push origin deploy  # Increment minor version
```
API Endpoints

POST /version
Request:
json
```bash
{
  "branch": "dev"
}

```
Response:
```bash
{
  "version": "1.0.1"
}
```
GET /version (Optional)
Response:
```bash
{
  "major": 1,
  "minor": 0,
  "patch": 1
}
```
Future Enhancements
Add authentication for the API.
Deploy backend and frontend to cloud services.
Implement version history tracking.





