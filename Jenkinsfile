pipeline {
  agent any   // Jenkins host

  // Make npm cache use a folder inside the workspace
  environment {
    NPM_CONFIG_CACHE = "${WORKSPACE}/.npm-cache"
  }

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
        sh '''
          mkdir -p "$NPM_CONFIG_CACHE"
          npm install
        '''
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
