"use client";

import CrudForm from "@/components/CrudForm";
import { crudService } from "@/services/crud.service";
import { useRouter } from "next/navigation";

export default function NewPage() {
  const router = useRouter();

  const handleCreate = async (data: { nombre: string; descripcion: string }) => {
    try {
      await crudService.create(data); // guarda en backend
      alert("Item creado con éxito ✅");
      router.push("/crud"); // redirige a la lista de items (ajusta la ruta)
    } catch (err) {
      console.error(err);
      alert("Error al guardar ❌");
    }
  };

  return (
    <div>
      <h1>Nuevo Item</h1>
      <CrudForm onSubmit={handleCreate} />
      <button
        onClick={() => router.back()}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#ddd",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ⬅ Regresar
      </button>
    </div>
  );
}
