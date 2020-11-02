// import Vue from 'vue'
import { Auth } from 'aws-amplify'

export default async ({ redirect }) => {
  try {
    const user = await Auth.currentAuthenticatedUser()
    console.log(user)
  } catch (_) {
    redirect('/start')
  }
}
