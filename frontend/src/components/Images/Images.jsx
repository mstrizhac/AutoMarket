import styles from './Images.module.css';

function Images({images, removeImage, handleImageUpload}) {
    return (
        <div className={styles.imageGrid}>
            {images.map((image, index) => (
                <div key={index} className={styles.imageItem}>
                    <img src={image.url} alt={`Car ${index + 1}`} className={styles.image}/>
                    <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className={styles.removeImageButton}
                    >
                        ✕
                    </button>
                </div>
            ))}

            {images.length < 6 && (
                <label className={styles.uploadBox}>
                    <span className={styles.uploadIcon}>📷</span>
                    <span className={styles.uploadText}>Додати фото</span>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className={styles.fileInput}
                    />
                </label>
            )}
        </div>
    );
}

export default Images;
