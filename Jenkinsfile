pipeline {

    agent any

    stages {

        stage('Checkout Code') {
            steps {
                echo 'Checking out latest code from GitHub...'
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                    echo "Building Docker images..."

                    docker compose build
                '''
            }
        }

        stage('Stop and Remove Old Containers') {
            steps {
                sh '''
                    echo "Stopping and removing old containers..."

                    docker compose down --remove-orphans
                '''
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                    echo "Starting application..."

                    docker compose up -d
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    echo "Waiting for services..."
                    sleep 20

                    echo "Checking containers..."

                    docker compose ps

                    echo "Testing frontend..."

                    curl -f http://localhost:80

                    echo ""
                    echo "Deployment successful!"
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }

        failure {
            echo 'Deployment Failed!'
        }
    }
}
