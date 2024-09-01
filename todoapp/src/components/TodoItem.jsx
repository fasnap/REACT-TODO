import { useState } from "react";
import styles from "./todoitem.module.css";

export default function TodoItem({ item, todos, setTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(item.name);

  function handleDelete(item) {
    console.log("delete button clicked for item", item);
    setTodos(todos.filter((todo) => todo !== item));
  }
  function handleClick(name) {
    const newArray = todos.map((todo) =>
      todo.name === name ? { ...todo, done: !todo.done } : todo
    );
    setTodos(newArray);
  }
  function handleEdit() {
    setIsEditing(true);
  }

  function handleUpdate() {
    const updatedTodos = todos.map((todo) =>
      todo.name == item.name ? { ...todo, name: newName } : todo
    );
    setTodos(updatedTodos);
    setIsEditing(false);
  }
  const className = item.done ? styles.completed : "";
  return (
    <div className={styles.item}>
      <div className={styles.itemName}>
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUpdate();
            }}
            className={styles.editInput}
          />
        ) : (
          <span className={className} onClick={() => handleClick(item.name)}>
            {item.name}
          </span>
        )}
        <span>
          <button
            onClick={() => handleDelete(item)}
            className={styles.deleteButton}
          >
            Delete
          </button>
          <button onClick={handleEdit} className={styles.editButton}>
            edit
          </button>
        </span>
      </div>
      <hr className={styles.line} />
    </div>
  );
}
