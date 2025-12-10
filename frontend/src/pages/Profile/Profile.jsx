import React, {useEffect, useState} from 'react';
import {User, Mail, Phone, MapPin, Heart, Settings, Plus, Edit2, Trash2} from 'lucide-react';
import styles from './Profile.module.css';
import {Link} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import env from "../../env.js";
import {useListings} from "../../hooks/useUserListings.js";
import {useListingActions} from "../../hooks/useListingActions.js";
import {useAuthData} from "../../hooks/useAuthData.js";

export default function Profile() {
    const { user, loading: userLoading, error: userError } = useAuthData();
    const { listings, loading: listingsLoading, error: listingsError, setListings } = useListings();
    const { deleteListing, loading: deleteLoading } = useListingActions();

    if (userLoading || listingsLoading) {
        return <div className={styles.loadingContainer}>Завантаження даних профілю...</div>;
    }

    if (userError || !user) {
        return <div className={styles.errorContainer}>Помилка завантаження користувача: {userError || 'Немає даних'}</div>;
    }
    const getStatusText = (status) => {
        switch (status) {
            case 'active':
                return 'Активне';
            case 'pending':
                return 'На модерації';
            case 'sold':
                return 'Продано';
            default:
                return status;
        }
    };

    const getStatusClassName = (status) => {
        switch (status) {
            case 'active':
                return `${styles.statusBadge} ${styles.statusActive}`;
            case 'pending':
                return `${styles.statusBadge} ${styles.statusPending}`;
            case 'sold':
                return `${styles.statusBadge} ${styles.statusSold}`;
            default:
                return styles.statusBadge;
        }
    };

    const deleteCar = async (id) => {
        await deleteListing(id)
        setListings((prevCars) => prevCars.filter((car) => car._id !== id));
        return true;
    };

    return (
        <div className={styles.profilePage}>
            <div className={styles.profileContent}>
                <div className={styles.profileGrid}>

                    <div className={styles.sidebar}>
                        <div className={styles.card}>
                            <div className={styles.userCardContent}>
                                <div className={styles.userAvatar}>
                                    <User style={{width: '3rem', height: '3rem', color: 'white'}}/>
                                </div>
                                <h2 className={styles.userName}>{user.email}</h2>
                            </div>

                            <div className={styles.userInfo}>
                                <div className={styles.infoItem}>
                                    <Mail style={{width: '1.25rem', height: '1.25rem', color: '#9ca3af'}}/>
                                    <span>{user.email}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <Phone style={{width: '1.25rem', height: '1.25rem', color: '#9ca3af'}}/>
                                    <span>{user.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.mainContent}>

                        <div className={styles.card}>
                            <div className={styles.sectionHeader}>
                                <h3 className={styles.sectionTitle}>Мої оголошення</h3>
                                <Link to={"/add-listing"} className={styles.addListingBtn}>
                                    <Plus style={{width: '1rem', height: '1rem'}}/>
                                    <span>Додати оголошення</span>
                                </Link>
                            </div>

                            <div className={styles.listingsList}>
                                {listings.map((listing) => (
                                    <div key={listing.id} className={styles.listingCard}>
                                        <div className={styles.listingContent}>
                                            <img
                                                src={listing.photos[0]}
                                                alt={listing.name}
                                                className={styles.listingImage}
                                            />
                                            <div className={styles.listingDetails}>
                                                <div className={styles.listingHeader}>
                                                    <div>
                                                        <h4 className={styles.listingTitle}>{listing.name}</h4>
                                                        <p className={styles.listingPrice}>€{listing.price.toLocaleString()}</p>
                                                    </div>
                                                    <span className={getStatusClassName(listing.status)}>
                            {getStatusText(listing.status)}
                          </span>
                                                </div>
                                                <div className={styles.listingMeta}>
                                                    <span>{listing.year} рік</span>
                                                    <span>{listing.mileage.toLocaleString()} км</span>
                                                    <span className={styles.locationItem}>
                            <MapPin style={{width: '1rem', height: '1rem', marginRight: '0.25rem'}}/>
                                                        {listing.city}
                          </span>
                                                </div>
                                                <div className={styles.listingActions}>
                                                    <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => deleteCar(listing._id)}>
                                                        <Trash2 style={{width: '1rem', height: '1rem'}}/>
                                                        <span>Видалити</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}