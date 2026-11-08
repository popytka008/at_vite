// import type {FormikProps} from 'formik'
// //import css                from './index.module.scss'
//
// export const Textarea = ({name, label, formik}: {
//   name: string
//   label: string,
//   formik: FormikProps<any>
// }) => {
//   const value = formik.values[name]
//   const error = formik.errors[name] as string | undefined
//   const touched = formik.touched[name]
//   // console.log(`touched textarea-component ${name}: ${touched}`)
//   return (
//     <div>
//       <label htmlFor={name}>{label}</label>
//       <br/>
//       <textarea id={name} name={name}
//                 onChange={async (e) => {
//                   // setState({...state, [name]: e.target.value})
//                   await formik.setFieldValue(name, e.target.value)
//                 }}
//                 onBlur={async () => {
//                   await formik.setFieldTouched(name)
//                 }}
//                 value={value}
//                 disabled={formik.isSubmitting}
//       />
//       {!!touched && !!error && <div style={{color: 'red'}}>{error}</div>}
//     </div>
//   )
// }

import type {FormikProps} from 'formik'
import css from './index.module.scss'
import cn  from 'classnames'

export const Textarea = ({name, label, formik, maxWidth}: {
  name: string
  label: string
  formik: FormikProps<any>
  maxWidth?: number
}) => {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name]
  const disabled = formik.isSubmitting
  const invalid = !!touched && !!error
  // console.log(`touched input-component ${name}: ${touched}`)
  return (
    <div className={cn({[css.field]: true, [css.disabled]: disabled})}>
      <label className={css.label} htmlFor={name}>{label}</label>
      <textarea id={name} name={name}
                onChange={async (e) => {
                  // setState({...state, [name]: e.target.value})
                  await formik.setFieldValue(name, e.target.value)
                }}
                onBlur={async () => {
                  await formik.setFieldTouched(name)
                }}
                value={value}
                style={{maxWidth}}
                disabled={disabled}
                className={cn({[css.input]: true, [css.invalid]: invalid})}
      />
      {invalid && <div className={css.error}>{error}</div>}
    </div>
  )
}
