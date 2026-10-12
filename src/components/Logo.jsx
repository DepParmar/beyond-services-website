/**
 * The real brand asset at its native 634×246 ratio. Size it with CSS width only;
 * height follows the intrinsic ratio so the badge is never distorted.
 * @param {import('react').ComponentPropsWithRef<'img'>} props
 */
export default function Logo({ alt = 'Beyond Services', ...props }) {
  return (
    <img src="/brand/logo.png" width="634" height="246" alt={alt} decoding="sync" draggable="false" {...props} />
  )
}
