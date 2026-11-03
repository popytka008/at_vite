// import css                from './index.module.scss'
import type {FormikProps} from 'formik'

export const Input = ({name, label, formik}: {
  name: string
  label: string,
  formik: FormikProps<any>
}) => {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name]
  // console.log(`touched input-component ${name}: ${touched}`)
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <br/>
      <input id={name} name={name} type="text"
             onChange={async (e) => {
               // setState({...state, [name]: e.target.value})
               await formik.setFieldValue(name, e.target.value)
             }}
             onBlur={async () => {
               await formik.setFieldTouched(name)
             }}
             value={value}
             disabled={formik.isSubmitting}
      />
      {!!touched && error && <div style={{color: 'red'}}>{error}</div>}
    </div>
  )
}
