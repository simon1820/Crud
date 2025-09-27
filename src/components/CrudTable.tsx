"use client";

import { CrudItem } from "@/types/crud";
import Link from "next/link";
import styles from "@/styles/CrudTable.module.css";

interface Props {
  items: CrudItem[];
  onDelete: (id: number) => void;
}

export default function CrudTable({ items, onDelete }: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.nombre}</td>
            <td>{item.descripcion}</td>
            <td>
              <Link href={`/crud/${item.id}`} className={styles.btnEdit}>
                Editar
              </Link>
              <button
                className={styles.btnDelete}
                onClick={() => onDelete(item.id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
