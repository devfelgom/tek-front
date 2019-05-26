import { object, string, number } from 'yup'

const validationSchema = object().shape({
  title: string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  projectManager: string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  client: string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  duration: number()
    .integer('Must be integer')
    .required('Required'),
  soldWork: number()
    .integer('Must be integer')
    .required('Required'),
  DevJr: number()
    .integer('Must be integer')
    .required('Required'),
  DevMid: number()
    .integer('Must be integer')
    .required('Required'),
  DevSr: number()
    .integer('Must be integer')
    .required('Required')
})

export default validationSchema
