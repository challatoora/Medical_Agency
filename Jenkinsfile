pipeline {

    agent any

    stages {

        stage('Build') {
            steps {
                dir('/home/ec2-user/Medical_Agency') {
                    sh '''
                        echo "Building Docker images..."
                        docker compose build
                    '''
                }
            }
        }


        stage('Stop') {
            steps {
                dir('/home/ec2-user/Medical_Agency') {
                    sh '''
                        echo "Stopping old containers..."
                        docker compose down
                    '''
                }
            }
        }


        stage('Deploy') {
            steps {
                dir('/home/ec2-user/Medical_Agency') {
                    sh '''
                        echo "Starting containers..."
                        docker compose up -d
                    '''
                }
            }
        }


        stage('Verify') {
            steps {
                dir('/home/ec2-user/Medical_Agency') {
                    sh '''
                        echo "Checking containers..."
                        docker compose ps

                        echo "Testing application..."
                        curl -f http://localhost:80
                    '''
                }
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