import { useState } from 'react'
import { createContainer } from 'unstated-next'

const useContainer = () => {
  const [selectedProject, setSelectedProject] = useState()

  return { selectedProject, setSelectedProject }
}

const Project = createContainer(useContainer)

export default Project
