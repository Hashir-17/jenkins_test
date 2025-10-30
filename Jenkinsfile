pipeline {
    agent any  // Run on any available agent

    environment {
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR = 'backend'
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Checkout the latest code from the GitHub repository
                git 'https://github.com/Hashir-17/jenkins_test.git'
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    // Navigate to the frontend directory
                    dir(FRONTEND_DIR) {
                        // Install dependencies and run the frontend
                        sh 'npm install'
                        sh 'npm start &'
                    }
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    // Navigate to the backend directory
                    dir(BACKEND_DIR) {
                        // Install dependencies and start the backend server
                        sh 'npm install'
                        sh 'node server.js &'
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed. Please check the logs.'
        }
    }
}
