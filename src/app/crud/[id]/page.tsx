"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CrudForm from "@/components/CrudForm";
import { crudService } from "@/services/crud.service";

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState<{ nombre: string; descripcion: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      if (id) {
        const data = await crudService.getOne(Number(id));
        setInitialData({ nombre: data.nombre, descripcion: data.descripcion });
      }
    };
    load();
  }, [id]);

  const handleUpdate = async (data: { nombre: string; descripcion: string }) => {
    await crudService.update(Number(id), data);
    router.push("/crud");
  };

  if (!initialData) return <p>Cargando...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Editar Item</h1>
      <CrudForm initialData={initialData} onSubmit={handleUpdate} />
    </div>
  );
}
