import { Formik } from 'formik'
import Link from 'next/link'
import Router from 'next/router'

import Button from 'components/Button'
import Field from 'components/Field'
import { toast } from 'react-toastify'

import initialValues from 'constants/signIn'

import handleError from 'utils/handleError'
import { authService } from 'utils/services'

import validationSchema from 'validations/signIn'

export default () => (
  <div className="flex items-center justify-center">
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        try {
          const { data } = await authService.signIn(values)
          localStorage.setItem('token', data.token)
          Router.push('/')
        } catch (error) {
          actions.setSubmitting(false)
          handleError(error)
        }
      }}
      render={({
        touched,
        errors,
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        isValid,
        isSubmitting
      }) => {
        const disabled = isSubmitting || !isValid

        return (
          <form className="w-100 w-50-m w-50-l" onSubmit={handleSubmit}>
            <Field
              className="mt4"
              error={touched.email && errors.email}
              label="Email"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
            />

            <Field
              error={touched.password && errors.password}
              label="Password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
            />

            <Button className="w-100 mt3" disabled={disabled}>
              Sign in
            </Button>

            <Link prefetch href="/sign-up">
              <p className="f6 tc mt3 gray pointer">
                Not registered yet?{' '}
                <span className="b">Click here to sign up</span>
              </p>
            </Link>
          </form>
        )
      }}
    />
  </div>
)
