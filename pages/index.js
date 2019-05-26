import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { toast } from 'react-toastify'

import Button from 'components/Button'
import ProjectList from 'components/ProjectList'

import HealthType from 'constants/healthType'

import handleError from 'utils/handleError'
import { projectService } from 'utils/services'
import withProtection from 'utils/withProtection'

export default withProtection(() => {
  const [projectList, setProjectList] = useState()

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await projectService.list()
        setProjectList(data.docs)
      } catch (error) {
        handleError(error)
      }
    })()
  }, [])

  return (
    <>
      <h2 className="tc f1 b">Welcome back</h2>
      <h3 className="tc mb5 f3">Start estimating right now</h3>

      <Link prefetch href="/create-new-project">
        <Button>Create a New Project</Button>
      </Link>

      <ProjectList list={projectList} />
    </>
  )
})
