import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, UserRoundPlus } from 'lucide-react';
import { InviteGuestsDialogContent } from '../invite-guests-dialog-content';
import { FormEvent } from 'react';
import { Button } from '../../../components/button';

interface InviteGuestStepProps {
  emailsToInvite: string[]
  openConfirmTripModal: () => void
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
  removeEmailFromInvites: (email: string) => void
}

export function InviteGuestStep({ emailsToInvite, openConfirmTripModal, addNewEmailToInvite, removeEmailFromInvites }: InviteGuestStepProps) {

  
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button type="button" className="flex items-center gap-2 flex-1">
            <UserRoundPlus className="size-5 text-zinc-400" />
            {emailsToInvite.length > 0 ? (
              <span className="text-lg text-zinc-100 flex-1 text-left">
                {emailsToInvite.length} pessoa(s) convidada(s)
              </span>
            ) : (
              <span className="text-lg text-zinc-400 flex-1 text-left">Quem estará na viagem?</span>
            )}
          </button>

        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60" />
          <InviteGuestsDialogContent
            emailsToInvite={emailsToInvite}
            addNewEmailToInvite={addNewEmailToInvite}
            removeEmailFromInvites={removeEmailFromInvites}
          />
        </Dialog.Portal>
      </Dialog.Root>

      <div className="w-px h-6 bg-zinc-800" />

      <Button variant="primary" onClick={openConfirmTripModal}>
        Confirmar viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  )
}