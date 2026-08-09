interface InlineCodeTextProps {
  text: string
  codeClassName?: string
}

const INLINE_CODE_PATTERN = /(`[^`]+`)/

export const InlineCodeText = ({ text, codeClassName }: InlineCodeTextProps) => {
  const parts = text.split(INLINE_CODE_PATTERN).filter(Boolean)

  if (parts.length === 0) {
    return null
  }

  return (
    <>
      {parts.map((part, index) => {
        const isCode = part.startsWith("`") && part.endsWith("`") && part.length > 2
        if (!isCode) {
          return <span key={`${index}-${part}`}>{part}</span>
        }

        return (
          <code
            key={`${index}-${part}`}
            className={codeClassName ?? "px-2 py-1 bg-muted text-sm font-mono text-cyan"}
          >
            {part.slice(1, -1)}
          </code>
        )
      })}
    </>
  )
}
