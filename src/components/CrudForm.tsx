"use client";

import { useState } from "react";
import { CrudItem } from "@/types/crud";
import styles from "@/styles/CrudForm.module.css";

interface Props {
  initialData?: Omit<CrudItem, "id">;
  onSubmit: (data: Omit<CrudItem, "id">) => void;
}

export default function CrudForm({ initialData, onSubmit }: Props) {
  const [nombre, setNombre] = useState(initialData?.nombre || "");
  const [descripcion, setDescripcion] = useState(initialData?.descripcion || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nombre, descripcion });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </label>
      <label>
        Descripción:
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </label>
      <button type="submit">Guardar</button>
    </form>
  );
}
