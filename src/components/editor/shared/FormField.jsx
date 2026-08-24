/**
 * Adobe Spectrum-styled Form Field component
 */
export default function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  multiline = false,
  rows = 3,
  hint,
  className = '',
}) {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="spectrum-label">
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          id={id}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="spectrum-textarea"
          aria-label={label}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="spectrum-input"
          aria-label={label}
        />
      )}
      {hint && (
        <p className="text-[10.5px] text-[#7a7a7a] mt-0.5">{hint}</p>
      )}
    </div>
  );
}
