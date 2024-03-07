import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUpdateProduct } from "@/service/products";

interface ModalProps {
  id: number;
  title: string;
  description: string;
}

export function UpdateModal({ id, title, description }: ModalProps) {
  const [open, setOpen] = useState(false);
  const mutation = useUpdateProduct();

  const schema = yup.object().shape({
    title: yup.string().required("O título é obrigatório"),
    description: yup.string().required("A descrição é obrigatória"),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: title,
      description: description,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await mutation.mutateAsync({ id: id, updatedProduct: data });
      console.log("Produto editado com sucesso!");

      setOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="text-sm text-blue-800 transition-all hover:text-blue-500">
          Editar Produto
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-gray-900 opacity-70" />
        <Dialog.Content className="bg-white fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-max translate-x-[-50%] translate-y-[-50%] overflow-y-auto p-4 rounded-xl">
          <Dialog.Title className="text-xl font-bold text-black">
            Editar Produto: {title}
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Título
              </label>
              <input
                type="text"
                id="title"
                className="mt-1 p-2 border text-gray-700 border-gray-300 rounded-md w-full"
                {...register("title")}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Descrição
              </label>
              <textarea
                id="description"
                className="mt-1 p-2 text-gray-700 border border-gray-300 rounded-md w-full"
                {...register("description")}
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Atualizar
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
