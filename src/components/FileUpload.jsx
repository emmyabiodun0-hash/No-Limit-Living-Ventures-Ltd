import { useEffect, useRef, useState } from 'react'
import { formatFileSize, validateFile } from './registrationLogic'

// Gives back a temporary URL for previewing an image File, and cleans it up.
export function useObjectUrl(file) {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    if (!file || !file.type.startsWith('image/')) {
      setUrl(null)
      return undefined
    }
    const objectUrl = URL.createObjectURL(file)
    setUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  return url
}

// Mobile-friendly upload control: tap to choose, preview, replace, remove.
// The chosen File is held by the parent and sent as-is (no Base64).
function FileUpload({ id, name, label, required, hint, accept, rule, file, error, onSelect, onReject }) {
  const inputRef = useRef(null)
  const previewUrl = useObjectUrl(file)
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined
  const isPdf = file && file.type === 'application/pdf'

  function openPicker() {
    inputRef.current?.click()
  }

  function handleChange(event) {
    const picked = event.target.files?.[0]
    if (!picked) return // picker cancelled — keep whatever was chosen before

    const problem = validateFile(picked, rule)
    if (problem) {
      event.target.value = ''
      onReject(problem)
      return
    }
    onSelect(picked)
  }

  function handleRemove() {
    if (inputRef.current) inputRef.current.value = ''
    onSelect(null)
  }

  return (
    <div className={`reg-field reg-file ${error ? 'has-error' : ''}`}>
      <span className="reg-label" id={`${id}-label`}>
        {label}
        {required ? (
          <span className="reg-req" aria-hidden="true">
            {' '}*
          </span>
        ) : (
          <span className="reg-optional"> (optional)</span>
        )}
      </span>
      {hint && (
        <p className="reg-hint" id={hintId}>
          {hint}
        </p>
      )}

      <input
        ref={inputRef}
        id={id}
        name={name}
        type="file"
        accept={accept}
        className="reg-sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={handleChange}
      />

      {file ? (
        <div className="reg-file__selected">
          {previewUrl ? (
            <img className="reg-file__preview" src={previewUrl} alt={`Preview of ${file.name}`} />
          ) : (
            <div className="reg-file__icon" aria-hidden="true">
              {isPdf ? 'PDF' : 'FILE'}
            </div>
          )}
          <div className="reg-file__meta">
            <p className="reg-file__name">{file.name}</p>
            <p className="reg-file__size">{formatFileSize(file.size)}</p>
            <div className="reg-file__actions">
              <button
                type="button"
                className="reg-btn reg-btn--small"
                onClick={openPicker}
                aria-label={`Replace ${label}`}
                aria-describedby={describedBy}
                aria-invalid={error ? 'true' : undefined}
              >
                Replace
              </button>
              <button
                type="button"
                className="reg-btn reg-btn--small reg-btn--danger"
                onClick={handleRemove}
                aria-label={`Remove ${label}`}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="reg-file__drop"
          onClick={openPicker}
          aria-labelledby={`${id}-label`}
          aria-describedby={describedBy}
          aria-invalid={error ? 'true' : undefined}
        >
          <span className="reg-file__drop-title">Tap to choose a file</span>
          <span className="reg-file__drop-note">
            {rule.readable} · max {rule.maxMB} MB
          </span>
        </button>
      )}

      {error && (
        <p className="reg-error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default FileUpload
