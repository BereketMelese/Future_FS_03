"use client";

import { useMemo, useState } from "react";
import Modal from "@/src/components/ui/Modal";
import Button from "@/src/components/ui/Button";
import { coffeeCustomizer } from "@/src/features/menu/data/menu.data";

const formatPrice = (value) => `$${value.toFixed(2)}`;

export default function BuildCoffeeModal({ open, onClose, product }) {
  const [size, setSize] = useState(coffeeCustomizer.sizes[1].label);
  const [milk, setMilk] = useState(coffeeCustomizer.milks[0].label);
  const [sugar, setSugar] = useState(coffeeCustomizer.sugars[0].label);

  const computedPrice = useMemo(() => {
    if (!product) {
      return 0;
    }

    const selectedSize = coffeeCustomizer.sizes.find(
      (item) => item.label === size,
    );
    const selectedMilk = coffeeCustomizer.milks.find(
      (item) => item.label === milk,
    );
    const selectedSugar = coffeeCustomizer.sugars.find(
      (item) => item.label === sugar,
    );

    return Number(
      (
        product.price * (selectedSize?.multiplier ?? 1) +
        (selectedMilk?.addOn ?? 0) +
        (selectedSugar?.addOn ?? 0)
      ).toFixed(2),
    );
  }, [milk, product, size, sugar]);

  return (
    <Modal open={open} onClose={onClose} title="Build Your Coffee">
      {product ? (
        <div className="space-y-4">
          <p className="text-sm text-muted">
            Customize your cup and preview the updated price instantly.
          </p>
          <OptionRow
            label="Size"
            options={coffeeCustomizer.sizes.map((item) => item.label)}
            value={size}
            onChange={setSize}
          />
          <OptionRow
            label="Milk"
            options={coffeeCustomizer.milks.map((item) => item.label)}
            value={milk}
            onChange={setMilk}
          />
          <OptionRow
            label="Sugar"
            options={coffeeCustomizer.sugars.map((item) => item.label)}
            value={sugar}
            onChange={setSugar}
          />

          <div className="flex items-center justify-between rounded-xl border border-[rgba(245,233,220,0.15)] p-3">
            <span className="text-sm text-muted">Custom total</span>
            <span className="text-xl text-(--accent)">
              {formatPrice(computedPrice)}
            </span>
          </div>

          <Button className="w-full" onClick={onClose}>
            Save Custom Preference
          </Button>
        </div>
      ) : null}
    </Modal>
  );
}

function OptionRow({ label, options, value, onChange }) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-[rgba(245,233,220,0.9)]">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              value === option
                ? "border-(--accent) bg-[rgba(198,139,89,0.2)] text-(--accent)"
                : "border-[rgba(245,233,220,0.16)] hover:-translate-y-0.5 hover:border-[rgba(245,233,220,0.35)] hover:bg-[rgba(245,233,220,0.12)]"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
