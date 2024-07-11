import * as Dialog from '@radix-ui/react-dialog';
import { AtSign, Plus, X } from 'lucide-react';
import { FormEvent } from 'react';
import { Button } from '../../components/button';

interface InviteGuestsDialogContentProps {
  emailsToInvite: string[]
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
  removeEmailFromInvites: (email: string) => void
}

export function InviteGuestsDialogContent({ addNewEmailToInvite, emailsToInvite, removeEmailFromInvites }: InviteGuestsDialogContentProps) {
  return (
    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
      <div className="space-y-2">

        <div className="flex items-center justify-between">
          <Dialog.Title className="text-lg font-semibold">
            Selecionar convidados
          </Dialog.Title>
          <Dialog.Close asChild>
            <button type="button" className="" aria-label="Close">
              <X className="size-5 text-zinc-400" />
            </button>
          </Dialog.Close>
        </div>


        <Dialog.Description className="text-sm text-zinc-400">
          Os convidados irão receber e-mails para confirmar a participação na viagem.
        </Dialog.Description>
      </div>

    <div className="flex flex-wrap gap-2">
      {emailsToInvite.map((email) => (
        <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
          <span className="text-zinc-300">{email}</span>
          <button type="button" onClick={() => removeEmailFromInvites(email)}>
            <X className="size-4 text-zinc-400" />
          </button>
        </div>
      ))}
    </div>
    
    <div className="w-full h-px bg-zinc-800" />

    <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
      <div className="px-2 flex items-center flex-1 gap-2">
        <AtSign className="size-5 text-zinc-400" />
        <input 
          type="email" 
          name="email" 
          placeholder="Digite o e-mail do convidado" 
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
      </div>

      <Button variant="primary" type="submit">
        Convidar
        <Plus className="size-5" />
      </Button>
    </form>
    </Dialog.Content>
  )
}