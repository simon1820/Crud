"use client";

import { useEffect, useState, useCallback } from "react";
import CrudTable from "@/components/CrudTable";
import { CrudItem } from "@/types/crud";
import { crudService } from "@/services/crud.service";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CrudPage() {
  const [items, setItems] = useState<CrudItem[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const loadData = useCallback(async () => {
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
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        setError("Error al cargar items");
      }
    }
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      loadData();
    }
  }, [loadData, router]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Listado de Items</h1>
      <Link href="/crud/new">➕ Nuevo Item</Link>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <CrudTable items={items} onDelete={() => {}} />
    </div>
  );
}
