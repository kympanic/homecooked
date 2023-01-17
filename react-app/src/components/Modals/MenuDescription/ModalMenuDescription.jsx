import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";

const ModalMenuDescription = ({ setIsOpen, product }) => {
	return (
		<>
			<div className={styles.darkBG} onClick={() => setIsOpen(false)} />
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h1 className={styles.heading}>{product.name}</h1>
					</div>
					<button
						className={styles.closeBtn}
						onClick={() => setIsOpen(false)}
					>
						<RiCloseLine style={{ marginBottom: "-3px" }} />
					</button>
					<div className={styles.modalContent}>
						<div>
							<h3>{product.description}</h3>
						</div>
					</div>
					<div className={styles.modalActions}>
						<div className={styles.actionsContainer}>
							<button
								className={styles.cancelBtn}
								onClick={() => setIsOpen(false)}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalMenuDescription;
