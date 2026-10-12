import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { mailtoFor, validateFields } from '../../lib/forms'
import './HonestForm.css'

/**
 * A form that never claims a submission it did not make.
 *
 * Named for the one rule it enforces: with no endpoint configured, the success
 * state is unreachable. The form validates in full, then hands the completed
 * enquiry to the visitor's own mail client and says plainly that the site did
 * not transmit anything. Setting `endpoint` switches on a real POST, and only
 * a 2xx response reaches the success state.
 *
 * Accessibility: every field has a real label, errors are tied to their input
 * with `aria-describedby` and `aria-invalid`, the first invalid field takes
 * focus on a failed submit, and one polite live region announces the outcome
 * so a screen reader hears it without the focus moving.
 *
 * @param {{
 *   fields: object[],
 *   options?: Record<string, string[]>,
 *   consent?: { name: string, label: string, required?: boolean },
 *   submitLabel: string,
 *   endpoint?: string | null,
 *   to: string,
 *   subjectFor: (values: Record<string, string>) => string,
 *   handoffNote?: string,
 *   children?: import('react').ReactNode,
 * }} props
 */
export default function HonestForm({
  fields,
  options = {},
  consent,
  submitLabel,
  endpoint = null,
  to,
  subjectFor,
  handoffNote,
  children,
}) {
  const allFields = consent ? [...fields, { ...consent, type: 'checkbox' }] : fields
  const empty = Object.fromEntries(allFields.map((f) => [f.name, f.type === 'checkbox' ? false : '']))

  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  // 'idle' | 'sending' | 'handoff' (no endpoint) | 'sent' | 'failed'
  const [status, setStatus] = useState('idle')
  const formRef = useRef(null)

  const update = (name, isCheckbox) => (event) => {
    const next = isCheckbox ? event.target.checked : event.target.value
    setValues((v) => ({ ...v, [name]: next }))
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e))
    // A new attempt supersedes the previous outcome.
    setStatus((s) => (s === 'handoff' || s === 'failed' ? 'idle' : s))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (status === 'sending') return // guards a double submit

    const found = validateFields(allFields, values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = allFields.find((f) => found[f.name])
      formRef.current?.elements[first.name]?.focus()
      return
    }

    if (!endpoint) {
      setStatus('handoff')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      setStatus(response.ok ? 'sent' : 'failed')
    } catch {
      setStatus('failed')
    }
  }

  const invalidCount = Object.values(errors).filter(Boolean).length

  const renderField = (field) => {
    const error = errors[field.name]
    const errorId = `${field.name}-error`
    const shared = {
      id: field.name,
      name: field.name,
      value: values[field.name],
      onChange: update(field.name, false),
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? errorId : undefined,
      className: 'hform__input',
      autoComplete: field.autoComplete,
    }
    const opts = options[field.name] || []

    return (
      <p
        key={field.name}
        className="hform__field"
        data-span={field.type === 'textarea' ? 'full' : undefined}
        data-error={error ? '' : undefined}
      >
        <label className="hform__label t-label" htmlFor={field.name}>
          {field.label}
          {field.required ? (
            <span className="hform__required" aria-hidden="true">
              *
            </span>
          ) : (
            <span className="hform__optional"> (optional)</span>
          )}
        </label>

        {field.type === 'textarea' ? (
          <textarea {...shared} rows={5} maxLength={field.maxLength} required={field.required} />
        ) : field.type === 'select' ? (
          <select {...shared} required={field.required}>
            <option value="">Select an option</option>
            {opts.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            {...shared}
            type={field.type === 'number' ? 'text' : field.type}
            inputMode={field.type === 'number' ? 'numeric' : undefined}
            required={field.required}
          />
        )}

        {error && (
          <span className="hform__error t-caption" id={errorId}>
            {error}
          </span>
        )}
      </p>
    )
  }

  return (
    <form ref={formRef} className="hform" onSubmit={onSubmit} noValidate>
      <div className="hform__fields">{fields.map(renderField)}</div>

      {children}

      {consent && (
        <p className="hform__consent" data-error={errors[consent.name] ? '' : undefined}>
          <input
            id={consent.name}
            name={consent.name}
            type="checkbox"
            className="hform__checkbox"
            checked={Boolean(values[consent.name])}
            onChange={update(consent.name, true)}
            aria-invalid={errors[consent.name] ? true : undefined}
            aria-describedby={errors[consent.name] ? `${consent.name}-error` : undefined}
          />
          <label className="hform__consent-label t-body" htmlFor={consent.name}>
            {consent.label}
            {consent.required && (
              <span className="hform__required" aria-hidden="true">
                *
              </span>
            )}
          </label>
          {errors[consent.name] && (
            <span className="hform__error t-caption" id={`${consent.name}-error`}>
              {errors[consent.name]}
            </span>
          )}
        </p>
      )}

      <div className="hform__actions">
        <button type="submit" className="cta cta--primary hform__submit" disabled={status === 'sending'}>
          <span className="cta__label">{status === 'sending' ? 'Sending…' : submitLabel}</span>
        </button>
        <p className="hform__required-note t-caption">
          <span aria-hidden="true">*</span> Required field
        </p>
      </div>

      {/* One live region announces every outcome. */}
      <div className="hform__status" role="status" aria-live="polite">
        {invalidCount > 0 && (
          <p className="hform__message hform__message--error t-body">
            Please correct {invalidCount} {invalidCount === 1 ? 'field' : 'fields'} above and submit again.
          </p>
        )}

        {status === 'handoff' && (
          <motion.div
            className="hform__message hform__message--handoff"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="t-body">
              <strong>This has not been sent yet.</strong> {handoffNote} Your details are ready below — send them
              and the team will receive them at {to}.
            </p>
            <a
              className="cta cta--primary"
              href={mailtoFor({ fields: allFields, values, to, subject: subjectFor(values) })}
            >
              <span className="cta__label">Send by email</span>
            </a>
          </motion.div>
        )}

        {status === 'sent' && (
          <p className="hform__message hform__message--ok t-body">
            Thank you — this has been received. The team will review it and respond.
          </p>
        )}

        {status === 'failed' && (
          <p className="hform__message hform__message--error t-body">
            This could not be submitted. Please try again, or email {to} directly.
          </p>
        )}
      </div>
    </form>
  )
}
