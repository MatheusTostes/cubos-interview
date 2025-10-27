import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Button } from '@/shared/components/atoms/button'
import { Dialog } from '@/shared/components/atoms/dialog'
import { Typography } from '@/shared/components/atoms/typography'
import { HStack } from '@/shared/components/atoms/hstack'
import { VStack } from '@/shared/components/atoms/vstack'
import type { MovieDetails } from '../../types/movie-types'

export type DeleteMovieDialogProps = {
  movie: MovieDetails
}

export const DeleteMovieDialog = ({ movie }: DeleteMovieDialogProps) => {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const { api } = await import('@/shared/services/api')
      await api.delete(`/movies/${movie.id}`)

      toast.success('Filme deletado com sucesso!')

      // Invalidar queries
      queryClient.invalidateQueries({ queryKey: ['movies'] })

      // Fechar diálogo e redirecionar
      setOpen(false)
      navigate('/movies')
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao deletar o filme'
      toast.error(message)
      console.error('Error deleting movie:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="secondary">
          <Typography font="roboto" variant="p">
            Deletar
          </Typography>
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>
            <Typography font="montserrat" variant="h3">
              Confirmar Exclusão
            </Typography>
          </Dialog.Title>
          <Dialog.Description asChild>
            <Typography variant="p" font="roboto">
              Tem certeza que deseja excluir o filme{' '}
              <strong>{movie.primaryTitle}</strong>? Esta ação não pode ser
              desfeita.
            </Typography>
          </Dialog.Description>
        </Dialog.Header>

        <Dialog.Footer asChild>
          <HStack className="gap-3">
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
              disabled={isDeleting}
            >
              <Typography font="roboto" variant="p">
                Cancelar
              </Typography>
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Typography font="roboto" variant="p">
                {isDeleting ? 'Deletando...' : 'Confirmar Exclusão'}
              </Typography>
            </Button>
          </HStack>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
