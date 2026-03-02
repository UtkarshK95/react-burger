import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./BurgerStyle.module.css";

// ---- Types ----

type IngredientType = "lettuce" | "tomato" | "cheese" | "meat";

interface IngredientItem {
  id: string;
  type: IngredientType;
}

// ---- Constants ----

const INGREDIENT_TYPES: IngredientType[] = ["lettuce", "tomato", "cheese", "meat"];

const LABELS: Record<IngredientType, string> = {
  lettuce: "Lettuce",
  tomato: "Tomato",
  cheese: "Cheese",
  meat: "Meat",
};

const PRICES: Record<IngredientType, number> = {
  lettuce: 0.5,
  tomato: 0.5,
  cheese: 1.0,
  meat: 2.0,
};

// ---- Sortable Ingredient Layer ----

const SortableIngredient = ({ item }: { item: IngredientItem }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={styles[`${item.type}Side` as keyof typeof styles]}
      title={`Drag to reorder ${LABELS[item.type]}`}
      {...attributes}
      {...listeners}
    />
  );
};

// ---- Ingredient Control ----

interface IngredientControlProps {
  type: IngredientType;
  count: number;
  onAdd: () => void;
  onRemove: () => void;
}

const IngredientControl = ({ type, count, onAdd, onRemove }: IngredientControlProps) => (
  <div className={styles.ingredientsBlock}>
    <p>{LABELS[type]}</p>
    <span className={styles.priceTag}>+${PRICES[type].toFixed(2)} each</span>
    <div className={styles.ingrBtns}>
      <button className={styles.ingrBtn} onClick={onAdd}>
        Add
      </button>
      <span className={styles.count}>{count}</span>
      <button className={styles.ingrBtn} onClick={onRemove} disabled={count === 0}>
        Remove
      </button>
    </div>
  </div>
);

// ---- Order Modal ----

interface OrderModalProps {
  stack: IngredientItem[];
  total: number;
  onClose: () => void;
}

const OrderModal = ({ stack, total, onClose }: OrderModalProps) => {
  const counts = stack.reduce<Partial<Record<IngredientType, number>>>((acc, item) => {
    acc[item.type] = (acc[item.type] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Your Order</h2>
        {stack.length === 0 ? (
          <p>No ingredients added yet.</p>
        ) : (
          <ul className={styles.orderList}>
            {(Object.entries(counts) as [IngredientType, number][]).map(([type, qty]) => (
              <li key={type}>
                {LABELS[type]} &times; {qty} &mdash; ${(PRICES[type] * qty).toFixed(2)}
              </li>
            ))}
          </ul>
        )}
        <p className={styles.orderTotal}>Total: ${total.toFixed(2)}</p>
        <div className={styles.modalBtns}>
          <button className={styles.ingrBtn} onClick={onClose}>
            Close
          </button>
          {stack.length > 0 && (
            <button className={`${styles.ingrBtn} ${styles.confirmBtn}`} onClick={onClose}>
              Confirm Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ---- Main Burger Component ----

const Burger = () => {
  const [stack, setStack] = useState<IngredientItem[]>([]);
  const [showModal, setShowModal] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const addIngredient = (type: IngredientType) => {
    setStack((prev) => [...prev, { id: `${type}-${crypto.randomUUID()}`, type }]);
  };

  const removeIngredient = (type: IngredientType) => {
    setStack((prev) => {
      const lastIndex = [...prev].map((i) => i.type).lastIndexOf(type);
      if (lastIndex === -1) return prev;
      return prev.filter((_, i) => i !== lastIndex);
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setStack((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const countFor = (type: IngredientType) => stack.filter((i) => i.type === type).length;
  const total = stack.reduce((sum, item) => sum + PRICES[item.type], 0);

  return (
    <>
      <div className={styles.burgerIngredients}>
        <div className={styles.topSide} />
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={stack.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {stack.map((item) => (
              <SortableIngredient key={item.id} item={item} />
            ))}
          </SortableContext>
        </DndContext>
        <div className={styles.bottomSide} />
      </div>

      <p className={styles.totalPrice}>Total: ${total.toFixed(2)}</p>

      <div className={styles.controls}>
        {INGREDIENT_TYPES.map((type) => (
          <IngredientControl
            key={type}
            type={type}
            count={countFor(type)}
            onAdd={() => addIngredient(type)}
            onRemove={() => removeIngredient(type)}
          />
        ))}
      </div>

      <button
        className={`${styles.ingrBtn} ${styles.orderNowBtn}`}
        onClick={() => setShowModal(true)}
      >
        Order Now
      </button>

      {showModal && <OrderModal stack={stack} total={total} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Burger;
