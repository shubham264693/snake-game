pipeline { //pipeline as code - Jenkinsfile
    agent{
        label "ec2"
    }

    stages { //collection of your jobs
        stage('Download the source code') { //stage ~=job
            steps {
               git branch: 'master', url: 'https://github.com/shubham264693/snake-game.git'
               echo "code downloaded succesfully"
            }
        }
        stage('Test'){
            steps{
                sh 'yum install nodejs -y'
                sh 'node -v'
                sh 'npm -v'
                echo "Code have been tested succesfully!"
            }
        }
        stage("Build Docker Image"){
            steps{
                sh "docker build -t snakeWebimg ."
            }
        }
        stage("Deployment"){
            steps{
                sh "docker rm -f webos"
                sh "docker run -dit --name webos -p 5000:3000 snakeWebimg"
            }
        }
    }
}