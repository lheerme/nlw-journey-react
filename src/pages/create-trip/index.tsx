import { FormEvent, useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import { useNavigate } from "react-router-dom";
import { ConfirmTripDialogContent } from "./confirm-trip-dialog-content";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestStep } from "./steps/invite-guest-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState([
    'gsouza2651@gmail.com'
  ])

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

  function openGuestsInput() {
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email'))

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite((current) => [...current, email])

    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    setEmailsToInvite((current) => current.filter((email) => email !== emailToRemove))
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    console.log(destination)
    console.log(ownerName)
    console.log(ownerEmail)
    console.log(eventStartAndEndDates?.from)
    console.log(eventStartAndEndDates?.to)

    if (!destination) {
      return
    }

    if (!eventStartAndEndDates?.from && !eventStartAndEndDates?.to) {
      return
    }

    if (emailsToInvite.length === 0) {
      return
    }

    if (!ownerName || !ownerEmail) {
      return
    }

    const response = await api.post('/trips', {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail
    })

    const { tripId } = response.data

    navigate(`/trips/${tripId}`)
  }

  return (
    <div className="h-dvh flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="w-full max-w-3xl px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="planner" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            closeGuestsInput={closeGuestsInput}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
          />

          {isGuestsInputOpen ? (
            <InviteGuestStep
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              addNewEmailToInvite={addNewEmailToInvite}
              removeEmailFromInvites={removeEmailFromInvites}
            />  
          ) : null}

          <Dialog.Root open={isConfirmTripModalOpen} onOpenChange={setIsConfirmTripModalOpen}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/60" />
              <ConfirmTripDialogContent 
                createTrip={createTrip}
                setOwnerName={setOwnerName}
                setOwnerEmail={setOwnerEmail}
              />
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        <p className="text-sm text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
        com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.</p>
      </div>
    </div>
  )
}