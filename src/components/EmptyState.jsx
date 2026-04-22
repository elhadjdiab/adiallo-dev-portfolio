"use client";

import { motion } from "framer-motion";
import Card from "./ui/Card";
import Button from "./ui/Button";

export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  actionHref,
  actionOnClick 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card hover={false} className="py-16 text-center">
        {Icon && (
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-slate-800/50 p-6">
              <Icon className="h-12 w-12 text-slate-500" />
            </div>
          </div>
        )}
        <h3 className="mb-3 text-xl font-semibold text-slate-100">{title}</h3>
        <p className="mb-6 text-slate-400">{description}</p>
        {(actionLabel && (actionHref || actionOnClick)) && (
          <Button
            href={actionHref}
            onClick={actionOnClick}
            variant="primary"
          >
            {actionLabel}
          </Button>
        )}
      </Card>
    </motion.div>
  );
}
