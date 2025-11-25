pipeline {
  agent any

  environment {
    IMAGE = "todo-app"
    IMAGE_TAG = "${GIT_COMMIT.take(7)}"
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install & Build') {
      agent { docker { image 'node:16-alpine' } }
      steps {
        sh 'npm ci'
        sh 'npm run build'
      }
    }

    stage('Test') {
      agent { docker { image 'node:16-alpine' } }
      steps { sh 'npm test' }
    }

    stage('Docker Build & Deploy') {
      steps {
        sh '''
          set -e
          # ensure any host node process is stopped so docker can bind :3000
          pkill node || true

          # stop & remove old container if present
          docker stop todo || true
          docker rm todo || true

          # build and run a tagged image
          docker build -t ${IMAGE}:${IMAGE_TAG} .
          docker run -d --name todo -p 3000:3000 ${IMAGE}:${IMAGE_TAG}

          # show the new container in the build log
          docker ps --filter name=todo --format "table {{.ID}}\t{{.Image}}\t{{.Names}}\t{{.Ports}}"
        '''
      }
    }
  }

  post {
    success { echo "✅ Build & deploy successful: ${IMAGE}:${IMAGE_TAG}" }
    failure { echo "❌ Build failed — check console output" }
  }
}
