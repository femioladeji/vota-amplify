// import Vue from 'vue'
import { Auth } from 'aws-amplify'

export default async ({ redirect }) => {
  try {
    await Auth.currentAuthenticatedUser()
  } catch (_) {
    redirect('/start')
  }
}
