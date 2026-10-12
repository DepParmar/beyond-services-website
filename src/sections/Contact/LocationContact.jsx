import { useState } from 'react'
import ScrollReveal from '../../components/motion/ScrollReveal'
import { ClockIcon, MailIcon, PhoneIcon } from '../../components/Icons'
import { CONTACT_INFO, telHref } from '../../content/site'
import './LocationContact.css'

// The one verified address. Both the embed and the "open in Maps" link are
// built from it, so there is no second, drifting copy of the location.
const MAP_QUERY = encodeURIComponent(`Beyond Service, ${CONTACT_INFO.address}`)
const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`

/**
 * Location & Contact.
 *
 * The map is click-to-load: a third-party iframe is heavy and sets cookies, so
 * nothing is requested until someone asks for it. The address, phones and email
 * are real content either way, and the "open in Google Maps" link works without
 * ever loading the embed.
 */
export default function LocationContact() {
  const [mapLoaded, setMapLoaded] = useState(false)

  return (
    <section className="section location" aria-labelledby="location-heading">
      <div className="container">
        <h2 id="location-heading" className="visually-hidden">
          Location and contact details
        </h2>

        <div className="location__grid">
          <ScrollReveal className="location__details" stagger={0.09}>
            <ScrollReveal.Item as="div" className="location__block">
              <h3 className="location__title t-label">Visit</h3>
              <address className="location__address">
                {CONTACT_INFO.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <a className="location__map-link t-label" href={MAP_LINK} target="_blank" rel="noopener noreferrer">
                Open in Google Maps
                <span className="visually-hidden"> — opens in a new tab</span>
              </a>
            </ScrollReveal.Item>

            <ScrollReveal.Item as="div" className="location__block">
              <h3 className="location__title t-label">Call</h3>
              <ul className="location__list">
                {CONTACT_INFO.phones.map((phone) => (
                  <li key={phone}>
                    <a className="location__link" href={telHref(phone)}>
                      <PhoneIcon className="location__icon" />
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal.Item>

            <ScrollReveal.Item as="div" className="location__block">
              <h3 className="location__title t-label">Email</h3>
              <a className="location__link" href={`mailto:${CONTACT_INFO.email}`}>
                <MailIcon className="location__icon" />
                {CONTACT_INFO.email}
              </a>
            </ScrollReveal.Item>

            <ScrollReveal.Item as="div" className="location__block">
              <h3 className="location__title t-label">Hours</h3>
              <p className="location__hours">
                <ClockIcon className="location__icon" />
                <span>
                  {CONTACT_INFO.hoursDays}
                  <br />
                  {CONTACT_INFO.hours}
                </span>
              </p>
            </ScrollReveal.Item>
          </ScrollReveal>

          <div className="location__map">
            {mapLoaded ? (
              <iframe
                className="location__frame"
                title={`Map showing ${CONTACT_INFO.address}`}
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <button type="button" className="location__map-cta" onClick={() => setMapLoaded(true)}>
                <span className="location__map-ground" aria-hidden="true" />
                <span className="location__map-label">
                  <span className="location__map-title">Vesu, Surat</span>
                  <span className="location__map-hint t-caption">
                    Load the interactive map
                    <span className="visually-hidden"> for {CONTACT_INFO.address}</span>
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
