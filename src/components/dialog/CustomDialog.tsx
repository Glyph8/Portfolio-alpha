import * as Dialog from '@radix-ui/react-dialog';
import styles from './CustomDialog.module.css';

interface CustomDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    description?: string; children: React.ReactNode;
}

export default function CustomDialog({ open, setOpen, title, description, children }: CustomDialogProps) {
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.dialogOverlay} />
                <Dialog.Content className={styles.dialogContent}>

                    <Dialog.Title className={styles.dialogTitle}>{title}</Dialog.Title>
                    {description && (
                        <Dialog.Description className={styles.dialogDescription}>
                            {description}
                        </Dialog.Description>
                    )}

                    <div className={styles.dialogBody}>
                        {children}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}