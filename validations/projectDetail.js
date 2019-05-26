import { object, number } from 'yup'

const validationSchema = object().shape({
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
