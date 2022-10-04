import Image from "next/image";
import minus from "../../public/minus.svg";
import plus from "../../public/plus__thin.svg";
import { useState } from "react";

import styles from "../../styles/specifications.module.css";

export default function MainRooms({ product }) {

    const [isMainRoomsOpen, setMainRoomsOpen] = useState(true)
    function handleMainRoomsClick() {
        setMainRoomsOpen(!isMainRoomsOpen)
    }
    const { attributes } = product;

    return (
        <div className={styles.item}>
            <div className={styles.desc__item_title_wrap} onClick={() => { handleMainRoomsClick() }}>
                <div className={styles.desc__item_title}>
                    Main rooms
                </div>
                { isMainRoomsOpen ?
                    <div className={styles.desc__item_title_icon_minus}>
                        <Image src={minus} />
                    </div>
                    :
                    <div className={styles.desc__item_title_icon_plus}>
                        <Image src={plus} />
                    </div>
                }
            </div>
            { isMainRoomsOpen ?
                <div className={styles.items}>
                    { attributes.edges.map((bedrooms, index) => {{ if (bedrooms.node.name === 'Bedrooms') {
                        return <div className={styles.item__mainRooms} key={index}>
                            <div className={styles.item__value}>
                                {bedrooms.node.options[0]}
                            </div>
                            <div className={styles.item__name}>
                                {bedrooms.node.name}
                            </div>
                        </div>
                    } }}) }
                    { attributes.edges.map((bathrooms, index) => {{ if (bathrooms.node.name === 'Bathrooms') {
                        return <div className={styles.item__mainRooms} key={index}>
                            <div className={styles.item__value}>
                                {bathrooms.node.options[0]}
                            </div>
                            <div className={styles.item__name}>
                                {bathrooms.node.name}
                            </div>
                        </div>
                    } }}) }
                    { attributes.edges.map((living, index) => {{ if (living.node.name === 'Living rooms') {
                        return <div className={styles.item__mainRooms} key={index}>
                            <div className={styles.item__value}>
                                {living.node.options[0]}
                            </div>
                            <div className={styles.item__name}>
                                {living.node.name}
                            </div>
                        </div>
                    } }}) }
                    { attributes.edges.map((kitchens, index) => {{ if (kitchens.node.name === 'Kitchens') {
                        return <div className={styles.item__mainRooms} key={index}>
                            <div className={styles.item__value}>
                                {kitchens.node.options[0]}
                            </div>
                            <div className={styles.item__name}>
                                {kitchens.node.name}
                            </div>
                        </div>
                    } }}) }
                    { attributes.edges.map((guestbed, index) => {{ if (guestbed.node.name === 'Guest bedrooms') {
                        return <div className={styles.item__mainRooms} key={index}>
                            <div className={styles.item__value}>
                                {guestbed.node.options[0]}
                            </div>
                            <div className={styles.item__name}>
                                {guestbed.node.name}
                            </div>
                        </div>
                    } }}) }
                    { attributes.edges.map((guestbath, index) => {{ if (guestbath.node.name === 'Guest bathroom') {
                        return <div className={styles.item__mainRooms} key={index}>
                            <div className={styles.item__value}>
                                {guestbath.node.options[0]}
                            </div>
                            <div className={styles.item__name}>
                                {guestbath.node.name}
                            </div>
                        </div>
                    } }}) }
                    { attributes.edges.map((dress, index) => {{ if (dress.node.name === 'Dressing room') {
                        return <div className={styles.item__mainRooms} key={index}>
                            <div className={styles.item__value}>
                                {dress.node.options[0]}
                            </div>
                            <div className={styles.item__name}>
                                {dress.node.name}
                            </div>
                        </div>
                    } }}) }
                    { attributes.edges.map((offices, index) => {{ if (offices.node.name === 'Offices') {
                        return <div className={styles.item__mainRooms} key={index}>
                            <div className={styles.item__value}>
                                {offices.node.options[0]}
                            </div>
                            <div className={styles.item__name}>
                                {offices.node.name}
                            </div>
                        </div>
                    } }}) }
                    { attributes.edges.map((library, index) => {{ if (library.node.name === 'Library') {
                        return <div className={styles.item__mainRooms} key={index}>
                            <div className={styles.item__value}>
                                {library.node.options[0]}
                            </div>
                            <div className={styles.item__name}>
                                {library.node.name}
                            </div>
                        </div>
                    } }}) }
                </div>
                :
                null
            }
        </div>
    )
}