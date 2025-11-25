pipeline {
  //Run globally on Jenkins host VM
  agent any

  stages {
    stage('Checkout') {
      steps {
        echo "Cloning repository..."
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Run') {
      steps {
        echo "Starting the app..."
        sh 'node app.js'
      }
    }
    // This stage runs on the Jenkins host (no docker agent)
    stage('Deploy') {
      agent none  
      steps {
        script {
          sh '''
             docker stop todo || true
             docker rm todo || true
             docker build -t todo-app .
             docker run -d --name todo -p 3000:3000 todo-app
          '''
        }
      }
     }
  }
}   