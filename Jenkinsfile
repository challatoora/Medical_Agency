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


        stage('Stop') {
            steps {
                sh '''
                    echo "Stopping old containers..."
                    docker compose down
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