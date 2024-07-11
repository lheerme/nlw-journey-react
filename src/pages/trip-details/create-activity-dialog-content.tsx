import * as Dialog from '@radix-ui/react-dialog';
import { Calendar, Tag, X } from 'lucide-react';
import { Button } from '../../components/button';

export function CreateActivityDialogContent() {
  return (
    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Dialog.Title className="text-lg font-semibold">
            Cadastrar atividade
          </Dialog.Title>
          <Dialog.Close asChild>
            <button type="button" className="" aria-label="Close">
              <X className="size-5 text-zinc-400" />
            </button>
          </Dialog.Close>
        </div>

        <Dialog.Description className="text-sm text-zinc-400">
          Todos convidados podem visualizar as atividades.
        </Dialog.Description>
      </div>

      <form className="space-y-3">
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Tag className="size-5 text-zinc-400" />
          <input 
            name="title" 
            placeholder="Qual a atividade" 
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400" />
            <input 
              type="datetime-local" 
              name="occurs_at" 
              placeholder="Data e horário da atividade" 
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
          </div>
        </div>

        <Button variant="primary" size='full' type="submit">
          Salvar atividade
        </Button>
      </form>
    </Dialog.Content>
  )
}