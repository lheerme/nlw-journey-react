import { Plus } from "lucide-react";
import * as Dialog from '@radix-ui/react-dialog';
import { CreateActivityDialogContent } from "./create-activity-dialog-content";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";

export function TripDetailsPage() {
  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button type="button" className="bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-medium flex items-center gap-2 hover:bg-lime-400 hover:transition-colors">
                  <Plus className="size-5" />
                  Cadastrar atividade
                </button>

              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60" />
                <CreateActivityDialogContent />
              </Dialog.Portal>
            </Dialog.Root>
          </div>

          <Activities />

        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks />

          <div className="w-full h-px bg-zinc-800" />

          <Guests />
        </div>
      </main>
    </div>
  )
}