import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteProductThunk } from "../../../store/products";
// import { useHistory } from "react-router-dom";
const ModalDeleteProduct = ({ setIsOpen, product }) => {
	const dispatch = useDispatch();
	// const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsOpen(false);
		dispatch(deleteProductThunk(product));
		window.location.reload(false);
	};

	return (
		<>
			<div className={styles.darkBG} onClick={() => setIsOpen(false)} />
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h5 className={styles.heading}>Delete Confirmation</h5>
					</div>
					<button
						className={styles.closeBtn}
						onClick={() => setIsOpen(false)}
					>
						<RiCloseLine style={{ marginBottom: "-3px" }} />
					</button>
					<div className={styles.modalContent}>
						Are you sure you want to delete the item?
					</div>
					<div className={styles.modalActions}>
						<div className={styles.actionsContainer}>
							<button
								className={styles.submitBtn}
								onClick={handleSubmit}
							>
								Submit
							</button>
							<button
								className={styles.cancelBtn}
								onClick={() => setIsOpen(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalDeleteProduct;
