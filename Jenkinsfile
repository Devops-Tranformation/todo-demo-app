pipeline {
  agent any   // Host VM (Jenkins server)

  stages {

    stage('Checkout') {
      steps {
        echo "Cloning repository..."
        checkout scm
      }
    }

    stage('Install') {
      agent {
        docker { image 'node:16-alpine' }
      }
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      agent {
        docker { image 'node:16-alpine' }
      }
      steps {
        sh 'npm run build'
      }
    }

    stage('Test') {
      agent {
        docker { image 'node:16-alpine' }
      }
      steps {
        sh 'npm test'
      }
    }

    stage('Run') {
      agent {
        docker { image 'node:16-alpine' }
      }
      steps {
        echo "Starting the app..."
        sh 'node app.js'
      }
    }

    stage('Deploy') {
      steps {
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
