"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/CrudTable";
import { CrudItem } from "@/types/crud";
import { crudService } from "@/services/crud.service";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ usar navigation en App Router

export default function CrudPage() {
  const [items, setItems] = useState<CrudItem[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const loadData = async () => {
    try {
      const data = await crudService.getAll();
      setItems(data);
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "message" in err &&
        typeof (err as { message: string }).message === "string" &&
        ((err as { message: string }).message.includes("401") ||
          (err as { message: string }).message.includes("403"))
      ) {
        // token inválido → redirigir al login
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        setError("Error al cargar items");
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este registro?")) {
      try {
        await crudService.delete(id);
        await loadData();
      } catch (err: unknown) {
        if (err instanceof Error) {
          alert("Error al eliminar: " + err.message);
        } else {
          alert("Error al eliminar: " + String(err));
        }
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // si no hay token → al login
    } else {
      loadData(); // si hay token → intentar cargar datos
    }
  }, [loadData, router]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Listado de Items</h1>
      <Link href="/crud/new">➕ Nuevo Item</Link>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <CrudTable items={items} onDelete={handleDelete} />
    </div>
  );
}
