pipeline {

    agent {
        label 'medical-agency-agent'
    }

    environment {
        PROJECT_DIR = '/home/ec2-user/Medical_Agency'
    }

    stages {

        stage('Update Code') {
            steps {
                sh '''
                    cd ${PROJECT_DIR}

                    git pull origin main
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                    cd ${PROJECT_DIR}

                    echo "Building Docker images..."

                    sudo docker compose build
                '''
            }
        }

        stage('Stop and Remove Old Containers') {
            steps {
                sh '''
                    cd ${PROJECT_DIR}

                    echo "Stopping and removing old containers..."

                    sudo docker compose down --remove-orphans
                '''
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                    cd ${PROJECT_DIR}

                    echo "Starting application..."

                    sudo docker compose up -d
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    cd ${PROJECT_DIR}

                    echo "Waiting for services..."
                    sleep 20

                    echo "Checking containers..."

                    sudo docker compose ps

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