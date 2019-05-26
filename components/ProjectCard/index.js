import { useState, useEffect } from 'react'
import ProjectHealth from 'components/ProjectHealth'

import handleError from 'utils/handleError'
import { projectService } from 'utils/services'

import HealthType from 'constants/healthType'

const ProjectCard = React.memo(({ id, client, projectManager, title }) => {
  const [projectHealth, setProjectHealth] = useState()

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await projectService.health(id)
        setProjectHealth(data)
      } catch (error) {
        handleError(error)
      }
    })()
  }, [])

  return (
    <div className="pointer ba br2 b--light-gray mw5 center bg-white pa3 mv3 flex flex-column items-center">
      {projectHealth && (
        <ProjectHealth
          color={projectHealth.color}
          description={projectHealth.description}
        />
      )}

      <div className="tc h3">
        <p className="f4 b">{title}</p>
        <hr className="mw4 center bb b--black-10" />
      </div>

      <p className="lh-copy mt3 h3 overflow-hidden measure center f6 black-50 tc">
        The Client is {client} and the Project Manager is {projectManager}
      </p>
    </div>
  )
})

export default ProjectCard
