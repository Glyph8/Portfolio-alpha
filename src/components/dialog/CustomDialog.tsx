import * as Dialog from '@radix-ui/react-dialog';
import styles from './CustomDialog.module.css';

interface CustomDialogProps {
    triggerButton: React.ReactNode;
    title: string;
    description?: string; children: React.ReactNode;
}

export default function CustomDialog({ triggerButton, title, description, children }: CustomDialogProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {triggerButton}
            </Dialog.Trigger>

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

                    <Dialog.Close asChild>
                        <button className={styles.dialogCloseButton}>X</button>
                    </Dialog.Close>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}