// src/components/ModalBase.tsx

"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface ModalBaseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const ModalBase = ({ open, onOpenChange, title, description, children }: ModalBaseProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-center text-zinc-300">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalBase;
