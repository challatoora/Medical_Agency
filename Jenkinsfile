pipeline {

    agent any

    stages {

        stage('Build') {
            steps {
                sh '''
                    echo "Building Docker images..."
                    docker compose build
                '''
            }
        }


        stage('Stop & cleaning') {
            steps {
                sh '''
                    echo "Stopping & cleaning old containers..."
                    docker compose down --remove-orphans
                    docker image prune -f
                '''
            }
        }


        stage('Deploy') {
            steps {
                sh '''
                    echo "Starting containers..."
                    docker compose up -d
                '''
            }
        }


        stage('Verify') {
            steps {
                sh '''
                    echo "Checking containers..."
                    docker compose ps

                    echo "Testing application..."
                    curl -f http://localhost:80
                '''
            }
        }

    }


    post {
        success {
            echo "Deployment Successful"
        }

        failure {
            echo "Deployment Failed"
        }
    }
}