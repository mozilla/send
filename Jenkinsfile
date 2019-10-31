pipeline {
    agent { 
        kubernetes {
            label 'sendpass-test'
            yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    component: builder
spec:
  containers:
  - name: sendpass-test
    image: node:10
    securityContext:
        runAsUser: 0
    command:
    - cat
    tty: true
"""
        }
    }
    triggers { 
        pollSCM('H/5 * * * *')
    }
    stages {
        stage('Build Test') {
            steps {
                notifyStarted()
                container (name: 'sendpass-test') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Run integration test') {
            steps {
                notifyStarted()
                container (name: 'sendpass-test') {
                    sh './scripts/bin/run-integration-test-circleci.sh'
                }
            }
        }
    }
    post {
        success {
            notifySuccess()
        }
        unstable {
            notifyUnstable()
        }
        failure {
            notifyFailed()
        }
  }
}

def notifyBuild(String buildStatus = 'RUNNING BUILD', String colorCode = '#5492f7', String notify = '') {
  def channel = "sysops-build-alerts"
  def base = "https://github.com/Factual/send/commits/"
  def commit = sh(returnStdout: true, script: 'git log -n 1 --format="%H"').trim()
  def link = "${base}${commit}"
  def shortCommit = commit.take(6)
  def title = sh(returnStdout: true, script: 'git log -n 1 --format="%s"').trim()
  def subject = "<${link}|${shortCommit}> ${title}"
  def summary = "${env.JOB_NAME} - (<${env.BUILD_URL}|#${env.BUILD_NUMBER}>): ${buildStatus} \n${subject} ${notify}"
  slackSend (channel: "#${channel}", color: colorCode, message: summary)
}

def author() {
    return sh(returnStdout: true, script: 'git log -n 1 --format="%an" | awk \'{print tolower($1);}\'').trim()
}

def notifyStarted() {
    wrap([$class: 'BuildUser']) {
    slackSend (channel: "#sysops-build-alerts", color: 'good', message: "${env.JOB_NAME} - (<${env.BUILD_URL}|#${env.BUILD_NUMBER}): Triggered by ${BUILD_USER} :github_parrot:")
    notifyBuild()
    }
}

def notifySuccess() {
    notifyBuild('SUCCESS :dealwithit_parrot:', 'good', "\nAuthor: @${author()} <${RUN_CHANGES_DISPLAY_URL}|Changelog>")
}

def notifyUnstable() {
    notifyBuild('UNSTABLE :slow_parrot:', 'warning', "\nAuthor: @${author()} <${RUN_CHANGES_DISPLAY_URL}|Changelog>")
}

def notifyFailed() {
    notifyBuild('FAILED :sad_parrot:', 'danger', "\nAuthor: @${author()} <${RUN_CHANGES_DISPLAY_URL}|Changelog>")
}
