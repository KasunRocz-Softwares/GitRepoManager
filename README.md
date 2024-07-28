# Git Branch App

## Overview

Git Branch App is a comprehensive API built using NestJS, TypeORM, and Swagger for managing Git repositories, projects, and users. The application supports operations such as listing branches, checking out branches, pulling changes from remote repositories, and executing SSH commands. This app is designed to help developers manage their Git workflows programmatically.

## Features

- **User Management**: Create and manage users with roles such as admin, QA, and developer.
- **Project Management**: Associate projects with users and manage project details.
- **Repository Management**: Manage Git repositories associated with projects.
- **Git Operations**: Perform Git operations like listing branches, checking out branches, and pulling updates.
- **SSH Commands**: Execute commands on remote servers via SSH.

## Developer

- **Name**: KasunRocz
- **Email**: kasunrocz.kl@gmail.com

## Setup and Installation

### Prerequisites

- Node.js (v14.x or higher)
- Yarn package manager
- A PostgreSQL database

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/KasunRocz-Softwares/GitRepoManager
   cd git-branch-app
   
2. Install dependencies:
    ```sh
    yarn install


3. Start the application:
   ```sh
   yarn start:dev


## API Documentation

The API documentation is available at http://localhost:3000/api once the application is running. It is powered by Swagger and provides detailed information about each endpoint, including example values for requests.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss improvements or bugs.



