import * as Dialog from '@radix-ui/react-dialog';
import { User, X } from 'lucide-react';
import { FormEvent } from 'react';
import { Button } from '../../components/button';

interface ConfirmTripDialogContentProps {
  createTrip: (event: FormEvent<HTMLFormElement>) => void
}

export function ConfirmTripDialogContent({ createTrip }: ConfirmTripDialogContentProps) {
  return (
    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Dialog.Title className="text-lg font-semibold">
            Confirmar criação de viagem
          </Dialog.Title>
          <Dialog.Close asChild>
            <button type="button" className="" aria-label="Close">
              <X className="size-5 text-zinc-400" />
            </button>
          </Dialog.Close>
        </div>

        <Dialog.Description className="text-sm text-zinc-400">
          Para concluir a criação da viagem para <span className="text-zinc-100 font-semibold">Florianópolis, Brasil</span> nas datas de <span className="text-zinc-100 font-semibold">16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:
        </Dialog.Description>
      </div>

      <form onSubmit={createTrip} className="space-y-3">
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <User className="size-5 text-zinc-400" />
          <input 
            type="text" 
            name="name" 
            placeholder="Seu nome completo" 
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </div>

        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <User className="size-5 text-zinc-400" />
          <input 
            type="email" 
            name="email" 
            placeholder="Seu e-mail pessoal" 
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
        </div>

        <Button variant="primary" size="full" type="submit">
          Confirmar criação da viagem
        </Button>
      </form>
    </Dialog.Content>
  )
}