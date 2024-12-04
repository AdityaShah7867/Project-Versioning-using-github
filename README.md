Versioning Workflow
This project demonstrates a versioning workflow using a Node.js backend, MongoDB, and a Next.js frontend. GitHub Actions is utilized to automate the versioning process by detecting branch-specific pushes (dev for patch increments, deploy for minor increments) and calling the backend API to update and fetch the latest version.

Features
Versioning System: Tracks major, minor, and patch versions.
MongoDB Integration: Stores and retrieves version data persistently.
API Integration: A Node.js backend exposes endpoints to update and fetch version information.
Frontend: A Next.js frontend allows interaction with the versioning system.
GitHub Actions Workflow: Automates version updates on branch-specific pushes.
Tech Stack
Backend: Node.js, Express, MongoDB, Mongoose
Frontend: Next.js, Axios
Automation: GitHub Actions
Setup Instructions
Prerequisites
Node.js (v14 or higher)
MongoDB (local or cloud instance)
Git installed on your machine
Clone the Repository
bash
Copy code
git clone https://github.com/<your-username>/versioning-workflow.git
cd versioning-workflow
Backend Setup
Navigate to the backend folder:

bash
Copy code
cd backend
Install dependencies:

bash
Copy code
npm install
Start MongoDB locally or provide a MongoDB URI in backend/index.js:

javascript
Copy code
const mongoURI = "mongodb://localhost:27017/versioning";
Run the backend:

bash
Copy code
node index.js
The backend runs on http://localhost:3001.

Frontend Setup
Navigate to the frontend folder:

bash
Copy code
cd ../frontend
Install dependencies:

bash
Copy code
npm install
Run the frontend:

bash
Copy code
npm run dev
Access the frontend at http://localhost:3000.

GitHub Actions Workflow
The repository includes a GitHub Actions workflow (.github/workflows/versioning.yml) to automate version updates:

On dev branch push: Increments the patch version.
On deploy branch push: Increments the minor version and resets the patch.
Workflow Trigger
Push changes to the dev or deploy branch:

bash
Copy code
git push origin dev  # Increment patch version
git push origin deploy  # Increment minor version
API Endpoints
POST /version:

Request:
json
Copy code
{
  "branch": "dev"
}
Response:
json
Copy code
{
  "version": "1.0.1"
}
GET /version (Optional):

Response:
json
Copy code
{
  "major": 1,
  "minor": 0,
  "patch": 1
}
Future Enhancements
Add authentication for the API.
Deploy backend and frontend to cloud services.
Implement version history tracking.