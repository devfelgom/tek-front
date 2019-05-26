import { object, string } from 'yup'

const validationSchema = object().shape({
  name: string()
    .min(2, 'Too short')
    .required('Required'),
  email: string()
    .email('Invalid format')
    .required('Required'),
  password: string()
    .min(6, 'Too short')
    .required('Required')
})

export default validationSchema
