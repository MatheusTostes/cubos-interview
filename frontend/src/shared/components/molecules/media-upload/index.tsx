import { useRef, useState, useEffect } from 'react'
import { Upload, X } from 'lucide-react'
import { Button } from '@/shared/components/atoms/button'
import { cn } from '@/shared/utils'

interface MediaUploadProps {
  onFileSelect: (file: File | null) => void
  accept?: string
  label?: string
  error?: string
  className?: string
  initialUrl?: string
}

export const MediaUpload = ({
  onFileSelect,
  accept = 'image/*',
  label = 'Upload de mídia',
  error,
  className,
  initialUrl,
}: MediaUploadProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(initialUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Limpar preview quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (preview && !initialUrl) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview, initialUrl])

  // Atualizar preview quando initialUrl mudar
  useEffect(() => {
    if (initialUrl) {
      setPreview(initialUrl)
    }
  }, [initialUrl])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (selectedFile) {
      setFile(selectedFile)
      onFileSelect(selectedFile)

      // Criar preview da imagem
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFile(null)
    setPreview(null)
    onFileSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <span className="text-sm font-medium text-foreground">{label}</span>
      )}

      <input
        id={`file-input-${label}`}
        type="file"
        ref={fileInputRef}
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      <label
        htmlFor={`file-input-${label}`}
        className={cn(
          'relative flex h-32 w-full cursor-pointer items-center justify-center rounded-sm border-2 border-dashed transition-colors',
          error
            ? 'border-destructive'
            : 'border-mauve-600 hover:border-primary',
          preview && 'border-primary'
        )}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full rounded-sm object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute right-2 top-2 rounded-full bg-destructive p-1 text-white hover:bg-destructive/80"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Clique para fazer upload
            </span>
          </div>
        )}
      </label>

      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  )
}
