/**
 * Shared form validation and the email handover.
 *
 * Both forms on this site — the quote request and the vendor application —
 * use these, so there is one definition of what a valid email or phone number
 * is and one definition of how an enquiry reaches Beyond Service while no
 * submission endpoint exists.
 */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Accepts international formats: an optional +, then 7-15 digits, with spaces,
// hyphens, dots and parentheses allowed as separators.
export const PHONE_RE = /^\+?[\d\s().-]{7,20}$/

/**
 * Validates a value set against a field list.
 *
 * Returns a map of field name to message. An empty object means valid.
 *
 * @param {{name: string, label: string, type?: string, required?: boolean, min?: number, max?: number, maxLength?: number}[]} fields
 * @param {Record<string, string|boolean>} values
 */
export function validateFields(fields, values) {
  const errors = {}

  for (const field of fields) {
    const raw = values[field.name]

    // A consent checkbox is a boolean, not a string, and fails differently.
    if (field.type === 'checkbox') {
      if (field.required && !raw) errors[field.name] = 'This box must be ticked to continue.'
      continue
    }

    const value = (raw ?? '').toString().trim()

    if (field.required && !value) {
      errors[field.name] = `${field.label} is required.`
      continue
    }
    if (!value) continue

    if (field.type === 'email' && !EMAIL_RE.test(value)) {
      errors[field.name] = 'Enter a valid email address, for example name@company.com.'
    }

    if (field.type === 'tel' && (!PHONE_RE.test(value) || (value.match(/\d/g) || []).length < 7)) {
      errors[field.name] = 'Enter a valid phone number, including the country code if outside India.'
    }

    if (field.type === 'number') {
      const n = Number(value)
      if (!Number.isFinite(n) || !/^\d+$/.test(value)) {
        errors[field.name] = `${field.label} must be a whole number.`
      } else if (field.min !== undefined && n < field.min) {
        errors[field.name] = `${field.label} cannot be less than ${field.min}.`
      } else if (field.max !== undefined && n > field.max) {
        errors[field.name] = `${field.label} cannot be more than ${field.max}.`
      }
    }

    if (field.maxLength && value.length > field.maxLength) {
      errors[field.name] = `${field.label} must be ${field.maxLength} characters or fewer.`
    }
  }

  return errors
}

/**
 * Builds the `mailto:` handover for a completed form.
 *
 * This is what actually delivers an enquiry while no endpoint is configured.
 * It is a handover, not a submission, and the UI must say so.
 */
export function mailtoFor({ fields, values, to, subject }) {
  const body = fields
    .map((f) => {
      const v = values[f.name]
      const shown = f.type === 'checkbox' ? (v ? 'Yes' : 'No') : v || '—'
      return `${f.label}: ${shown}`
    })
    .join('\n')

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
