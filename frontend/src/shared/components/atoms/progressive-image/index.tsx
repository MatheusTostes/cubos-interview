import { useState, useEffect } from 'react'
import { cn } from '@/shared/utils'

interface ProgressiveImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  placeholderSrc?: string
  alt: string
}

export const ProgressiveImage = ({
  src,
  placeholderSrc,
  alt,
  className,
  ...props
}: ProgressiveImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Preload da imagem real
    const img = new Image()

    img.onload = () => {
      setIsLoading(false)
      setImageSrc(src)
    }

    img.onerror = () => {
      setHasError(true)
      setIsLoading(false)
    }

    img.src = src

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  const placeholder = placeholderSrc || src

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        width: '100%',
        height: '100%',
        minWidth: 'inherit',
        maxWidth: 'inherit',
      }}
    >
      {/* Placeholder embaçado */}
      <img
        src={placeholder}
        alt={alt}
        loading="eager"
        className={cn(
          'absolute inset-0 object-fill blur-md transition-opacity duration-300',
          isLoading ? 'opacity-100' : 'opacity-0'
        )}
        style={{ width: '100%', height: '100%' }}
      />

      {/* Imagem real */}
      {!hasError && (
        <img
          src={imageSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={cn(
            'object-fill transition-opacity duration-500',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
          style={{ width: '100%', height: '100%' }}
          {...props}
        />
      )}

      {hasError && (
        <div className="flex h-full w-full items-center justify-center bg-mauve-700 text-muted-foreground">
          <span>Erro ao carregar imagem</span>
        </div>
      )}
    </div>
  )
}
