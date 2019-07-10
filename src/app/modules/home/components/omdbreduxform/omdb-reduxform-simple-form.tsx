import React from 'react'
import { Field, reduxForm, InjectedFormProps, FormErrors } from 'redux-form'

export interface IMovieForm {
  name: string;
}
interface IFormProps {
  onSubmit: (value: Partial<IMovieForm>) => void | FormErrors<FormData> | Promise<any>;
}

const SimpleForm = (props: IFormProps & InjectedFormProps<Partial<IMovieForm>, IFormProps >) => {
  const { handleSubmit, pristine, reset, submitting, onSubmit } = props
  return (
    <form onSubmit={handleSubmit(onSubmit as any)}>
      <div>
        <label>Movie Name</label>
        <div>
          <Field name="name" component="input" type="text" placeholder="First Name"/>
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm<Partial<IMovieForm>,IFormProps>({
  form: 'simple'  // a unique identifier for this form
})(SimpleForm)
