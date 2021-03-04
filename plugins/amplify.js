import Vue from 'vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsExports from '~/aws-exports'

Amplify.configure({ ...awsExports, ssr: true })

Vue.use(AmplifyPlugin, AmplifyModules)
