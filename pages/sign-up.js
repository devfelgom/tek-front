import { Formik } from 'formik'
import Link from 'next/link'
import Router from 'next/router'
import { toast } from 'react-toastify'

import Button from 'components/Button'
import Field from 'components/Field'

import initialValues from 'constants/signUp'

import handleError from 'utils/handleError'
import { authService } from 'utils/services'

import validationSchema from 'validations/signUp'

export default () => (
  <div className="flex items-center justify-center">
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        try {
          await authService.signUp(values)
          toast.success('Account successfully created! Now you can sign in')
          Router.push('/sign-in')
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
              error={touched.name && errors.name}
              label="Name"
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
            />

            <Field
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

            <Button className="w-100 mt3" disabled={disabled} type="submit">
              Sign up
            </Button>

            <Link prefetch href="/sign-in">
              <p className="f6 tc mt3 gray pointer">
                Already registered?{' '}
                <span className="b">Click here to sign in</span>
              </p>
            </Link>
          </form>
        )
      }}
    />
  </div>
)
