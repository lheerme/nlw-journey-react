import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import * as Dialog from '@radix-ui/react-dialog';
import { DateRange, DayPicker } from "react-day-picker";

import "react-day-picker/dist/style.css"
import { useState } from "react";
import { format } from "date-fns";


interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  openGuestsInput: () => void
  closeGuestsInput: () => void
}

export function DestinationAndDateStep({ isGuestsInputOpen, openGuestsInput, closeGuestsInput }: DestinationAndDateStepProps) {
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
    ? format(eventStartAndEndDates.from, 'd').concat( ' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
    : null

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input disabled={isGuestsInputOpen} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
      </div>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button disabled={isGuestsInputOpen} className="flex items-center gap-2 text-left">
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-lg text-zinc-400 w-40">
              {displayedDate || 'Quando?'}
            </span>
          </button>

        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Dialog.Title className="text-lg font-semibold">
                  Selecione a data
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button type="button" aria-label="Close">
                    <X className="size-5 text-zinc-400" />
                  </button>
                </Dialog.Close>
              </div>
            </div>

            <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />

          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button variant="secondary" onClick={closeGuestsInput}>
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (  
        <Button variant="primary" onClick={openGuestsInput}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  )
}