def version = ''
def project_name = 'devops-demo'

pipeline {
  agent { label 'jenkins-agent-ssh-nodejs' }
  stages {
      stage('Build') {
        steps {
          sh 'yarn install'
          echo "cleaning the target folder"
          dir ('target') {
            deleteDir()
          }
          script {
              version = sh (returnStdout:true, script: 'date +%d%m%Y_%H%M').trim()
              sh "echo '${version}' > version.txt"
          }
          sleep(time:2,unit:"SECONDS")
        }
      }
      stage('Browser Tests') {
        parallel {
          stage('Chrome') {
            steps {
                echo "running tests on google chrome"
                sleep(time:5,unit:"SECONDS")
            }
          }
          stage('Firefox') {
            steps {
                echo "running tests on firefox"
                sleep(time:10,unit:"SECONDS")
            }
          }
          stage('Safari') {
            steps {
                echo "running tests on Safari"
                sleep(time:7,unit:"SECONDS")
            }
          }
        }
      }
      stage('Package') {
        steps {
          echo 'packaging codecamp web application...'
          zip zipFile: "target/devops-demo-${version}.zip", archive: false, dir: ""
        }
      }
      stage('Release Artifact') {
        steps {
          echo 'releasing artifact'
          sleep(time:3,unit:"SECONDS")
        }
      }
      stage ('Deploy to AWS Cloud') {
        steps{
          sshPublisher(publishers: [sshPublisherDesc(configName: 'Thecodecamp', transfers: [sshTransfer(cleanRemote: true, excludes: '', execCommand: "/opt/bin/deploy-devopsdemo.tk.sh ${version}", execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/builds/target/devopsdemo', remoteDirectorySDF: false, removePrefix: '', sourceFiles: 'target/*.zip')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
        }
      }
  }
  post{
    success {
      echo "success"
    }
    failure {
      echo "failure"
    }
  }
}
