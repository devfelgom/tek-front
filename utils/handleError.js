import Router from 'next/router'
import { toast } from 'react-toastify'

const handleError = error => {
  console.error(error)
  const isUnauthorized =
    error && error.response && error.response.status === 401

  if (isUnauthorized) {
    toast.error('Your session expired. Please, sign in again', {
      position: toast.POSITION.TOP_RIGHT
    })

    Router.push('/sign-in')
  } else {
    toast.error('Oops! Something went wrong. Please, try again', {
      position: toast.POSITION.TOP_RIGHT
    })
  }
}

export default handleError
