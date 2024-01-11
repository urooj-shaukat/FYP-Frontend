# ProGrade - Automated Code Grader and Tester (Frontend)

## Overview

Welcome to the ProGrade frontend repository! This project is the frontend implementation of an automated code grader and tester designed for programming languages. ProGrade caters to two primary actors: teachers and students.

### Key Features

1. **Teacher Functionality:**
   - Upload assignments with three different scenarios:
     - Provide input and output of a programming question.
     - Provide a solution code with inputs (outputs are generated automatically).
     - Automatically generate input and output test cases by specifying the number of test cases, data type, start range, and end range.
   - View plagiarism reports for assignments without requiring third-party tools.

2. **Student Functionality:**
   - Upload assignments.
   - View quick feedback and results without requiring manual effort from teachers.
   - Compile programs using the integrated compiler in the system.

### Tech Stack

- React: A JavaScript library for building user interfaces.
- Vite: A fast development build tool that supports modern web technologies.
- Material-UI (MUI): React components for faster and easier web development.
- Firebase: Used for image storage and file storage.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/urooj-shaukat/prograde-frontend.git
   cd FYP-Frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Obtain your Firebase configuration (API Key, Auth Domain, Project ID, etc.).
   - Create a `.env` file at the root of the project and add your Firebase configuration:

     ```env
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   This will start the development server, and you can access the application at `http://localhost:5173`.

## Usage

1. Teachers can log in and upload assignments with various scenarios.
2. Students can log in, upload assignments, and view quick feedback and results.
3. Both teachers and students can leverage the integrated compiler for code compilation.

## Contributing

Feel free to contribute by submitting bug reports, feature requests, or pull requests. Your input is highly valued!
My whole working was at [ProGrade](https://github.com/prograde123) as it was a private project so all my commits can be viewed there

## Author

[urooj-shaukat,khansa-kiran]

If you have any questions or issues, please contact [prograde123@gmail.com].
