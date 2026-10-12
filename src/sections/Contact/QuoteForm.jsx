import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import SectionIntro from '../../components/ui/SectionIntro'
import ImageReveal from '../../components/motion/ImageReveal'
import { mailtoFor as buildMailto, validateFields } from '../../lib/forms'
import { CONTACT_INFO, QUOTE_FORM } from '../../content/site'
import './QuoteForm.css'

const EMPTY = Object.fromEntries(QUOTE_FORM.fields.map((f) => [f.name, '']))

// Validation and the email handover are shared with the vendor application,
// so there is one definition of a valid email or phone number on the site.
const validate = (values) => validateFields(QUOTE_FORM.fields, values)

const mailtoFor = (values) =>
  buildMailto({
    fields: QUOTE_FORM.fields,
    values,
    to: CONTACT_INFO.email,
    subject: `Quote request — ${values.service || 'General enquiry'}${values.company ? ` — ${values.company}` : ''}`,
  })

/**
 * Request a Quote.
 *
 * Validation is complete and accessible. Submission is not: no backend or
 * submission endpoint has been configured for this project, so the form never
 * shows a success state. Once the input is valid it hands the completed enquiry
 * to the user's mail client, pre-addressed and pre-filled, and says plainly
 * that nothing was transmitted by the site itself.
 *
 * Setting `QUOTE_FORM.endpoint` in site.js is the hook for a real POST; the
 * success and error states below are already wired for it.
 */
export default function QuoteForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  // 'idle' | 'sending' | 'handoff' (no endpoint) | 'sent' | 'failed'
  const [status, setStatus] = useState('idle')
  const formRef = useRef(null)

  const update = (name) => (event) => {
    setValues((v) => ({ ...v, [name]: event.target.value }))
    // Clear a field's error as soon as the user edits it.
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (status === 'sending') return // guards against a double submit

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = QUOTE_FORM.fields.find((f) => found[f.name])
      formRef.current?.elements[first.name]?.focus()
      return
    }

    if (!QUOTE_FORM.endpoint) {
      // Nothing was sent by the site. Say so, and hand over to email.
      setStatus('handoff')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(QUOTE_FORM.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      // Only a real 2xx counts as success.
      setStatus(response.ok ? 'sent' : 'failed')
    } catch {
      setStatus('failed')
    }
  }

  const invalidCount = Object.values(errors).filter(Boolean).length

  return (
    <section className="section quote" aria-labelledby="quote-heading">
      <div className="container">
        <SectionIntro
          id="quote-heading"
          label={QUOTE_FORM.label}
          lines={QUOTE_FORM.headingLines}
          supporting={QUOTE_FORM.supporting}
          align="split"
        />

        <div className="quote__grid">
          <form ref={formRef} className="quote__form" onSubmit={onSubmit} noValidate>
            <div className="quote__fields">
              {QUOTE_FORM.fields.map((field) => {
                const error = errors[field.name]
                const errorId = `${field.name}-error`
                const shared = {
                  id: field.name,
                  name: field.name,
                  value: values[field.name],
                  onChange: update(field.name),
                  'aria-invalid': error ? true : undefined,
                  'aria-describedby': error ? errorId : undefined,
                  className: 'quote__input',
                  autoComplete: field.autoComplete,
                }

                return (
                  <p
                    key={field.name}
                    className="quote__field"
                    data-span={field.type === 'textarea' || field.type === 'select' ? 'full' : undefined}
                    data-error={error ? '' : undefined}
                  >
                    <label className="quote__label t-label" htmlFor={field.name}>
                      {field.label}
                      {field.required ? (
                        <span className="quote__required" aria-hidden="true">
                          *
                        </span>
                      ) : (
                        <span className="quote__optional"> (optional)</span>
                      )}
                    </label>

                    {field.type === 'textarea' ? (
                      <textarea {...shared} rows={5} required={field.required} />
                    ) : field.type === 'select' ? (
                      <select {...shared} required={field.required}>
                        <option value="">Select a service</option>
                        {QUOTE_FORM.serviceOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input {...shared} type={field.type} required={field.required} />
                    )}

                    {error && (
                      <span className="quote__error t-caption" id={errorId}>
                        {error}
                      </span>
                    )}
                  </p>
                )
              })}
            </div>

            <div className="quote__actions">
              <button type="submit" className="cta cta--primary cta--md quote__submit" disabled={status === 'sending'}>
                <span className="cta__label">{status === 'sending' ? 'Sending…' : QUOTE_FORM.submitLabel}</span>
              </button>
              <p className="quote__required-note t-caption">
                <span aria-hidden="true">*</span> Required field
              </p>
            </div>

            {/* One live region announces every outcome. */}
            <div className="quote__status" role="status" aria-live="polite">
              {invalidCount > 0 && (
                <p className="quote__message quote__message--error t-body">
                  Please correct {invalidCount} {invalidCount === 1 ? 'field' : 'fields'} above and submit again.
                </p>
              )}

              {status === 'handoff' && (
                <motion.div
                  className="quote__message quote__message--handoff"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="t-body">
                    <strong>Your enquiry has not been sent yet.</strong> This site has no submission endpoint
                    configured, so it cannot deliver the form itself. Your details are ready below — send them and
                    the team will receive them at {CONTACT_INFO.email}.
                  </p>
                  <a className="cta cta--primary cta--md" href={mailtoFor(values)}>
                    <span className="cta__label">Send enquiry by email</span>
                  </a>
                </motion.div>
              )}

              {status === 'sent' && (
                <p className="quote__message quote__message--ok t-body">
                  Thank you — your enquiry has been received. The team will review it and respond.
                </p>
              )}

              {status === 'failed' && (
                <p className="quote__message quote__message--error t-body">
                  Your enquiry could not be submitted. Please try again, or email {CONTACT_INFO.email} directly.
                </p>
              )}
            </div>
          </form>

          <ImageReveal className="quote__figure" from="right" duration={1.3} scale>
            <img
              className="quote__image"
              src={QUOTE_FORM.image.src}
              width={QUOTE_FORM.image.width}
              height={QUOTE_FORM.image.height}
              alt={QUOTE_FORM.image.alt}
              loading="lazy"
              decoding="async"
            />
          </ImageReveal>
        </div>
      </div>
    </section>
  )
}
