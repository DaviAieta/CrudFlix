/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '../../components/ui/button'

export function AddTagButton() {
  const { pending } = useFormStatus()

  return (
    <div>
      <Button type="submit" disabled={pending}>
        {pending ? 'Carregando...' : 'Salvar'}
      </Button>
    </div>
  )
}
