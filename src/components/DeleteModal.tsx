import { useDeleteProduct } from "@/service/products";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

interface ModalProps {
  title: string;
  id: number;
}

export function DeleteModal({ title, id }: ModalProps) {
  const [open, setOpen] = useState(false);
  const deleteProductMutation = useDeleteProduct();

  const handleDelete = async () => {
    try {
      await deleteProductMutation.mutateAsync(id);
      console.log("Produto deletado com sucesso!");
      setOpen(false);
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="text-sm text-red-800 transition-all hover:text-red-500">
          Excluir produto
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-gray-900 opacity-70" />
        <Dialog.Content className="bg-white fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-max translate-x-[-50%] translate-y-[-50%] overflow-y-auto p-4 rounded-xl">
          <Dialog.Title className="text-xl font-bold text-black">
            Deseja apagar esse produto: {title}
          </Dialog.Title>
          <Dialog.Description className="text-base text-gray-500">
            Esta ação é irreversível e removerá permanentemente o produto do
            sistema.
          </Dialog.Description>

          <div className="mt-6 flex justify-center">
            <button
              className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleDelete}
            >
              Sim
            </button>

            <Dialog.Close className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
              Não
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
