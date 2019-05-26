import Link from 'next/link'
import Spinner from 'react-svg-spinner'

import ProjectCard from 'components/ProjectCard'

import Project from 'containers/Project'

const ProjectList = React.memo(({ list }) => {
  const { setSelectedProject } = Project.useContainer()
  let dynamicComponent

  if (list === undefined) {
    dynamicComponent = (
      <div className="w100 mt4 flex items-center justify-center">
        <Spinner height="128px" width="128px" />
      </div>
    )
  } else if (list.length === 0) {
    dynamicComponent = (
      <p className="f4 b tc gray">
        Your project list is empty. Maybe you should Create a New Project
      </p>
    )
  } else {
    dynamicComponent = (
      <div className="flex flex-wrap justify-around">
        {list.map(({ _id, ...rest }) => (
          <Link key={_id} prefetch href="/project-detail">
            <div onClick={() => setSelectedProject(_id)}>
              <ProjectCard id={_id} {...rest} />
            </div>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <>
      <h2 className="tc mt5 f2 b">Project List</h2>

      {dynamicComponent}
    </>
  )
})

export default ProjectList
