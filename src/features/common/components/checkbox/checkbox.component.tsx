import { Checkbox, type CheckboxProps } from "react-aria-components";
import styles from './checkbox.module.scss'

export function CheckboxComponent({
  children,
  ...props
}: Omit<CheckboxProps, "children"> & {
  children?: React.ReactNode;
}) {
  return (
    <Checkbox {...props} className={styles.checkbox__component}>
      {({ isIndeterminate }) => (
        <>
          <div className={styles.checkbox}>
            <svg viewBox="0 0 18 18" aria-hidden="true">
              {isIndeterminate ? (
                <rect x={1} y={7.5} width={15} height={3} />
              ) : (
                <polyline points="1 9 7 14 15 4" />
              )}
            </svg>
          </div>
          {children}
        </>
      )}
    </Checkbox>
  );
}
