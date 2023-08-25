import axios from 'axios'
import { Form, redirect, useNavigation } from 'react-router-dom'
import { toast } from 'react-toastify'

const url = 'https://www.course-api.com/cocktails-newsletter'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    const resp = await axios.post(url, data)

    toast.success(resp.data.msg)
    return redirect('/')
  } catch (error) {
    console.log(error.response.data.msg)
    toast.error(error?.response?.data?.msg)

    return error
  }
}

const Newsletter = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Form className="form" method="POST">
      <h4 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        our newsletter
      </h4>

      <div className="form-row">
        <label htmlFor="name" className="form-label">
          name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-input"
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="lastName" className="form-label">
          last name
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          className="form-input"
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="email" className="form-label">
          email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-input"
          required
        />
      </div>

      <button
        type="submit"
        style={{ marginTop: '0.5rem' }}
        className="btn btn-block"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'submitting' : 'submit'}
      </button>
    </Form>
  )
}
export default Newsletter
