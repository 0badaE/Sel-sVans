import React from "react"
import { Link, useParams, useLocation, useLoaderData } from "react-router-dom"
import { getVan } from "../../api"
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';


export function loader({ params }) {
    return getVan(params.id)
}

export default function VanDetail() {
    const [showConfetti, setShowConfetti] = React.useState(false);
    const { width, height } = useWindowSize();

    const location = useLocation()
    const van = useLoaderData()

    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>

            <div className="van-detail">
                <img src={van.imageUrl} />
                <i className={`van-type ${van.type} selected`}>
                    {van.type}
                </i>
                <h2>{van.name}</h2>
                <p className="van-price"><span>${van.price}</span>/day</p>
                <p>{van.description}</p>
                
                <button className="link-button" 
                onClick={() => {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 5000);
                }}
                >
                {showConfetti ? "Van Rented!" : "Rent this van"}
                </button>
            </div>
            {showConfetti && <Confetti width={width} height={2*height} />}
        </div>
    )
}