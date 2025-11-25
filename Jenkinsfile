pipeline {
  agent {
    docker { image 'node:16-alpine' }
  }

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