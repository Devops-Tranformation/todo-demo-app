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
  }
}
