import { useEffect, useState } from 'react'
import { Formik } from 'formik'
import Spinner from 'react-svg-spinner'
import { toast } from 'react-toastify'

import Button from 'components/Button'
import EstimationChart from 'components/EstimationChart'
import Field from 'components/Field'
import ProjectHealth from 'components/projectHealth'

import HealthType from 'constants/healthType'

import Project from 'containers/Project'

import handleError from 'utils/handleError'
import { projectService } from 'utils/services'
import withProtection from 'utils/withProtection'

import validationSchema from 'validations/projectDetail'

export default withProtection(() => {
  const { selectedProject } = Project.useContainer()
  const [projectData, setProjectData] = useState({
    DevJr: 0,
    DevMid: 0,
    DevSr: 0,
    spentHours: []
  })
  const [projectHealth, setProjectHealth] = useState()
  const [idealWorkPerWeek, setIdealWorkPerWeek] = useState()

  useEffect(() => {
    ;(async () => {
      try {
        const project = await projectService.detail(selectedProject)
        const health = await projectService.health(selectedProject)
        const ideal = await projectService.ideal({
          ...project.data,
          DevPl: project.data.DevMid,
          HorasVendidas: project.data.soldWork
        })
        setProjectData(project.data)
        setProjectHealth(health.data)
        setIdealWorkPerWeek(ideal.data / project.data.duration)
      } catch (error) {
        handleError(error)
      }
    })()
  }, [
    projectData.DevJr,
    projectData.DevMid,
    projectData.DevSr,
    projectData.spentHours
  ])

  return projectData && projectHealth ? (
    <>
      <div className="flex justify-between items-center">
        <h1 className="b f2">
          {projectData.title}{' '}
          {projectData.duration === projectData.spentHours.length && ' (done)'}
        </h1>

        <ProjectHealth
          color={projectHealth.color}
          description={projectHealth.description}
        />
      </div>

      <h2 className="b mb2 f3">Client</h2>
      <h3 className="f5 mb4">{projectData.client}</h3>

      <h2 className="b mb2 f3">Project Manager</h2>
      <h3 className="f5 mb4">{projectData.projectManager}</h3>

      <h2 className="b mb2 f3">Duration (in week)</h2>
      <h3 className="f5 mb4">{projectData.duration}</h3>

      <h2 className="b mb2 f3">Sold work (in hour)</h2>
      <h3 className="f5 mb4">{projectData.soldWork}</h3>

      <div className="flex items-center mb3">
        <h2 className="b mb2 f3">Activity log (per week)</h2>
        <Button
          disabled={projectData.duration === projectData.spentHours.length}
          onClick={async () => {
            const h = prompt(
              'How much work would you like to log for this week?'
            )

            if (parseFloat(h)) {
              try {
                const { data } = await projectService.update(selectedProject, {
                  spentHours: [...projectData.spentHours, parseFloat(h)]
                })

                toast.success('Work logged!')
                setProjectData(data)
              } catch (error) {
                handleError(error)
              }
            } else {
              alert('The value you entered is not a number. Please, try again')
            }
          }}
          className="br-pill"
        >
          +
        </Button>
      </div>

      <ol className="list pl0">
        {projectData.spentHours.map((v, i) => (
          <li className="f5 mb4" key={i}>
            <span className="b">Week {i + 1} - </span>
            {v}h
          </li>
        ))}
      </ol>

      <hr className="w-90 center bb b--black-20" />

      <div className="h5 flex items-center">
        {idealWorkPerWeek ? (
          <EstimationChart
            duration={projectData.duration}
            ideal={idealWorkPerWeek}
            spentHours={projectData.spentHours}
          />
        ) : null}
      </div>

      <hr className="w-90 center bb b--black-20" />

      <Formik
        initialValues={{
          DevJr: projectData.DevJr,
          DevSr: projectData.DevSr,
          DevMid: projectData.DevMid
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          try {
            const { data } = await projectService.update(
              selectedProject,
              values
            )

            toast.success('Team successfully updated!')
            setProjectData(data)
          } catch (error) {
            handleError(error)
          } finally {
            actions.setSubmitting(false)
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
          isSubmitting,
          pristine
        }) => {
          const disabled =
            pristine ||
            isSubmitting ||
            !isValid ||
            !(values.DevJr || values.DevMid || values.DevSr)

          return (
            <form onSubmit={handleSubmit}>
              <div className="mt4 flex justify-between">
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
                Confirm Update
              </Button>
            </form>
          )
        }}
      />
    </>
  ) : (
    <div className="w100 mt4 flex items-center justify-center">
      <Spinner height="128px" width="128px" />
    </div>
  )
})
