export type ModalUtilsProps = {
  html?: string;
  title: string;
  message: string;
  confirmButtonText?: string;
  icons?: "success" | "error" | "warning" | "info" | "question";
  color?: string;
  showCancel?: boolean;
  handleChange?: () => void;
  setLoading?: (_value: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
};
