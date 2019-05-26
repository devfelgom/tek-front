import { Formik } from 'formik'
import { toast } from 'react-toastify'
import Router from 'next/router'

import Button from 'components/Button'
import Field from 'components/Field'

import initialValues from 'constants/createNewProject'

import handleError from 'utils/handleError'
import { projectService } from 'utils/services'
import withProtection from 'utils/withProtection'

import validationSchema from 'validations/createNewProject'

export default withProtection(() => (
  <>
    <h1 className="b f2">New Project</h1>

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        try {
          await projectService.create(values)
          toast.success('Project created successfully!')
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
        const disabled =
          isSubmitting || !isValid || !values.duration || !values.soldWork
        !(values.DevJr || values.DevMid || values.DevSr)

        return (
          <form onSubmit={handleSubmit}>
            <Field
              error={touched.title && errors.title}
              label="Title"
              name="title"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
            />

            <Field
              error={touched.projectManager && errors.projectManager}
              label="Project Manager"
              name="projectManager"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.projectManager}
            />

            <Field
              error={touched.client && errors.client}
              label="Client"
              name="client"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.client}
            />

            <Field
              className="w-50 w-25-m w-25-l"
              error={touched.duration && errors.duration}
              label="Duration (in week)"
              name="duration"
              onBlur={handleBlur}
              onChange={handleChange}
              type="number"
              value={values.duration}
            />

            <Field
              className="w-50 w-25-m w-25-l"
              error={touched.soldWork && errors.soldWork}
              label="Sold work (in hour)"
              name="soldWork"
              onBlur={handleBlur}
              onChange={handleChange}
              type="number"
              value={values.soldWork}
            />

            <div className="flex justify-between">
              <Field
                className="w-25"
                error={touched.DevJr && errors.DevJr}
                label="Junior Dev Count"
                min="0"
                name="DevJr"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.DevJr}
              />

              <Field
                className="w-25"
                error={touched.DevMid && errors.DevMid}
                label="Mid Dev Count"
                min="0"
                name="DevMid"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.DevMid}
              />

              <Field
                className="w-25"
                error={touched.DevSr && errors.DevSr}
                label="Senior Dev Count"
                min="0"
                name="DevSr"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.DevSr}
              />
            </div>

            <hr className="w-90 center bb b--black-20" />

            <Button className="w5 mt4" disabled={disabled} type="submit">
              Create Project
            </Button>
          </form>
        )
      }}
    />
  </>
))
