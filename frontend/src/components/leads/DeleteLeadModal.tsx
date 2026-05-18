import { AlertTriangle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import type { Lead } from '../../types/lead.types';

interface DeleteLeadModalProps {
  lead: Lead | null;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function DeleteLeadModal({ lead, onClose, onConfirm, isLoading }: DeleteLeadModalProps) {
  return (
    <Modal open={!!lead} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-800">Delete Lead</h3>
          <p className="mt-1 text-sm text-slate-500">
            Are you sure you want to delete{' '}
            <span className="font-medium text-slate-700">{lead?.name}</span>?
            This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-2 w-full">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" className="flex-1" onClick={onConfirm} loading={isLoading}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
